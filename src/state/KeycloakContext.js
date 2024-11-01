import React, { createContext, useContext, useEffect, useState } from "react";

const KeycloakContext = createContext();

export const useKeycloak = () => useContext(KeycloakContext);

export const KeycloakProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
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
  }, []);

  return (
    <KeycloakContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </KeycloakContext.Provider>
  );
};
