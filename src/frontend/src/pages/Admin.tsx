import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { useAdminStats, useAllTransactions } from "@/hooks/use-backend";
import {
  type AdminStats,
  type Transaction,
  formatCredit,
  formatTimestamp,
} from "@/types";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Copy,
  DollarSign,
  LogIn,
  Receipt,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Transaction["status"] }) {
  if (status === "completed")
    return <span className="badge-success">Completed</span>;
  if (status === "failed") return <span className="badge-failed">Failed</span>;
  return <span className="badge-pending">Pending</span>;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <Card className="bg-card card-lift fade-up">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </p>
            <p className="mt-1.5 text-2xl font-display font-bold text-foreground truncate">
              {value}
            </p>
            {sub && (
              <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
            )}
          </div>
          <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Stats Skeleton ───────────────────────────────────────────────────────────
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[0, 1, 2].map((i) => (
        <Card key={i} className="bg-card">
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Transactions Table ───────────────────────────────────────────────────────
function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <p
        data-ocid="admin-table-empty"
        className="py-10 text-center text-sm text-muted-foreground"
      >
        No transactions found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="text-xs font-semibold whitespace-nowrap">
              Meter #
            </TableHead>
            <TableHead className="text-xs font-semibold whitespace-nowrap">
              DisCo
            </TableHead>
            <TableHead className="text-xs font-semibold whitespace-nowrap">
              Customer
            </TableHead>
            <TableHead className="text-xs font-semibold text-right whitespace-nowrap">
              Amount
            </TableHead>
            <TableHead className="text-xs font-semibold whitespace-nowrap">
              Status
            </TableHead>
            <TableHead className="text-xs font-semibold whitespace-nowrap">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, i) => (
            <TableRow
              key={tx.id.toString()}
              data-ocid={`admin-tx-row-${i}`}
              className="hover:bg-muted/20 transition-colors"
            >
              <TableCell className="font-mono text-xs whitespace-nowrap">
                {tx.meterNumber}
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap">
                {tx.disco}
              </TableCell>
              <TableCell className="text-xs max-w-[100px] truncate">
                {tx.customerName || "—"}
              </TableCell>
              <TableCell className="text-xs font-semibold text-right whitespace-nowrap tabular-nums">
                {formatCredit(tx.creditAmount)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <StatusBadge status={tx.status} />
              </TableCell>
              <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTimestamp(tx.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Paginated All Transactions ───────────────────────────────────────────────
const PAGE_SIZE = 20;

function AllTransactionsSection({
  transactions,
}: { transactions: Transaction[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
  const pageRows = transactions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <Card className="bg-card fade-up" data-ocid="admin-all-transactions">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            All Transactions
          </CardTitle>
          <span className="text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
            {transactions.length} total
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-0">
        <TransactionsTable transactions={pageRows} />
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              data-ocid="admin-prev-page"
            >
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              data-ocid="admin-next-page"
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Login Prompt ─────────────────────────────────────────────────────────────
function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      data-ocid="admin-login-gate"
      className="flex flex-col items-center justify-center gap-5 py-16 text-center fade-up"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <LogIn className="w-7 h-7 text-primary" />
      </div>
      <div className="space-y-1">
        <h2 className="font-display text-lg font-bold">Sign in required</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          Log in with Internet Identity to access the admin dashboard.
        </p>
      </div>
      <Button
        onClick={onLogin}
        className="gap-2 px-8"
        data-ocid="admin-login-btn"
      >
        <LogIn className="h-4 w-4" />
        Log in with Internet Identity
      </Button>
    </div>
  );
}

// ─── Access Denied ────────────────────────────────────────────────────────────
function AccessDenied({ principalText }: { principalText: string | null }) {
  const handleCopy = () => {
    if (!principalText) return;
    navigator.clipboard.writeText(principalText);
    toast.success("Principal ID copied!");
  };

  return (
    <div
      data-ocid="admin-access-denied"
      className="flex flex-col items-center gap-5 py-12 text-center fade-up"
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <ShieldAlert className="w-7 h-7 text-destructive" />
      </div>
      <div className="space-y-1.5">
        <h2 className="font-display text-lg font-bold text-destructive">
          Access Denied
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Admin privileges required. The canister owner must call{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
            setAdmin
          </code>{" "}
          with your principal ID to grant access.
        </p>
      </div>

      {principalText && (
        <Card className="w-full max-w-sm bg-card">
          <CardContent className="p-4 space-y-2">
            <p className="text-xs font-medium text-muted-foreground text-left">
              Your Principal ID
            </p>
            <div className="flex items-start gap-2">
              <code className="flex-1 break-all text-xs font-mono text-foreground bg-muted/50 rounded-lg p-3 leading-relaxed text-left">
                {principalText}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="shrink-0 mt-0.5"
                data-ocid="admin-copy-principal"
                aria-label="Copy principal ID"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
export function Admin() {
  const {
    isAuthenticated,
    isLoading: authLoading,
    principalText,
    login,
  } = useAuth();

  const statsQuery = useAdminStats();
  const allTxQuery = useAllTransactions();

  const isAdminError = statsQuery.isError || allTxQuery.isError;
  const isDataLoading = statsQuery.isLoading || allTxQuery.isLoading;

  const stats: AdminStats | null = statsQuery.data ?? null;
  const allTransactions: Transaction[] = allTxQuery.data ?? [];

  const completedCount = allTransactions.filter(
    (tx) => tx.status === "completed",
  ).length;

  // Auth loading
  if (authLoading) {
    return (
      <div className="space-y-5 py-4">
        <Skeleton className="h-7 w-40" />
        <StatsSkeleton />
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return <LoginPrompt onLogin={login} />;
  }

  // Admin error (not authorized)
  if (isAdminError) {
    return <AccessDenied principalText={principalText} />;
  }

  // Data loading
  if (isDataLoading) {
    return (
      <div className="space-y-5 py-2 fade-up">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
        </div>
        <StatsSkeleton />
        <Card className="bg-card">
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-4 w-36" />
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-11 w-full rounded-md" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5 fade-up" data-ocid="admin-dashboard">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
        </div>
        <Badge
          variant="outline"
          className="gap-1.5 text-primary border-primary/30 bg-primary/5"
        >
          <BadgeCheck className="h-3.5 w-3.5" />
          Admin Access
        </Badge>
      </div>

      {/* Principal info notice */}
      {principalText && (
        <Card className="bg-primary/5 border-primary/20 fade-up">
          <CardContent className="p-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-primary mb-0.5">
                  Your Principal ID
                </p>
                <p className="text-xs font-mono text-muted-foreground break-all leading-relaxed">
                  {principalText}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Share this with the canister owner to grant or revoke admin.
                  They must call{" "}
                  <code className="bg-background px-1 rounded font-mono">
                    setAdmin
                  </code>{" "}
                  with this principal.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 h-7 w-7 p-0"
                onClick={() => {
                  navigator.clipboard.writeText(principalText);
                  toast.success("Principal copied!");
                }}
                aria-label="Copy principal ID"
                data-ocid="admin-copy-principal-header"
              >
                <Copy className="h-3.5 w-3.5 text-primary" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stat cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        data-ocid="admin-stats-grid"
      >
        <StatCard
          icon={BarChart3}
          label="Total Transactions"
          value={
            stats
              ? stats.totalCount.toString()
              : allTransactions.length.toString()
          }
          sub="All time"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={
            stats
              ? `₦${(Number(stats.totalRevenue) / 100).toLocaleString("en-NG")}`
              : formatCredit(
                  allTransactions.reduce((s, t) => s + t.creditAmount, 0n),
                )
          }
          sub="Sum of all amounts"
        />
        <StatCard
          icon={BadgeCheck}
          label="Completed"
          value={completedCount.toString()}
          sub={`of ${allTransactions.length} transactions`}
        />
      </div>

      {/* Recent Transactions */}
      <Card className="bg-card fade-up" data-ocid="admin-recent-transactions">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-0">
          {stats && stats.recentTransactions.length > 0 ? (
            <TransactionsTable
              transactions={stats.recentTransactions.slice(0, 10)}
            />
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No recent transactions yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* All Transactions paginated */}
      <AllTransactionsSection transactions={allTransactions} />
    </div>
  );
}
