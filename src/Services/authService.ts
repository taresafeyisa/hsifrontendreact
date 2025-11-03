import apiClient from "@/api/apiClient";

export interface TokenResponse {
  flag: boolean;
  message: string;
  token: string;
  refreshToken: string;
  name: string;
}

const ACCESS_TOKEN_EXPIRY_SECONDS = 86400; // 24 hours

export const storeTokens = ({ token, refreshToken, name }: TokenResponse) => {
  const expiry = Date.now() + ACCESS_TOKEN_EXPIRY_SECONDS * 1000;
  localStorage.setItem("access_token", token);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem("access_token_expiry", expiry.toString());

  if (name) localStorage.setItem("name", name);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("access_token_expiry");
  localStorage.removeItem("name");
};

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");
export const getUserName = () => localStorage.getItem("name");

export const isTokenExpired = (): boolean => {
  const expiry = localStorage.getItem("access_token_expiry");
  if (!expiry) return true;
  return Date.now() >= parseInt(expiry, 10);
};

export const login = async (email: string, password: string) => {
  const res = await apiClient.post<TokenResponse>("/Auth/login", {
    email,
    password,
  });

  if (!res.data.flag) {
    throw new Error(res.data.message || "Login failed");
  }

  storeTokens(res.data);
  scheduleTokenRefresh();
};

export const refreshToken = async () => {
  const accessToken = getAccessToken();
  const refreshTokenValue = getRefreshToken();

  if (!accessToken || !refreshTokenValue) {
    clearTokens();
    window.location.href = "/login";
    return;
  }

  try {
    const res = await apiClient.post<TokenResponse>("/Auth/refresh", {
      token: accessToken,
      refreshToken: refreshTokenValue,
    });

    if (!res.data.flag) {
      throw new Error(res.data.message || "Token refresh failed");
    }

    storeTokens(res.data);
    scheduleTokenRefresh();
  } catch {
    clearTokens();
    window.location.href = "/login";
  }
};

export const scheduleTokenRefresh = () => {
  const expiry = localStorage.getItem("access_token_expiry");
  if (!expiry) return;

  const timeUntilExpiry = parseInt(expiry, 10) - Date.now();
  const refreshIn = timeUntilExpiry - 30 * 1000; // Refresh 30 seconds before expiry

  if (refreshIn > 0) {
    setTimeout(() => {
      refreshToken();
    }, refreshIn);
  }
};

let inactivityTimeout: ReturnType<typeof setTimeout>;

export const setupInactivityLogout = (onLogout: () => void) => {
  const resetTimer = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      clearTokens();
      onLogout();
    }, 5 * 60 * 1000); // 5 minutes inactivity
  };

  ["mousemove", "keydown", "mousedown", "touchstart", "scroll"].forEach(
    (event) => window.addEventListener(event, resetTimer)
  );

  resetTimer();

  return () => {
    clearTimeout(inactivityTimeout);
    ["mousemove", "keydown", "mousedown", "touchstart", "scroll"].forEach(
      (event) => window.removeEventListener(event, resetTimer)
    );
  };
};

export const register = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: number;
}) => {
  const res = await apiClient.post("/Auth/register", data);
  return res.data;
};

export const getRoles = async () => {
  const res = await apiClient.get("/Auth/get-roles");
  return res.data;
};
