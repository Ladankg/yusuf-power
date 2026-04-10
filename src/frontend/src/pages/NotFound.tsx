import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Home, Zap } from "lucide-react";

export function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 py-24 text-center fade-up"
      data-ocid="page-not-found"
    >
      <span className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Zap className="w-10 h-10 text-primary" />
      </span>
      <div>
        <h1 className="text-5xl font-display font-bold text-foreground">404</h1>
        <p className="text-xl font-medium text-foreground mt-2">
          Page not found
        </p>
        <p className="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">
          This page doesn't exist or was moved. Let's get you back on track.
        </p>
      </div>
      <Button asChild className="gap-2">
        <Link to="/">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
