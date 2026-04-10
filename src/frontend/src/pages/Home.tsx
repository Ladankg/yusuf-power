import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useTransactions } from "@/hooks/use-backend";
import { formatCredit, formatTimestamp } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  History,
  LogIn,
  ShieldCheck,
  XCircle,
  Zap,
} from "lucide-react";

// ─── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return <span className="badge-success">Success</span>;
  if (status === "pending")
    return <span className="badge-pending">Pending</span>;
  return <span className="badge-failed">Failed</span>;
}

// ─── Recent transaction skeleton ───────────────────────────────────────────────
function TransactionSkeleton() {
  return (
    <Card className="bg-card">
      <CardContent className="p-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <div className="text-right flex-shrink-0 space-y-1.5">
          <Skeleton className="h-4 w-16 ml-auto" />
          <Skeleton className="h-4 w-12 ml-auto rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Login / unauthenticated screen ───────────────────────────────────────────
function LoginPrompt({
  onLogin,
  isLoading,
}: { onLogin: () => void; isLoading: boolean }) {
  return (
    <div className="flex flex-col gap-6 fade-up" data-ocid="login-prompt">
      {/* Hero card */}
      <div className="relative rounded-3xl overflow-hidden bg-primary shadow-xl">
        {/* Decorative image */}
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/yusuf-power-hero.dim_800x600.png')",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 px-6 pt-10 pb-8 flex flex-col items-center text-center gap-4">
          {/* Logo mark */}
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/30 shadow-lg">
            <Zap
              className="w-10 h-10 text-primary-foreground"
              strokeWidth={2}
            />
          </div>

          {/* Brand + tagline */}
          <div>
            <h1 className="text-3xl font-display font-bold text-primary-foreground tracking-tight leading-tight">
              Yusuf Power
            </h1>
            <p className="text-primary-foreground/80 text-base mt-2 leading-relaxed max-w-xs">
              Power your home, anytime.
              <br />
              <span className="text-primary-foreground/60 text-sm">
                Fast, secure electricity tokens for every Nigerian.
              </span>
            </p>
          </div>

          {/* CTA */}
          <Button
            size="lg"
            className="w-full max-w-xs mt-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold gap-2 h-14 text-base rounded-2xl transition-smooth shadow-md"
            onClick={onLogin}
            disabled={isLoading}
            data-ocid="login-btn"
          >
            <LogIn className="w-5 h-5" />
            {isLoading ? "Connecting…" : "Sign in to Buy Electricity"}
          </Button>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">
          Why choose Yusuf Power?
        </p>
        {[
          {
            icon: Zap,
            title: "Instant Electricity Tokens",
            desc: "Get your prepaid token in seconds, direct to your screen.",
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            icon: ShieldCheck,
            title: "Secure Payments via Paystack",
            desc: "Bank-grade encryption keeps your transactions safe.",
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            icon: History,
            title: "Full Transaction History",
            desc: "Every purchase saved — find your old tokens anytime.",
            color: "text-primary",
            bg: "bg-primary/10",
          },
        ].map(({ icon: Icon, title, desc, color, bg }) => (
          <div
            key={title}
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border"
          >
            <span
              className={`flex-shrink-0 w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}
            >
              <Icon className={`w-5 h-5 ${color}`} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Disco coverage */}
      <div className="rounded-2xl bg-muted/30 border border-border px-4 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Supported DisCos
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            "AEDC",
            "Ikeja",
            "Eko",
            "Ibadan",
            "Enugu",
            "PHC",
            "Kano",
            "Kaduna",
            "Benin",
            "Jos",
          ].map((d) => (
            <span
              key={d}
              className="text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Last transaction summary card ─────────────────────────────────────────────
function LastTransactionCard({ isLoading }: { isLoading: boolean }) {
  const { data: txs, isLoading: txLoading } = useTransactions();

  const loading = isLoading || txLoading;
  const lastTx = txs?.[0] ?? null;

  if (loading) {
    return (
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Last Purchase
        </p>
        <TransactionSkeleton />
      </div>
    );
  }

  if (!lastTx) return null;

  return (
    <div data-ocid="last-transaction">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Last Purchase
        </p>
        <Link
          to="/history"
          className="text-xs text-primary hover:underline transition-smooth flex items-center gap-0.5"
        >
          See all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <Link
        to="/receipt/$id"
        params={{ id: lastTx.id.toString() }}
        data-ocid="last-tx-row"
      >
        <Card className="bg-card card-lift cursor-pointer">
          <CardContent className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {lastTx.status === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : lastTx.status === "failed" ? (
                  <XCircle className="w-4 h-4 text-destructive" />
                ) : (
                  <Clock className="w-4 h-4 text-accent-foreground" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {lastTx.meterNumber}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimestamp(lastTx.createdAt)}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-foreground">
                {formatCredit(lastTx.creditAmount)}
              </p>
              <StatusBadge status={lastTx.status} />
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

// ─── Authenticated home ────────────────────────────────────────────────────────
function AuthenticatedHome() {
  const { data: txs, isLoading: txLoading } = useTransactions();
  const totalPurchases =
    txs?.filter((t) => t.status === "completed").length ?? 0;

  return (
    <div className="space-y-5 fade-up" data-ocid="page-home">
      {/* Hero banner */}
      <div className="relative rounded-3xl overflow-hidden bg-primary shadow-xl">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/yusuf-power-hero.dim_800x600.png')",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 px-6 pt-8 pb-7">
          {/* Brand row */}
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary-foreground/20 border border-primary-foreground/30">
              <Zap
                className="w-3.5 h-3.5 text-primary-foreground"
                strokeWidth={2.5}
              />
            </span>
            <span className="text-xs font-semibold text-primary-foreground/70 tracking-wide uppercase">
              Yusuf Power
            </span>
          </div>

          <h1 className="text-2xl font-display font-bold text-primary-foreground leading-tight">
            Power your home,
            <br />
            anytime.
          </h1>
          <p className="text-primary-foreground/70 text-sm mt-1.5">
            {totalPurchases > 0
              ? `${totalPurchases} successful purchase${totalPurchases > 1 ? "s" : ""} made.`
              : "Your electricity, delivered instantly."}
          </p>

          {/* Buy electricity CTA */}
          <Button
            asChild
            size="lg"
            className="mt-5 w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold gap-2 h-14 text-base rounded-2xl transition-smooth shadow-md"
            data-ocid="buy-electricity-btn"
          >
            <Link to="/purchase">
              <Zap className="w-5 h-5" />
              Buy Electricity
              <ArrowRight className="w-4 h-4 ml-auto opacity-60" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick links grid */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/history" data-ocid="nav-history-card">
          <Card className="bg-card card-lift cursor-pointer h-full border-border">
            <CardContent className="p-4 flex flex-col gap-2.5">
              <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <History className="w-5 h-5 text-primary" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">History</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  View past purchases
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin" data-ocid="nav-admin-card">
          <Card className="bg-card card-lift cursor-pointer h-full border-border">
            <CardContent className="p-4 flex flex-col gap-2.5">
              <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Dashboard & stats
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Last transaction summary with skeleton */}
      <LastTransactionCard isLoading={txLoading} />

      {/* Empty state: no transactions ever */}
      {!txLoading && (txs?.length ?? 0) === 0 && (
        <Card className="bg-card border-dashed" data-ocid="empty-transactions">
          <CardContent className="py-8 flex flex-col items-center gap-3 text-center">
            <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary/60" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                No transactions yet
              </p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[240px]">
                Your first electricity purchase will show up here.
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="gap-1.5 mt-1 font-semibold rounded-xl"
            >
              <Link to="/purchase">
                <Zap className="w-3.5 h-3.5" />
                Buy your first token
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export function Home() {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (!isAuthenticated) {
    return <LoginPrompt onLogin={login} isLoading={isLoading} />;
  }

  return <AuthenticatedHome />;
}
