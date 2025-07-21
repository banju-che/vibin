import { useEffect, createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    const storedAccess = localStorage.getItem("access_token");
    const storedRefresh = localStorage.getItem("refresh_token");

    if (storedEmail && storedAccess && storedRefresh) {
      setUser({ email: storedEmail });
      setToken(storedAccess);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("https://vibin-11es.onrender.com/api/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error("Login Failed");

      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_email", email);

      setUser({ email });
      setToken(data.access);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) return logout();

    try {
      const res = await fetch("https://vibin-11es.onrender.com/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) throw new Error("Failed to refresh token");

      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      setToken(data.access);
      console.log("🔄 Access token refreshed");
    } catch (err) {
      console.error("❌ Refresh failed, logging out:", err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
