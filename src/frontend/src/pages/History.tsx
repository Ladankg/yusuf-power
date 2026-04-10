import { useAuth } from "@/hooks/use-auth";
import { useTransactions } from "@/hooks/use-backend";
import type { OrderStatus, Transaction } from "@/types";
import { formatCredit, formatTimestamp } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Clock, LogIn, Receipt, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import type React from "react";

type OrderStatusKey = OrderStatus;

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: OrderStatusKey }) {
  const classes: Record<OrderStatusKey, string> = {
    completed: "badge-success",
    pending: "badge-pending",
    failed: "badge-failed",
  };
  const labels: Record<OrderStatusKey, string> = {
    completed: "SUCCESS",
    pending: "PENDING",
    failed: "FAILED",
  };
  return (
    <span className={classes[status]} data-ocid={`status-badge-${status}`}>
      {labels[status]}
    </span>
  );
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────────
type FilterValue = "all" | OrderStatusKey;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<FilterValue, number>;
}) {
  return (
    <div
      className="flex gap-1 p-1 bg-muted/50 rounded-lg w-full sm:w-auto overflow-x-auto"
      data-ocid="filter-tabs"
      role="tablist"
    >
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={active === value}
          onClick={() => onChange(value)}
          className={`flex-1 sm:flex-none flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-smooth
            ${
              active === value
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          data-ocid={`filter-tab-${value}`}
        >
          {label}
          <span
            className={`text-xs rounded-full px-1.5 py-0.5 leading-none
              ${active === value ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
          >
            {counts[value]}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Transaction Row ──────────────────────────────────────────────────────────
function TransactionRow({
  tx,
  onClick,
}: {
  tx: Transaction;
  onClick: () => void;
}) {
  const status: OrderStatusKey = tx.status;
  return (
    <tr
      className="group border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-smooth"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      tabIndex={0}
      data-ocid={`tx-row-${tx.id}`}
    >
      {/* Meter */}
      <td className="py-3.5 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <span className="font-mono text-sm text-foreground block truncate max-w-[110px] sm:max-w-none">
              {tx.meterNumber}
            </span>
            <span className="text-xs text-muted-foreground sm:hidden">
              {tx.disco}
            </span>
          </div>
        </div>
      </td>
      {/* DisCo — desktop */}
      <td className="py-3.5 px-4 sm:px-6 text-sm text-muted-foreground hidden sm:table-cell">
        {tx.disco}
      </td>
      {/* Date — desktop */}
      <td className="py-3.5 px-4 sm:px-6 text-sm text-muted-foreground hidden sm:table-cell">
        {formatTimestamp(tx.createdAt)}
      </td>
      {/* Amount */}
      <td className="py-3.5 px-4 sm:px-6 text-sm font-semibold text-foreground">
        {formatCredit(tx.creditAmount)}
      </td>
      {/* Status — desktop */}
      <td className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">
        <StatusBadge status={status} />
      </td>
      {/* Status + date stacked — mobile */}
      <td className="py-3.5 px-4 sm:px-6 sm:hidden">
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={status} />
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(tx.createdAt)}
          </span>
        </div>
      </td>
      {/* Receipt icon */}
      <td className="py-3.5 px-4 sm:px-6">
        <Receipt className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth ml-auto" />
      </td>
    </tr>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ filter }: { filter: FilterValue }) {
  const msg =
    filter === "all"
      ? "Your purchase history will appear here once you buy electricity."
      : `No ${filter} transactions found. Try a different filter.`;
  return (
    <div
      className="flex flex-col items-center justify-center py-16 gap-4 text-center"
      data-ocid="empty-state"
    >
      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
        <Receipt className="w-7 h-7 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">
          {filter === "all"
            ? "No transactions yet"
            : `No ${filter} transactions`}
        </p>
        <p className="text-sm text-muted-foreground max-w-xs">{msg}</p>
      </div>
    </div>
  );
}

// ─── Login Prompt ─────────────────────────────────────────────────────────────
function LoginPrompt({ login }: { login: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-5 text-center"
      data-ocid="login-prompt"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <LogIn className="w-8 h-8 text-primary" />
      </div>
      <div className="space-y-1.5">
        <p className="text-lg font-semibold text-foreground font-display">
          Sign in to view your history
        </p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Log in with Internet Identity to see all your past electricity
          purchases.
        </p>
      </div>
      <button
        type="button"
        onClick={login}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold transition-smooth hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-ocid="login-btn"
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </button>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────
function ErrorState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 gap-3 text-center"
      data-ocid="error-state"
    >
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <p className="text-sm font-medium text-foreground">
        Failed to load transactions
      </p>
      <p className="text-xs text-muted-foreground">Please refresh the page.</p>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
const SKELETON_ROWS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"] as const;

function LoadingSkeleton() {
  return (
    <div className="space-y-0" data-ocid="loading-skeleton">
      {SKELETON_ROWS.map((id) => (
        <div
          key={id}
          className="flex items-center gap-4 px-4 sm:px-6 py-3.5 border-b border-border last:border-0 animate-pulse"
        >
          <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 bg-muted rounded w-28" />
            <div className="h-3 bg-muted rounded w-40 hidden sm:block" />
          </div>
          <div className="h-3.5 bg-muted rounded w-14" />
          <div className="h-5 bg-muted rounded-full w-20 hidden sm:block" />
        </div>
      ))}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide truncate">
          {label}
        </p>
        <p className="text-lg font-bold text-foreground font-display leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── History Page ─────────────────────────────────────────────────────────────
export function History() {
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const { data: transactions, isLoading, isError } = useTransactions();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterValue>("all");

  const sorted = useMemo(() => {
    if (!transactions) return [];
    return [...transactions].sort((a, b) => Number(b.createdAt - a.createdAt));
  }, [transactions]);

  const counts: Record<FilterValue, number> = useMemo(() => {
    const completed = sorted.filter((t) => t.status === "completed").length;
    const pending = sorted.filter((t) => t.status === "pending").length;
    const failed = sorted.filter((t) => t.status === "failed").length;
    return { all: sorted.length, completed, pending, failed };
  }, [sorted]);

  const filtered = useMemo(() => {
    if (filter === "all") return sorted;
    return sorted.filter((t) => t.status === filter);
  }, [sorted, filter]);

  const totalSpent = useMemo(
    () =>
      sorted
        .filter((t) => t.status === "completed")
        .reduce((sum, t) => sum + Number(t.creditAmount), 0),
    [sorted],
  );

  // Format total spent as ₦ with proper naira formatting
  const totalSpentFormatted = useMemo(() => {
    const nairaAmount = totalSpent / 100;
    return `₦${nairaAmount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
  }, [totalSpent]);

  function handleRowClick(id: bigint) {
    navigate({ to: "/receipt/$id", params: { id: id.toString() } });
  }

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-up"
      data-ocid="page-history"
    >
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground font-display">
          Transaction History
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse all your past electricity purchases
        </p>
      </div>

      {/* Not authenticated */}
      {!authLoading && !isAuthenticated && <LoginPrompt login={login} />}

      {/* Authenticated content */}
      {isAuthenticated && (
        <>
          {/* Stats row */}
          {!isLoading && !isError && sorted.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatCard
                label="Total Purchases"
                value={counts.all.toString()}
                icon={Receipt}
              />
              <StatCard
                label="Total Spent"
                value={totalSpentFormatted}
                icon={Zap}
              />
              <StatCard
                label="Pending"
                value={counts.pending.toString()}
                icon={Clock}
              />
            </div>
          )}

          {/* Table card */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground font-display">
                Purchases
              </h2>
              <FilterTabs
                active={filter}
                onChange={setFilter}
                counts={counts}
              />
            </div>

            {/* Body */}
            {isLoading ? (
              <LoadingSkeleton />
            ) : isError ? (
              <ErrorState />
            ) : filtered.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-ocid="transactions-list">
                  <thead>
                    <tr className="bg-muted/30 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <th className="text-left px-4 sm:px-6 py-3">Meter</th>
                      <th className="text-left px-4 sm:px-6 py-3 hidden sm:table-cell">
                        DisCo
                      </th>
                      <th className="text-left px-4 sm:px-6 py-3 hidden sm:table-cell">
                        Date
                      </th>
                      <th className="text-left px-4 sm:px-6 py-3">Amount</th>
                      <th className="text-left px-4 sm:px-6 py-3 hidden sm:table-cell">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:hidden text-right">
                        Details
                      </th>
                      <th className="px-4 sm:px-6 py-3" aria-label="Receipt" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((tx) => (
                      <TransactionRow
                        key={tx.id.toString()}
                        tx={tx}
                        onClick={() => handleRowClick(tx.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
