import { c as createLucideIcon, d as useNavigate, u as useAuth, r as reactExports, j as jsxRuntimeExports, Z as Zap } from "./index-CM896zBE.js";
import { b as useValidateMeter, c as useCreateOrder, d as useCompleteOrder, e as useFailOrder, g as usePurchaseToken, D as DISCO_OPTIONS, f as formatTimestamp } from "./index-Cxc1ny_n.js";
import { C as CircleCheck, a as CircleX } from "./circle-x-BYwHQvSo.js";
import { C as Copy } from "./copy-BzjeSTDI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const STEP_LABELS = ["Details", "Validate", "Confirm", "Payment", "Token"];
function ProgressIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-start justify-between px-1 mb-6",
      "aria-label": "Purchase steps",
      children: STEP_LABELS.map((label, i) => {
        const step = i + 1;
        const isComplete = step < current;
        const isActive = step === current;
        const isLast = i === STEP_LABELS.length - 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: [
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-smooth",
                  isActive ? "step-active shadow-sm" : isComplete ? "step-complete" : "step-inactive"
                ].join(" "),
                "aria-current": isActive ? "step" : void 0,
                children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : step
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: [
                  "text-[10px] font-medium leading-tight text-center",
                  isActive ? "text-primary" : isComplete ? "text-primary/70" : "text-muted-foreground"
                ].join(" "),
                children: label
              }
            )
          ] }),
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: [
                "h-px flex-1 mt-3.5 transition-smooth",
                isComplete ? "bg-primary/40" : "bg-border"
              ].join(" ")
            }
          )
        ] }, label);
      })
    }
  );
}
function DetailRow({
  label,
  value,
  highlight,
  large
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: [
          "text-right font-medium truncate min-w-0",
          highlight ? "text-primary" : "text-foreground",
          large ? "text-base font-bold" : "text-sm"
        ].join(" "),
        children: value
      }
    )
  ] });
}
function Divider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" });
}
function ErrorBanner({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2.5 text-sm text-destructive fade-up",
      "data-ocid": "error-banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message })
      ]
    }
  );
}
function StepDetails({
  form,
  onChange,
  onSubmit,
  loading,
  error
}) {
  const meterValid = /^\d{11,13}$/.test(form.meterNumber);
  const amountNum = Number.parseFloat(form.amount);
  const amountValid = !Number.isNaN(amountNum) && amountNum >= 500;
  const canSubmit = meterValid && !!form.disco && amountValid && !loading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-up space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Buy Electricity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Enter your meter details to get started" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "meter-number",
            className: "text-sm font-medium text-foreground",
            children: "Meter Number"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "meter-number",
            "data-ocid": "input-meter-number",
            type: "tel",
            inputMode: "numeric",
            pattern: "\\d*",
            placeholder: "11–13 digit meter number",
            value: form.meterNumber,
            onChange: (e) => onChange({
              meterNumber: e.target.value.replace(/\D/g, "").slice(0, 13)
            }),
            className: "w-full h-12 px-4 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
            "aria-label": "Meter number"
          }
        ),
        form.meterNumber && !meterValid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Enter 11–13 digits" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "disco-select",
            className: "text-sm font-medium text-foreground",
            children: "Distribution Company (DisCo)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "disco-select",
            "data-ocid": "select-disco",
            value: form.disco,
            onChange: (e) => onChange({ disco: e.target.value }),
            className: "w-full h-12 px-4 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth appearance-none",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select your DisCo…" }),
              DISCO_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "amount-input",
            className: "text-sm font-medium text-foreground",
            children: "Amount (₦)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium pointer-events-none", children: "₦" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "amount-input",
              "data-ocid": "input-amount",
              type: "number",
              inputMode: "numeric",
              min: "500",
              placeholder: "500",
              value: form.amount,
              onChange: (e) => onChange({ amount: e.target.value }),
              className: "w-full h-12 pl-8 pr-4 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            }
          )
        ] }),
        form.amount && !amountValid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Minimum amount is ₦500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 pt-1", children: [500, 1e3, 2e3, 5e3].map((amt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange({ amount: String(amt) }),
            className: [
              "py-2 text-xs rounded-lg border font-medium transition-smooth",
              form.amount === String(amt) ? "bg-primary/10 text-primary border-primary/30" : "border-input bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30"
            ].join(" "),
            "data-ocid": `preset-${amt}`,
            children: amt >= 1e3 ? `₦${amt / 1e3}k` : `₦${amt}`
          },
          amt
        )) })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBanner, { message: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "btn-validate-meter",
        onClick: onSubmit,
        disabled: !canSubmit,
        className: "w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
        children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
          loading ? "Validating…" : "Validate Meter"
        ]
      }
    )
  ] });
}
function StepValidation({
  validated,
  disco,
  onProceed,
  onEdit
}) {
  var _a;
  const discoLabel = ((_a = DISCO_OPTIONS.find((d) => d.value === disco)) == null ? void 0 : _a.label) ?? disco;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-up space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Meter Verified!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "We found your account details" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Customer Name",
          value: validated.customerName,
          highlight: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Meter Number", value: validated.meterNumber }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Distribution Co.", value: discoLabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "btn-proceed-confirmation",
          onClick: onProceed,
          className: "w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90",
          children: "Proceed to Confirmation"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "btn-edit-details",
          onClick: onEdit,
          className: "w-full h-12 rounded-xl border border-input bg-card text-foreground font-medium text-sm transition-smooth hover:bg-muted",
          children: "Edit Details"
        }
      )
    ] })
  ] });
}
function StepConfirmation({
  validated,
  form,
  onProceed,
  onBack,
  loading,
  error
}) {
  var _a;
  const discoLabel = ((_a = DISCO_OPTIONS.find((d) => d.value === form.disco)) == null ? void 0 : _a.label) ?? form.disco;
  const amount = Number.parseFloat(form.amount);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-up space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Confirm Purchase" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Review details before proceeding to payment" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Customer Name",
          value: validated.customerName,
          highlight: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Meter Number", value: form.meterNumber }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "DisCo", value: discoLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Amount",
          value: `₦${amount.toLocaleString("en-NG")}`,
          highlight: true,
          large: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-secondary/60 rounded-lg px-4 py-3 text-xs text-muted-foreground leading-relaxed", children: "By proceeding you confirm all details above are correct. Tokens are non-refundable once vended." }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBanner, { message: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "btn-proceed-payment",
          onClick: onProceed,
          disabled: loading,
          className: "w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90 disabled:opacity-50",
          children: [
            loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            loading ? "Creating Order…" : "Proceed to Pay"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "btn-go-back-confirm",
          onClick: onBack,
          disabled: loading,
          className: "w-full h-12 rounded-xl border border-input bg-card text-foreground font-medium text-sm transition-smooth hover:bg-muted disabled:opacity-50",
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function StepPayment({
  amount,
  onSuccess,
  onFailure,
  loading,
  paymentFailed,
  onRetry
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-up space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Payment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Powered by Paystack — Demo Mode" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-5 pb-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-bold text-sm", children: "PS" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Paystack" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secure Payment Gateway" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary font-medium", children: "Secured" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Amount to Pay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-foreground", children: [
            "₦",
            amount.toLocaleString("en-NG")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 bg-muted/60 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 bg-muted/60 rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 bg-muted/60 rounded-lg" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center", children: "Card fields shown for illustration only. This is a demo integration." })
      ] })
    ] }),
    paymentFailed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-destructive shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: "Payment Failed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive/80 mt-0.5", children: "Transaction was declined. Please try again." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "btn-simulate-payment-success",
          onClick: onSuccess,
          disabled: loading,
          className: "w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90 disabled:opacity-50",
          children: [
            loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            loading ? "Processing…" : "✓ Simulate Payment Success"
          ]
        }
      ),
      paymentFailed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "btn-retry-payment",
          onClick: onRetry,
          className: "w-full h-12 rounded-xl border border-input bg-card text-foreground font-medium text-sm transition-smooth hover:bg-muted",
          children: "Retry Payment"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "btn-simulate-payment-failure",
          onClick: onFailure,
          disabled: loading,
          className: "w-full h-12 rounded-xl border border-destructive/40 bg-destructive/5 text-destructive font-medium text-sm transition-smooth hover:bg-destructive/10 disabled:opacity-50",
          children: "✗ Simulate Payment Failure (Demo)"
        }
      )
    ] })
  ] });
}
function StepToken({
  tokenResult,
  meterNumber,
  amount,
  failed,
  timestamp
}) {
  const [copied, setCopied] = reactExports.useState(false);
  function formatToken(raw) {
    var _a;
    const digits = raw.replace(/\D/g, "");
    return ((_a = digits.match(/.{1,4}/g)) == null ? void 0 : _a.join("-")) ?? raw;
  }
  function copyToken() {
    if (!tokenResult) return;
    void navigator.clipboard.writeText(tokenResult.token.replace(/\D/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }
  function shareWhatsApp() {
    if (!tokenResult) return;
    const token = tokenResult.token.replace(/\D/g, "");
    const units = tokenResult.units.toFixed(1);
    const msg = `Your Yusuf Power token for ${meterNumber}: ${token} (₦${amount.toLocaleString("en-NG")}, ${units} kWh). Powered by Yusuf Power.`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
  if (failed || !tokenResult) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-up space-y-5", "data-ocid": "token-result-failed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-9 h-9 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Purchase Failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "The transaction could not be completed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-failed", children: "FAILED" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Meter Number", value: meterNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DetailRow,
          {
            label: "Amount",
            value: `₦${amount.toLocaleString("en-NG")}`
          }
        ),
        timestamp !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Time", value: formatTimestamp(timestamp) })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "success-pulse space-y-5", "data-ocid": "token-result-success", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Token Received!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Enter this token on your meter to activate electricity" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-success", children: "SUCCESS" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-primary/20 p-5 space-y-3",
        "data-ocid": "token-display",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground text-center uppercase tracking-wider", children: "Vending Token" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "font-mono text-primary text-center leading-relaxed break-all tracking-widest py-1",
              style: { fontSize: "clamp(1.05rem, 5vw, 1.4rem)" },
              children: formatToken(tokenResult.token)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 pt-1 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Units" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                tokenResult.units.toFixed(2),
                " kWh"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-8 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tx ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                "#",
                tokenResult.transactionId.toString()
              ] })
            ] }),
            timestamp !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-8 bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-foreground leading-tight", children: formatTimestamp(timestamp) })
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "btn-copy-token",
          onClick: copyToken,
          className: "flex-1 h-12 rounded-xl border border-input bg-card text-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-muted",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
            copied ? "Copied!" : "Copy Token"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "btn-share-whatsapp",
          onClick: shareWhatsApp,
          className: "flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
            "WhatsApp"
          ]
        }
      )
    ] })
  ] });
}
function AuthGate({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fade-up flex flex-col items-center text-center gap-5 py-8",
      "data-ocid": "login-gate",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: "Sign In Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-xs", children: "Sign in to purchase electricity tokens. Your transactions are securely saved to your account." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "btn-login-gate",
            onClick: onLogin,
            className: "w-full max-w-xs h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/90",
            children: "Sign In with Internet Identity"
          }
        )
      ]
    }
  );
}
function Purchase() {
  var _a;
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const validateMeter = useValidateMeter();
  const createOrder = useCreateOrder();
  const completeOrder = useCompleteOrder();
  const failOrder = useFailOrder();
  const purchaseToken = usePurchaseToken();
  const [step, setStep] = reactExports.useState(1);
  const [state, setState] = reactExports.useState({
    form: { meterNumber: "", disco: "", amount: "" },
    validated: null,
    order: null,
    tokenResult: null,
    paymentFailed: false
  });
  const [localError, setLocalError] = reactExports.useState(null);
  const topRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a2;
    (_a2 = topRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  function updateForm(patch) {
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
        err instanceof Error ? err.message : "Meter validation failed."
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
        paymentMethod: "paystack"
      });
      setState((s) => ({ ...s, order: tx }));
      setStep(4);
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Could not create order."
      );
    }
  }
  async function handlePaymentSuccess() {
    const { order, form, validated } = state;
    if (!order) return;
    const creditAmount = BigInt(
      Math.round(Number.parseFloat(form.amount) * 100)
    );
    try {
      const tokenRes = await purchaseToken.mutateAsync({
        meterNumber: form.meterNumber,
        disco: form.disco,
        amount: creditAmount,
        customerName: (validated == null ? void 0 : validated.customerName) ?? "",
        paymentMethod: "paystack"
      });
      await completeOrder.mutateAsync({
        txId: order.id,
        token: tokenRes.token,
        units: tokenRes.units
      });
      setState((s) => ({
        ...s,
        tokenResult: tokenRes,
        paymentFailed: false
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
      paymentFailed: false
    });
    setLocalError(null);
    validateMeter.reset();
    createOrder.reset();
    setStep(1);
  }
  const paymentLoading = completeOrder.isPending || purchaseToken.isPending || failOrder.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: topRef,
      className: "max-w-md mx-auto px-4 py-6 min-h-[calc(100dvh-8rem)]",
      "data-ocid": "page-purchase",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-green rounded-xl px-5 py-4 mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6 text-white shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-white text-base leading-tight", children: "Yusuf Power" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs", children: "Fast · Secure · Instant" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, { current: step }),
        authLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) }) : !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGate, { onLogin: login }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-5 shadow-sm", children: [
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepDetails,
            {
              form: state.form,
              onChange: updateForm,
              onSubmit: handleValidate,
              loading: validateMeter.isPending,
              error: localError
            }
          ),
          step === 2 && state.validated && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepValidation,
            {
              validated: state.validated,
              disco: state.form.disco,
              onProceed: () => setStep(3),
              onEdit: () => setStep(1)
            }
          ),
          step === 3 && state.validated && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepConfirmation,
            {
              validated: state.validated,
              form: state.form,
              onProceed: handleCreateOrder,
              onBack: () => setStep(2),
              loading: createOrder.isPending,
              error: localError
            }
          ),
          step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepPayment,
            {
              amount: Number.parseFloat(state.form.amount),
              onSuccess: handlePaymentSuccess,
              onFailure: handlePaymentFailure,
              loading: paymentLoading,
              paymentFailed: state.paymentFailed,
              onRetry: handleRetryPayment
            }
          ),
          step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepToken,
            {
              tokenResult: state.tokenResult,
              meterNumber: state.form.meterNumber,
              amount: Number.parseFloat(state.form.amount),
              failed: state.paymentFailed || !state.tokenResult,
              timestamp: ((_a = state.order) == null ? void 0 : _a.createdAt) ?? null
            }
          ),
          step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-border space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "btn-new-purchase",
                onClick: handleReset,
                className: "w-full h-11 rounded-xl border border-input bg-muted text-foreground font-medium text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-primary/10 hover:text-primary hover:border-primary/30",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                  "Buy More Electricity"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "btn-view-history",
                onClick: () => void navigate({ to: "/history" }),
                className: "w-full h-11 rounded-xl border border-input bg-card text-muted-foreground font-medium text-sm flex items-center justify-center gap-2 transition-smooth hover:bg-muted",
                children: "View Transaction History"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  Purchase
};
