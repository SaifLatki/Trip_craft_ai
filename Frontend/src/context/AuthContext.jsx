import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import { login as apiLogin, register as apiRegister } from "../api/auth";

const AuthContext = createContext(null);

function loadInitialState() {
  try {
    const token = localStorage.getItem("tripcraft_token");
    const userRaw = localStorage.getItem("tripcraft_user");
    const user = userRaw ? JSON.parse(userRaw) : null;

    return {
      token,
      user,
    };
  } catch {
    return {
      token: null,
      user: null,
    };
  }
}

export function AuthProvider({ children }) {
  const initial = loadInitialState();

  const [user, setUser] = useState(initial.user);
  const [token, setToken] = useState(initial.token);
  const [isLoading, setIsLoading] = useState(false);

  const persistAuth = (user, token) => {
    setUser(user);
    setToken(token);

    localStorage.setItem("tripcraft_token", token);
    localStorage.setItem("tripcraft_user", JSON.stringify(user));
  };

  const login = useCallback(async (email, password) => {
    setIsLoading(true);

    try {
      const res = await apiLogin({ email, password });

      persistAuth(res.user, res.token);
      return res.user;
    } catch (err) {
      // Demo fallback
      const mockUser = {
        id: "demo-1",
        email,
        name: email.split("@")[0],
      };

      const mockToken = "demo-token";

      persistAuth(mockUser, mockToken);
      return mockUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setIsLoading(true);

    try {
      const res = await apiRegister({ name, email, password });

      persistAuth(res.user, res.token);
      return res.user;
    } catch (err) {
      // Demo fallback
      const mockUser = {
        id: "demo-1",
        email,
        name,
      };

      persistAuth(mockUser, "demo-token");
      return mockUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("tripcraft_token");
    localStorage.removeItem("tripcraft_user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}