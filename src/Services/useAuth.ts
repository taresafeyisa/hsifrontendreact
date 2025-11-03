import { useNavigate } from "react-router-dom";
import { clearTokens } from "./authService";

export function useAuth() {
  const navigate = useNavigate();

  const logout = () => {
    clearTokens();
    navigate("/login");
  };

  return { logout };
}
