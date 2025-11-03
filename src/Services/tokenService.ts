

export const isTokenExpired = (): boolean => {
  const expiry = localStorage.getItem("access_token_expiry");
  if (!expiry) return true;
  return Date.now() >= parseInt(expiry, 10);
};
