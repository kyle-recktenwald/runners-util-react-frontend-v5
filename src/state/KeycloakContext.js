import React, { createContext, useContext, useEffect, useState } from "react";

const KeycloakContext = createContext();

export const useKeycloak = () => useContext(KeycloakContext);

export const KeycloakProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by calling the endpoint
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "https://runnersutil.local/api/auth/public/isAuthenticated",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <KeycloakContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </KeycloakContext.Provider>
  );
};
