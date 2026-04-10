import { useAuth } from "@/hooks/use-auth";
import {
  useCompleteOrder,
  useCreateOrder,
  useFailOrder,
  usePurchaseToken,
  useValidateMeter,
} from "@/hooks/use-backend";
import {
  DISCO_OPTIONS,
  type DiscoValue,
  type TokenResult,
  type Transaction,
  type ValidatedMeter,
  formatTimestamp,
} from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  Copy,
  Loader2,
  Share2,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4 | 5;

interface FormState {
  meterNumber: string;
  disco: DiscoValue | "";
  amount: string;
}

interface PurchaseState {
  form: FormState;
  validated: ValidatedMeter | null;
  order: Transaction | null;
  tokenResult: TokenResult | null;
  paymentFailed: boolean;
}

// ─── Progress Indicator ───────────────────────────────────────────────────────
const STEP_LABELS = ["Details", "Validate", "Confirm", "Payment", "Token"];

function ProgressIndicator({ current }: { current: Step }) {
  return (
    <div
      className="flex items-start justify-between px-1 mb-6"
      aria-label="Purchase steps"
    >
      {STEP_LABELS.map((label, i) => {
        const step = (i + 1) as Step;
        const isComplete = step < current;
        const isActive = step === current;
        const isLast = i === STEP_LABELS.length - 1;
        return (
          <div key={label} className="flex items-start flex-1">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-smooth",
                  isActive
                    ? "step-active shadow-sm"
                    : isComplete
                      ? "step-complete"
                      : "step-inactive",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? <CheckCircle2 className="w-4 h-4" /> : step}
              </div>
              <span
                className={[
                  "text-[10px] font-medium leading-tight text-center",
                  isActive
                    ? "text-primary"
                    : isComplete
                      ? "text-primary/70"
                      : "text-muted-foreground",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={[
                  "h-px flex-1 mt-3.5 transition-smooth",
                  isComplete ? "bg-primary/40" : "bg-border",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared UI helpers ────────────────────────────────────────────────────────
function DetailRow({
  label,
  value,
  highlight,
  large,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span
        className={[
          "text-right font-medium truncate min-w-0",
          highlight ? "text-primary" : "text-foreground",
          large ? "text-base font-bold" : "text-sm",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-border" />;
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2.5 text-sm text-destructive fade-up"
      data-ocid="error-banner"
    >
      <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}

// ─── Step 1: Enter Details ────────────────────────────────────────────────────
function StepDetails({
  form,
  onChange,
  onSubmit,
  loading,
  error,
}: {
  form: FormState;
  onChange: (p: Partial<FormState>) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
}) {
  const meterValid = /^\d{11,13}$/.test(form.meterNumber);
  const amountNum = Number.parseFloat(form.amount);
  const amountValid = !Number.isNaN(amountNum) && amountNum >= 500;
  const canSubmit = meterValid && !!form.disco && amountValid && !loading;

  return (
    <div className="fade-up space-y-5">
      <div>
        <h2 className="text-xl font-display font-semibold text-foreground">
          Buy Electricity
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your meter details to get started
        </p>
      </div>

      <div className="space-y-4">
        {/* Meter Number */}
        <div className="space-y-1.5">
          <label
            htmlFor="meter-number"
            className="text-sm font-medium text-foreground"
          >
            Meter Number
          </label>
          <input
            id="meter-number"
            data-ocid="input-meter-number"
            type="tel"
            inputMode="numeric"
            pattern="\d*"
            placeholder="11–13 digit meter number"
            value={form.meterNumber}
            onChange={(e) =>
              onChange({
                meterNumber: e.target.value.replace(/\D/g, "").slice(0, 13),
              })
            }
            className="w-full h-12 px-4 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            aria-label="Meter number"
          />
          {form.meterNumber && !meterValid && (
            <p className="text-xs text-destructive">Enter 11–13 digits</p>
          )}
        </div>

        {/* DisCo Selector */}
        <div className="space-y-1.5">
          <label
            htmlFor="disco-select"
            className="text-sm font-medium text-foreground"
          >
            Distribution Company (DisCo)
          </label>
          <select
            id="disco-select"
            data-ocid="select-disco"
            value={form.disco}
            onChange={(e) => onChange({ disco: e.target.value as DiscoValue })}
            className="w-full h-12 px-4 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth appearance-none"
          >
            <option value="" disabled>
              Select your DisCo…
            </option>
            {DISCO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="space-y-1.5">
          <label
            htmlFor="amount-input"
            className="text-sm font-medium text-foreground"
          >
            Amount (₦)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium pointer-events-none">
              ₦
            </span>
            <input
              id="amount-input"
              data-ocid="input-amount"
              type="number"
              inputMode="numeric"
              min="500"
              placeholder="500"
              value={form.amount}
              onChange={(e) => onChange({ amount: e.target.value })}
              className="w-full h-12 pl-8 pr-4 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            />
          </div>
          {form.amount && !amountValid && (
            <p className="text-xs text-destructive">Minimum amount is ₦500</p>
          )}
          {/* Quick amounts */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {[500, 1000, 2000, 5000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => onChange({ amount: String(amt) })}
                className={[
                  "py-2 text-xs rounded-lg border font-medium transition-smooth",
                  form.amount === String(amt)
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "border-input bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30",
                ].join(" ")}
                data-ocid={`preset-${amt}`}
              >
                {amt >= 1000 ? `₦${amt / 1000}k` : `₦${amt}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <ErrorBanner message={error} />}

      <button
        type="button"
        data-ocid="btn-validate-meter"
        onClick={onSubmit}
        disabled={!canSubmit}
        className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Zap className="w-4 h-4" />
        )}
        {loading ? "Validating…" : "Validate Meter"}
      </button>
    </div>
  );
}

// ─── Step 2: Validation Result ────────────────────────────────────────────────
function StepValidation({
  validated,
  disco,
  onProceed,
  onEdit,
}: {
  validated: ValidatedMeter;
  disco: DiscoValue | "";
  onProceed: () => void;
  onEdit: () => void;
}) {
  const discoLabel =
    DISCO_OPTIONS.find((d) => d.value === disco)?.label ?? disco;

  return (
    <div className="fade-up space-y-5">
      <div className="flex flex-col items-center text-center gap-3 py-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold text-foreground">
            Meter Verified!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            We found your account details
          </p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 space-y-3">
        <DetailRow
          label="Customer Name"
          value={validated.customerName}
          highlight
        />
        <Divider />
        <DetailRow label="Meter Number" value={validated.meterNumber} />
        <Divider />
        <DetailRow label="Distribution Co." value={discoLabel} />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          data-ocid="btn-proceed-confirmation"
          onClick={onProceed}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90"
        >
          Proceed to Confirmation
        </button>
        <button
          type="button"
          data-ocid="btn-edit-details"
          onClick={onEdit}
          className="w-full h-12 rounded-xl border border-input bg-card text-foreground font-medium text-sm transition-smooth hover:bg-muted"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Confirmation ─────────────────────────────────────────────────────
function StepConfirmation({
  validated,
  form,
  onProceed,
  onBack,
  loading,
  error,
}: {
  validated: ValidatedMeter;
  form: FormState;
  onProceed: () => void;
  onBack: () => void;
  loading: boolean;
  error: string | null;
}) {
  const discoLabel =
    DISCO_OPTIONS.find((d) => d.value === form.disco)?.label ?? form.disco;
  const amount = Number.parseFloat(form.amount);

  return (
    <div className="fade-up space-y-5">
      <div>
        <h2 className="text-xl font-display font-semibold text-foreground">
          Confirm Purchase
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review details before proceeding to payment
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 space-y-3">
        <DetailRow
          label="Customer Name"
          value={validated.customerName}
          highlight
        />
        <Divider />
        <DetailRow label="Meter Number" value={form.meterNumber} />
        <Divider />
        <DetailRow label="DisCo" value={discoLabel} />
        <Divider />
        <DetailRow
          label="Amount"
          value={`\u20A6${amount.toLocaleString("en-NG")}`}
          highlight
          large
        />
      </div>

      <div className="bg-secondary/60 rounded-lg px-4 py-3 text-xs text-muted-foreground leading-relaxed">
        By proceeding you confirm all details above are correct. Tokens are
        non-refundable once vended.
      </div>

      {error && <ErrorBanner message={error} />}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          data-ocid="btn-proceed-payment"
          onClick={onProceed}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90 disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Creating Order\u2026" : "Proceed to Pay"}
        </button>
        <button
          type="button"
          data-ocid="btn-go-back-confirm"
          onClick={onBack}
          disabled={loading}
          className="w-full h-12 rounded-xl border border-input bg-card text-foreground font-medium text-sm transition-smooth hover:bg-muted disabled:opacity-50"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Paystack Payment Placeholder ─────────────────────────────────────
function StepPayment({
  amount,
  onSuccess,
  onFailure,
  loading,
  paymentFailed,
  onRetry,
}: {
  amount: number;
  onSuccess: () => void;
  onFailure: () => void;
  loading: boolean;
  paymentFailed: boolean;
  onRetry: () => void;
}) {
  return (
    <div className="fade-up space-y-5">
      <div>
        <h2 className="text-xl font-display font-semibold text-foreground">
          Payment
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Powered by Paystack &mdash; Demo Mode
        </p>
      </div>

      {/* Paystack branding card */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                PS
              </span>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Paystack</p>
              <p className="text-xs text-muted-foreground">
                Secure Payment Gateway
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] text-primary font-medium">
                Secured
              </span>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Amount to Pay</p>
            <p className="text-3xl font-display font-bold text-foreground">
              &#8358;{amount.toLocaleString("en-NG")}
            </p>
          </div>
        </div>

        <div className="px-5 py-4 space-y-3">
          <div className="space-y-2">
            <div className="h-10 bg-muted/60 rounded-lg" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 bg-muted/60 rounded-lg" />
              <div className="h-10 bg-muted/60 rounded-lg" />
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">
            Card fields shown for illustration only. This is a demo integration.
          </p>
        </div>
      </div>

      {paymentFailed && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-destructive">
              Payment Failed
            </p>
            <p className="text-xs text-destructive/80 mt-0.5">
              Transaction was declined. Please try again.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          data-ocid="btn-simulate-payment-success"
          onClick={onSuccess}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90 disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Processing\u2026" : "\u2713 Simulate Payment Success"}
        </button>

        {paymentFailed ? (
          <button
            type="button"
            data-ocid="btn-retry-payment"
            onClick={onRetry}
            className="w-full h-12 rounded-xl border border-input bg-card text-foreground font-medium text-sm transition-smooth hover:bg-muted"
          >
            Retry Payment
          </button>
        ) : (
          <button
            type="button"
            data-ocid="btn-simulate-payment-failure"
            onClick={onFailure}
            disabled={loading}
            className="w-full h-12 rounded-xl border border-destructive/40 bg-destructive/5 text-destructive font-medium text-sm transition-smooth hover:bg-destructive/10 disabled:opacity-50"
          >
            &#x2717; Simulate Payment Failure (Demo)
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Step 5: Token Result ─────────────────────────────────────────────────────
function StepToken({
  tokenResult,
  meterNumber,
  amount,
  failed,
  timestamp,
}: {
  tokenResult: TokenResult | null;
  meterNumber: string;
  amount: number;
  failed: boolean;
  timestamp: bigint | null;
}) {
  const [copied, setCopied] = useState(false);

  function formatToken(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    return digits.match(/.{1,4}/g)?.join("-") ?? raw;
  }

  function copyToken() {
    if (!tokenResult) return;
    void navigator.clipboard.writeText(tokenResult.token.replace(/\D/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareWhatsApp() {
    if (!tokenResult) return;
    const token = tokenResult.token.replace(/\D/g, "");
    const units = tokenResult.units.toFixed(1);
    const msg = `Your Yusuf Power token for ${meterNumber}: ${token} (\u20A6${amount.toLocaleString("en-NG")}, ${units} kWh). Powered by Yusuf Power.`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  if (failed || !tokenResult) {
    return (
      <div className="fade-up space-y-5" data-ocid="token-result-failed">
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-9 h-9 text-destructive" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-foreground">
              Purchase Failed
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              The transaction could not be completed
            </p>
          </div>
          <span className="badge-failed">FAILED</span>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 space-y-3">
          <DetailRow label="Meter Number" value={meterNumber} />
          <Divider />
          <DetailRow
            label="Amount"
            value={`\u20A6${amount.toLocaleString("en-NG")}`}
          />
          {timestamp !== null && (
            <>
              <Divider />
              <DetailRow label="Time" value={formatTimestamp(timestamp)} />
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="success-pulse space-y-5" data-ocid="token-result-success">
      <div className="flex flex-col items-center text-center gap-3 py-2">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold text-foreground">
            Token Received!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Enter this token on your meter to activate electricity
          </p>
        </div>
        <span className="badge-success">SUCCESS</span>
      </div>

      {/* Token display */}
      <div
        className="bg-card rounded-xl border border-primary/20 p-5 space-y-3"
        data-ocid="token-display"
      >
        <p className="text-xs font-medium text-muted-foreground text-center uppercase tracking-wider">
          Vending Token
        </p>
        <div
          className="font-mono text-primary text-center leading-relaxed break-all tracking-widest py-1"
          style={{ fontSize: "clamp(1.05rem, 5vw, 1.4rem)" }}
        >
          {formatToken(tokenResult.token)}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Units</p>
            <p className="text-sm font-semibold text-foreground">
              {tokenResult.units.toFixed(2)} kWh
            </p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Tx ID</p>
            <p className="text-sm font-semibold text-foreground">
              #{tokenResult.transactionId.toString()}
            </p>
          </div>
          {timestamp !== null && (
            <>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="text-[11px] font-semibold text-foreground leading-tight">
                  {formatTimestamp(timestamp)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          data-ocid="btn-copy-token"
          onClick={copyToken}
          className="flex-1 h-12 rounded-xl border border-input bg-card text-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-muted"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy Token"}
        </button>
        <button
          type="button"
          data-ocid="btn-share-whatsapp"
          onClick={shareWhatsApp}
          className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90"
        >
          <Share2 className="w-4 h-4" />
          WhatsApp
        </button>
      </div>
    </div>
  );
}

// ─── Auth Gate ────────────────────────────────────────────────────────────────
function AuthGate({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      className="fade-up flex flex-col items-center text-center gap-5 py-8"
      data-ocid="login-gate"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Zap className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h2 className="text-xl font-display font-semibold text-foreground">
          Sign In Required
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          Sign in to purchase electricity tokens. Your transactions are securely
          saved to your account.
        </p>
      </div>
      <button
        type="button"
        data-ocid="btn-login-gate"
        onClick={onLogin}
        className="w-full max-w-xs h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90"
      >
        Sign In with Internet Identity
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function Purchase() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();

  const validateMeter = useValidateMeter();
  const createOrder = useCreateOrder();
  const completeOrder = useCompleteOrder();
  const failOrder = useFailOrder();
  const purchaseToken = usePurchaseToken();

  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState<PurchaseState>({
    form: { meterNumber: "", disco: "", amount: "" },
    validated: null,
    order: null,
    tokenResult: null,
    paymentFailed: false,
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }); // intentionally runs on every render — step changes trigger it

  function updateForm(patch: Partial<FormState>) {
    setLocalError(null);
    setState((s) => ({ ...s, form: { ...s.form, ...patch } }));
  }

  async function handleValidate() {
    setLocalError(null);
    const { meterNumber, disco } = state.form;
    if (!disco) return;
    try {
      const result = await validateMeter.mutateAsync({ meterNumber, disco });
      setState((s) => ({ ...s, validated: result }));
      setStep(2);
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Meter validation failed.",
      );
    }
  }

  async function handleCreateOrder() {
    setLocalError(null);
    const { meterNumber, disco, amount } = state.form;
    const { validated } = state;
    if (!validated || !disco) return;
    const creditAmount = BigInt(Math.round(Number.parseFloat(amount) * 100));
    try {
      const tx = await createOrder.mutateAsync({
        meterNumber,
        disco,
        customerName: validated.customerName,
        creditAmount,
        paymentMethod: "paystack",
      });
      setState((s) => ({ ...s, order: tx }));
      setStep(4);
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Could not create order.",
      );
    }
  }

  async function handlePaymentSuccess() {
    const { order, form, validated } = state;
    if (!order) return;
    const creditAmount = BigInt(
      Math.round(Number.parseFloat(form.amount) * 100),
    );
    try {
      // Purchase / vend token first
      const tokenRes = await purchaseToken.mutateAsync({
        meterNumber: form.meterNumber,
        disco: form.disco as DiscoValue,
        amount: creditAmount,
        customerName: validated?.customerName ?? "",
        paymentMethod: "paystack",
      });
      // Complete order with token details
      await completeOrder.mutateAsync({
        txId: order.id,
        token: tokenRes.token,
        units: tokenRes.units,
      });
      setState((s) => ({
        ...s,
        tokenResult: tokenRes,
        paymentFailed: false,
      }));
      setStep(5);
    } catch {
      setState((s) => ({ ...s, paymentFailed: true }));
      setStep(5);
    }
  }

  async function handlePaymentFailure() {
    const { order } = state;
    if (order) {
      try {
        await failOrder.mutateAsync(order.id);
      } catch {
        // best-effort
      }
    }
    setState((s) => ({ ...s, paymentFailed: true, tokenResult: null }));
    setStep(5);
  }

  function handleRetryPayment() {
    setState((s) => ({ ...s, paymentFailed: false }));
  }

  function handleReset() {
    setState({
      form: { meterNumber: "", disco: "", amount: "" },
      validated: null,
      order: null,
      tokenResult: null,
      paymentFailed: false,
    });
    setLocalError(null);
    validateMeter.reset();
    createOrder.reset();
    setStep(1);
  }

  const paymentLoading =
    completeOrder.isPending || purchaseToken.isPending || failOrder.isPending;

  return (
    <div
      ref={topRef}
      className="max-w-md mx-auto px-4 py-6 min-h-[calc(100dvh-8rem)]"
      data-ocid="page-purchase"
    >
      {/* Brand strip */}
      <div className="header-green rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
        <Zap className="w-6 h-6 text-white shrink-0" />
        <div>
          <p className="font-display font-bold text-white text-base leading-tight">
            Yusuf Power
          </p>
          <p className="text-white/70 text-xs">
            Fast &middot; Secure &middot; Instant
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressIndicator current={step} />

      {/* Auth check */}
      {authLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : !isAuthenticated ? (
        <AuthGate onLogin={login} />
      ) : (
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          {step === 1 && (
            <StepDetails
              form={state.form}
              onChange={updateForm}
              onSubmit={handleValidate}
              loading={validateMeter.isPending}
              error={localError}
            />
          )}

          {step === 2 && state.validated && (
            <StepValidation
              validated={state.validated}
              disco={state.form.disco}
              onProceed={() => setStep(3)}
              onEdit={() => setStep(1)}
            />
          )}

          {step === 3 && state.validated && (
            <StepConfirmation
              validated={state.validated}
              form={state.form}
              onProceed={handleCreateOrder}
              onBack={() => setStep(2)}
              loading={createOrder.isPending}
              error={localError}
            />
          )}

          {step === 4 && (
            <StepPayment
              amount={Number.parseFloat(state.form.amount)}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
              loading={paymentLoading}
              paymentFailed={state.paymentFailed}
              onRetry={handleRetryPayment}
            />
          )}

          {step === 5 && (
            <StepToken
              tokenResult={state.tokenResult}
              meterNumber={state.form.meterNumber}
              amount={Number.parseFloat(state.form.amount)}
              failed={state.paymentFailed || !state.tokenResult}
              timestamp={state.order?.createdAt ?? null}
            />
          )}

          {/* Post-token actions */}
          {step === 5 && (
            <div className="mt-5 pt-4 border-t border-border space-y-2">
              <button
                type="button"
                data-ocid="btn-new-purchase"
                onClick={handleReset}
                className="w-full h-11 rounded-xl border border-input bg-muted text-foreground font-medium text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/10 hover:text-primary hover:border-primary/30"
              >
                <Zap className="w-4 h-4" />
                Buy More Electricity
              </button>
              <button
                type="button"
                data-ocid="btn-view-history"
                onClick={() => void navigate({ to: "/history" })}
                className="w-full h-11 rounded-xl border border-input bg-card text-muted-foreground font-medium text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-muted"
              >
                View Transaction History
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
