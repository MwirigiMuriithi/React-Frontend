/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("/auth/token/", { email, password });
      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        return response;
      }
    } catch (error) {
      return {
        error: "Login failed. Please check your credentials and try again.",
      };
    }
  };



  const logoutUser = (navigate) => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const updateToken = async () => {
    try {
      const response = await axios.post("/auth/token/refresh/", {
        refresh: authTokens.refresh,
      });

      const data = await response.json();
      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        return data;
      } else {
        logoutUser();
      }
    } catch (error) {
      logoutUser();
    }
  };

  useEffect(() => {
    if (loading) {
      if (authTokens) {
        updateToken();
      }
      setLoading(false);
    }

    const fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const contextData = [
     user,
     authTokens, 
     loginUser, 
    //  registerUser, 
     logoutUser,
     error,
     success,
     setError,
     setSuccess
  ]

  return (
    <AuthContext.Provider
      value={contextData}
    >
      {loading ? "Loading..." : children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return ctx;
};

export { AuthProvider, useAuth };
