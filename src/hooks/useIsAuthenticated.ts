"use client";
import { useEffect, useState } from "react";

/**
 * Verifies that a user is authenticated.
 * TODO: This needs to be overhauled, this was only put in place for speed of development.
 **/
function useIsAuthenticated(): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authenticated = localStorage.getItem("access");

    if (authenticated) {
      setIsAuthenticated(true);
    }
  }, [window.location.pathname]);

  return isAuthenticated;
}

export default useIsAuthenticated;
