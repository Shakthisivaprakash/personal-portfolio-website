import React, { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { appParams } from '@/lib/app-params';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);
      
      const serverUrl = ""; 
      const fetchUrl = `${serverUrl}/api/apps/public/prod/public-settings/by-id/${appParams.appId}`;
      
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            "X-App-Id": appParams.appId,
            ...(appParams.token ? { "Authorization": `Bearer ${appParams.token}` } : {})
          }
        });
        
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          if (response.status === 403 && errData.extra_data?.reason) {
            const reason = errData.extra_data.reason;
            setAuthError({
              type: reason,
              message: reason === "auth_required" ? "Authentication required" : 
                       reason === "user_not_registered" ? "User not registered for this app" : 
                       errData.message || "Access Restricted"
            });
          } else {
            setAuthError({ type: "unknown", message: errData.message || "Failed to load app" });
          }
          setIsLoadingAuth(false);
        } else {
          const settings = await response.json();
          setAppPublicSettings(settings);
          if (appParams.token) {
            await checkUserAuth();
          } else {
            setIsLoadingAuth(false);
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        console.error("App settings fetch failed:", err);
        // Fallback for local development when API is not present
        setIsLoadingAuth(false);
        setIsAuthenticated(false);
      } finally {
        setIsLoadingPublicSettings(false);
      }
    } catch (e) {
      console.error("Unexpected error in checkAppState:", e);
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const me = await base44.auth.me();
      setUser(me);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("User auth check failed:", err);
      setIsAuthenticated(false);
      if (err.status === 401 || err.status === 403) {
        setAuthError({ type: "auth_required", message: "Authentication required" });
      }
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  };

  const logout = (redirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    if (redirect) {
      base44.auth.logout(window.location.href);
    } else {
      base44.auth.logout();
    }
  };

  const navigateToLogin = () => {
    base44.auth.redirectToLogin(window.location.href);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
