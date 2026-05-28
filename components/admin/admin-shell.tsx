"use client";

import { useState, useEffect } from "react";
import { AdminLogin } from "./admin-login";
import { AdminDashboard } from "./admin-dashboard";

const ADMIN_KEY = "rp_admin_auth";
const ADMIN_PASSWORD = "admin@2024";

export function AdminShell() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_KEY);
    if (stored === "true") setAuthed(true);
    setChecking(false);
  }, []);

  function handleLogin(pw: string) {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_KEY, "true");
      setAuthed(true);
      return true;
    }
    return false;
  }

  function handleLogout() {
    sessionStorage.removeItem(ADMIN_KEY);
    setAuthed(false);
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!authed) return <AdminLogin onLogin={handleLogin} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
