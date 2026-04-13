"use client";

import { UserRole } from "../content/schemas";

/**
 * Institutional Auth Service (Simulated)
 * Manages dual-layer session state (localStorage for UI, Cookies for Middleware).
 */
export const authService = {
  getCurrentUser: async (): Promise<{ role: UserRole }> => {
    if (typeof window === "undefined") return { role: "public" as UserRole };

    // Check cookie first (source of truth for middleware)
    const cookieRole = document.cookie
      .split("; ")
      .find((row) => row.startsWith("baalvion_session_mock="))
      ?.split("=")[1] as UserRole;

    const role =
      cookieRole ||
      (localStorage.getItem("baalvion_user_role") as UserRole) ||
      "public";
    return { role };
  },

  setRole: (role: UserRole) => {
    if (typeof window !== "undefined") {
      // 1. Update UI state
      localStorage.setItem("baalvion_user_role", role);

      // 2. Update Middleware state (Cookie)
      // Set short expiry for mock session
      document.cookie = `baalvion_session_mock=${role}; path=/; max-age=3600; samesite=lax`;

      // 3. Trigger events for reactive UI
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(
        new CustomEvent("auth-updated", { detail: { role } })
      );
    }
  },

  hasAccess: (resourceRoles: UserRole[], userRole: UserRole): boolean => {
    // No explicit role requirement → open to all
    if (!resourceRoles || resourceRoles.length === 0) return true;

    // Admin and admin override
    if (userRole === "admin") return true;

    // Sections marked as public should be visible to every role,
    // including authenticated institutional profiles.
    if (resourceRoles.includes("public")) return true;

    // Otherwise require a direct role match
    return resourceRoles.includes(userRole);
  },

  signOut: () => {
    authService.setRole("public");
    window.location.href = "/";
  },
};
