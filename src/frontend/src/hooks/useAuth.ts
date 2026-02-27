import { useState, useEffect, useCallback } from "react";

interface AuthSession {
  mobile: string;
  loggedIn: boolean;
  loginTime: number;
}

const SESSION_KEY = "cityPharmaSession";

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const parsed: AuthSession = JSON.parse(stored);
        // Session valid for 7 days
        if (Date.now() - parsed.loginTime < 7 * 24 * 60 * 60 * 1000) {
          setSession(parsed);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const login = useCallback((mobile: string) => {
    const newSession: AuthSession = {
      mobile,
      loggedIn: true,
      loginTime: Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  return {
    session,
    isLoggedIn: !!session?.loggedIn,
    mobile: session?.mobile ?? "",
    login,
    logout,
  };
}
