import type { ReactNode } from "react";
import { NavBar } from "./NavBar";

interface LayoutProps {
  children: ReactNode;
}

const YEAR = new Date().getFullYear();
const HOSTNAME =
  typeof window !== "undefined"
    ? encodeURIComponent(window.location.hostname)
    : "";
const CAFFEINE_URL = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${HOSTNAME}`;

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />

      <main className="flex-1 w-full max-w-md mx-auto px-4 py-6">
        {children}
      </main>

      <footer
        className="bg-card border-t border-border py-4 px-4 text-center"
        data-ocid="footer"
      >
        <p className="text-xs text-muted-foreground">
          © {YEAR}. Built with love using{" "}
          <a
            href={CAFFEINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-smooth"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
