import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransaction } from "@/hooks/use-backend";
import type { Transaction as TxType } from "@/types";
import { formatCredit, formatTimestamp } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  MessageCircle,
  Receipt as ReceiptIcon,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type React from "react";
import { toast } from "sonner";

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  completed: {
    icon: CheckCircle2,
    label: "Payment Successful",
    subLabel: "Token Generated Successfully",
    color: "text-primary",
    ringColor: "ring-primary/20",
    bgColor: "bg-primary/10",
    badgeClass: "badge-success",
  },
  pending: {
    icon: Clock,
    label: "Payment Pending",
    subLabel: "Your transaction is being processed",
    color: "text-accent-foreground",
    ringColor: "ring-accent/20",
    bgColor: "bg-accent/10",
    badgeClass: "badge-pending",
  },
  failed: {
    icon: XCircle,
    label: "Payment Failed",
    subLabel: "This transaction could not be completed",
    color: "text-destructive",
    ringColor: "ring-destructive/20",
    bgColor: "bg-destructive/10",
    badgeClass: "badge-failed",
  },
} as const;

// ─── Detail row ────────────────────────────────────────────────────────────────
function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span
        className={`text-sm text-right font-medium break-all min-w-0 ${mono ? "font-mono tracking-wide" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Token hero block ───────────────────────────────────────────────────────────
function TokenBlock({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  // Group token into sets of 4 digits separated by spaces
  const grouped =
    token
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      ?.join("  ") ?? token;

  function handleCopy() {
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true);
      toast.success("Token copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="success-pulse rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
      <div className="flex items-center gap-2 text-primary">
        <Zap className="size-4 shrink-0" />
        <span className="text-xs font-semibold uppercase tracking-wider">
          Vending Token
        </span>
      </div>
      <div className="flex items-center gap-3">
        <code
          className="flex-1 font-mono text-base tracking-[0.2em] text-foreground bg-background border border-border rounded-lg px-4 py-3 break-all leading-relaxed min-w-0 text-center"
          data-ocid="token-value"
        >
          {grouped}
        </code>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          aria-label="Copy token to clipboard"
          data-ocid="copy-token-btn"
          className="shrink-0 transition-smooth"
        >
          {copied ? (
            <Check className="size-4 text-primary" />
          ) : (
            <Copy className="size-4" />
          )}
          <span className="ml-1.5">{copied ? "Copied" : "Copy"}</span>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Enter this token in your meter keypad to load the credit.
      </p>
    </div>
  );
}

// ─── Loading skeleton ───────────────────────────────────────────────────────────
function ReceiptSkeleton() {
  return (
    <div className="space-y-4 fade-up">
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-52 w-full rounded-xl" />
      <div className="flex gap-3">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Empty / error state placeholder ──────────────────────────────────────────
function StateCard({
  icon: Icon,
  title,
  description,
  iconClass,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  iconClass: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center space-y-4 fade-up"
      data-ocid="receipt-state-card"
    >
      <div className="rounded-full bg-muted p-5">
        <Icon className={`size-8 ${iconClass}`} />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold font-display">{title}</h2>
        <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      </div>
    </div>
  );
}

// ─── Transaction content (extracted component) ─────────────────────────────────
function TransactionView({
  transaction,
  onBack,
  onNewPurchase,
}: {
  transaction: TxType;
  onBack: () => void;
  onNewPurchase: () => void;
}) {
  const statusKey = transaction.status;
  const cfg = STATUS_CONFIG[statusKey];
  const StatusIcon = cfg.icon;
  const token = transaction.token ?? null;

  return (
    <div className="space-y-4">
      {/* Status header */}
      <div
        className={`rounded-xl border bg-card p-5 fade-up ${statusKey === "completed" ? "success-pulse" : ""}`}
        style={{ animationDelay: "0.1s" }}
        data-ocid="receipt-status-card"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`rounded-full p-2 shrink-0 ${cfg.bgColor} ring-4 ${cfg.ringColor}`}
            >
              <StatusIcon className={`size-5 ${cfg.color}`} />
            </div>
            <div className="min-w-0">
              <h2
                className={`font-semibold font-display text-base ${cfg.color}`}
              >
                {cfg.label}
              </h2>
              <p className="text-xs text-muted-foreground">{cfg.subLabel}</p>
            </div>
          </div>
          <span className={cfg.badgeClass} data-ocid="receipt-status-badge">
            {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
          </span>
        </div>
      </div>

      {/* Vending token (completed only) */}
      {statusKey === "completed" && token && (
        <div
          className="fade-up"
          style={{ animationDelay: "0.15s" }}
          data-ocid="token-block"
        >
          <TokenBlock token={token} />
        </div>
      )}

      {/* Pending notice */}
      {statusKey === "pending" && (
        <div
          className="rounded-xl border bg-accent/5 border-accent/20 p-4 text-sm text-accent-foreground fade-up flex items-start gap-3"
          style={{ animationDelay: "0.15s" }}
          data-ocid="pending-notice"
        >
          <Clock className="size-4 shrink-0 mt-0.5" />
          <span>
            Your payment is being processed. The vending token will appear here
            once confirmed — please check back shortly.
          </span>
        </div>
      )}

      {/* Failed notice */}
      {statusKey === "failed" && (
        <div
          className="rounded-xl border bg-destructive/5 border-destructive/20 p-4 text-sm text-destructive fade-up flex items-start gap-3"
          style={{ animationDelay: "0.15s" }}
          data-ocid="failed-notice"
        >
          <XCircle className="size-4 shrink-0 mt-0.5" />
          <span>
            This transaction failed and no token was generated. No charge was
            applied. Please try purchasing again.
          </span>
        </div>
      )}

      {/* Receipt details */}
      <div
        className="rounded-xl border bg-card px-5 py-4 fade-up"
        style={{ animationDelay: "0.2s" }}
        data-ocid="receipt-details-card"
      >
        <h3 className="text-sm font-semibold font-display mb-2">
          Receipt Details
        </h3>
        <Separator className="mb-1" />
        <div className="divide-y divide-border">
          <DetailRow
            label="Transaction ID"
            value={`#${transaction.id.toString()}`}
            mono
          />
          <DetailRow
            label="Meter Number"
            value={transaction.meterNumber}
            mono
          />
          <DetailRow label="DiSCo" value={transaction.disco} />
          <DetailRow label="Customer" value={transaction.customerName} />
          <DetailRow
            label="Credit Amount"
            value={formatCredit(transaction.creditAmount)}
          />
          <DetailRow
            label="Date & Time"
            value={formatTimestamp(transaction.createdAt)}
          />
          <DetailRow
            label="Payment Method"
            value={transaction.paymentMethod || "—"}
          />
        </div>
      </div>

      {/* CTAs */}
      <div
        className="flex gap-3 pt-1 fade-up"
        style={{ animationDelay: "0.25s" }}
      >
        <Button
          variant="outline"
          className="flex-1 transition-smooth"
          onClick={onBack}
          data-ocid="receipt-back-btn"
        >
          <ArrowLeft className="size-4 mr-1.5" />
          View History
        </Button>
        <Button
          className="flex-1 transition-smooth"
          onClick={onNewPurchase}
          data-ocid="receipt-new-purchase-btn"
        >
          <Zap className="size-4 mr-1.5" />
          New Purchase
        </Button>
      </div>

      {/* WhatsApp share for completed */}
      {statusKey === "completed" && token && (
        <Button
          variant="outline"
          className="w-full gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 transition-smooth fade-up"
          onClick={() => {
            const msg = `⚡ Electricity Token from Yusuf Power\n\nToken: ${token}\nMeter: ${transaction.meterNumber}\nDiSCo: ${transaction.disco}\nAmount: ${formatCredit(transaction.creditAmount)}\n\nPowered by Yusuf Power`;
            window.open(
              `https://wa.me/?text=${encodeURIComponent(msg)}`,
              "_blank",
              "noopener,noreferrer",
            );
          }}
          data-ocid="receipt-whatsapp-btn"
        >
          <MessageCircle className="size-4" />
          Share via WhatsApp
        </Button>
      )}
    </div>
  );
}

