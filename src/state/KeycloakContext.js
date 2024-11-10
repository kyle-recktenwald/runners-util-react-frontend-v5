import React, { createContext, useContext, useEffect, useState } from "react";

const KeycloakContext = createContext();

export const useKeycloak = () => useContext(KeycloakContext);

export const KeycloakProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(name + "="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  const refreshAccessToken = async () => {
    try {
      const proxyDomain = "https://runnersutil.local";
      const response = await fetch(proxyDomain + "/api/auth/oauth/refresh", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const newExpiration = getCookieValue("access_token_exp");
        if (newExpiration) {
          const expirationTimestamp = parseInt(newExpiration, 10);
          setIsAuthenticated(Date.now() < expirationTimestamp); // Set to true if valid expiration
        }
      } else {
        console.error("Failed to refresh token:", response.statusText);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const checkInitialAuth = () => {
      const expirationTime = getCookieValue("access_token_exp");
      if (expirationTime) {
        const expirationTimestamp = parseInt(expirationTime, 10);
        if (Date.now() < expirationTimestamp) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    const checkTokenExpiryAndRefresh = () => {
      const expirationTime = getCookieValue("access_token_exp");

      if (expirationTime) {
        const expirationTimestamp = parseInt(expirationTime, 10);
        const timeRemaining = expirationTimestamp - Date.now();

        if (timeRemaining < 60000) {
          refreshAccessToken();
        }
      }
    };

    checkInitialAuth();
    const intervalId = setInterval(checkTokenExpiryAndRefresh, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const logout = async () => {
    try {
      const proxyDomain = "https://runnersutil.local";
      const response = await fetch(proxyDomain + "/api/auth/oauth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok || response.status === 204) {
        setIsAuthenticated(false);
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <KeycloakContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
