import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  History,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type React from "react";

interface NavLink {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { to: "/", label: "Buy Electricity", icon: LayoutDashboard, exact: true },
  { to: "/history", label: "History", icon: History },
  { to: "/admin", label: "Admin", icon: ShieldCheck },
];

export function NavBar() {
  const { isAuthenticated, isLoading, login, logout, principalText } =
    useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string, exact?: boolean) =>
    exact ? currentPath === to : currentPath.startsWith(to);

  return (
    <header
      className="sticky top-0 z-40 header-green shadow-md"
      data-ocid="navbar"
    >
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-foreground/20 text-primary-foreground shadow-sm group-hover:scale-105 transition-smooth">
            <Zap className="w-4 h-4" strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-base text-primary-foreground tracking-tight">
            Yusuf Power
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth",
                isActive(to, exact)
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10",
              ].join(" ")}
              data-ocid={`nav-${label.toLowerCase().replace(/\s/g, "-")}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth + mobile toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              {principalText && (
                <span className="text-xs text-primary-foreground/60 font-mono bg-primary-foreground/10 px-2 py-1 rounded-md max-w-[100px] truncate">
                  {principalText.slice(0, 10)}…
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                data-ocid="btn-logout"
                className="gap-1.5 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent h-8"
              >
                <LogOut className="w-3.5 h-3.5" />
                Log out
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoading}
              data-ocid="btn-login"
              className="hidden md:flex gap-1.5 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border border-primary-foreground/30 h-8"
              variant="ghost"
            >
              <LogIn className="w-3.5 h-3.5" />
              {isLoading ? "Connecting…" : "Log in"}
            </Button>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            data-ocid="btn-mobile-menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-primary-foreground/20 bg-primary/95 backdrop-blur-sm px-4 py-3 space-y-1"
          data-ocid="mobile-nav"
        >
          {NAV_LINKS.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={[
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                isActive(to, exact)
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10",
              ].join(" ")}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-primary-foreground/20 mt-2">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full gap-1.5 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                data-ocid="btn-logout-mobile"
              >
                <LogOut className="w-3.5 h-3.5" />
                Log out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  login();
                  setMobileOpen(false);
                }}
                disabled={isLoading}
                className="w-full gap-1.5 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border border-primary-foreground/30"
                variant="ghost"
                data-ocid="btn-login-mobile"
              >
                <LogIn className="w-3.5 h-3.5" />
                {isLoading ? "Connecting…" : "Log in"}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