// ─── Receipt page ───────────────────────────────────────────────────────────────
export function Receipt() {
  const { id } = useParams({ from: "/receipt/$id" });
  const navigate = useNavigate();
  const txId = BigInt(id);

  const { data: transaction, isLoading, isError } = useTransaction(txId);

  function goBack() {
    navigate({ to: "/history" });
  }

  return (
    <div
      className="max-w-xl mx-auto px-4 py-8 space-y-5"
      data-ocid="page-receipt"
    >
      {/* Back navigation */}
      <div className="fade-up">
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
          className="gap-1.5 text-muted-foreground hover:text-foreground transition-smooth -ml-2"
          data-ocid="back-to-history-btn"
        >
          <ArrowLeft className="size-4" />
          Back to History
        </Button>
      </div>

      {/* Page title */}
      <div
        className="flex items-center gap-2 fade-up"
        style={{ animationDelay: "0.05s" }}
      >
        <ReceiptIcon className="size-5 text-muted-foreground" />
        <h1 className="text-xl font-semibold font-display">
          Transaction Receipt
        </h1>
      </div>

      {isLoading && <ReceiptSkeleton />}

      {isError && !isLoading && (
        <StateCard
          icon={XCircle}
          title="Unable to Load Receipt"
          description="Something went wrong fetching this transaction. Please try again."
          iconClass="text-destructive"
        />
      )}

      {!isLoading && !isError && !transaction && (
        <StateCard
          icon={ReceiptIcon}
          title="Transaction Not Found"
          description="No transaction exists with this ID. The link may be invalid or expired."
          iconClass="text-muted-foreground"
        />
      )}

      {transaction && (
        <TransactionView
          transaction={transaction}
          onBack={goBack}
          onNewPurchase={() => navigate({ to: "/purchase" })}
        />
      )}
    </div>
  );
}
