import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  identity: Identity | null;
  principalText: string | null;
  login: () => void;
  logout: () => void;
}

export function useAuth(): AuthState {
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success";
  const isLoading = loginStatus === "logging-in";

  const principalText =
    identity && isAuthenticated ? identity.getPrincipal().toText() : null;

  return {
    isAuthenticated,
    isLoading,
    identity: identity ?? null,
    principalText,
    login,
    logout: clear,
  };
}
