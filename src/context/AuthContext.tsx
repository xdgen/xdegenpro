import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  email: string;
  username: string;
  role: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    username: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
  user: User | null;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const refreshToken = localStorage.getItem("refreshToken");
  //     const storedUser = localStorage.getItem("user");

  //     if (accessToken && refreshToken) {
  //       setIsAuthenticated(true);
  //       if (storedUser) {
  //         setUser(JSON.parse(storedUser));
  //       }
  //     } else {
  //       setIsAuthenticated(false);
  //       setUser(null);
  //     }

  //     setLoading(false);
  //   };

  //   checkAuth();
  // }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        // Optional: You can also fetch user info from backend here
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);
  

  const login = async (
    email: string,
    username: string,
    role: string,
  ) => {
    setIsAuthenticated(true);
    const user = { email, username, role };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
