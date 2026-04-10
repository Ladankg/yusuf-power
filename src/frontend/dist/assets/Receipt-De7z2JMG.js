import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as createSlot, f as cn, g as useParams, d as useNavigate, B as Button, b as Skeleton, Z as Zap } from "./index-CM896zBE.js";
import { h as useTransaction, a as formatCredit, f as formatTimestamp } from "./index-Cxc1ny_n.js";
import { u as ue } from "./index-Cus_XuJC.js";
import { R as Receipt$1 } from "./receipt-CcB3f4T9.js";
import { a as CircleX, C as CircleCheck } from "./circle-x-BYwHQvSo.js";
import { C as Clock } from "./clock-DjvFB3AE.js";
import { C as Copy } from "./copy-BzjeSTDI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const STATUS_CONFIG = {
  completed: {
    icon: CircleCheck,
    label: "Payment Successful",
    subLabel: "Token Generated Successfully",
    color: "text-primary",
    ringColor: "ring-primary/20",
    bgColor: "bg-primary/10",
    badgeClass: "badge-success"
  },
  pending: {
    icon: Clock,
    label: "Payment Pending",
    subLabel: "Your transaction is being processed",
    color: "text-accent-foreground",
    ringColor: "ring-accent/20",
    bgColor: "bg-accent/10",
    badgeClass: "badge-pending"
  },
  failed: {
    icon: CircleX,
    label: "Payment Failed",
    subLabel: "This transaction could not be completed",
    color: "text-destructive",
    ringColor: "ring-destructive/20",
    bgColor: "bg-destructive/10",
    badgeClass: "badge-failed"
  }
};
function DetailRow({
  label,
  value,
  mono = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-sm text-right font-medium break-all min-w-0 ${mono ? "font-mono tracking-wide" : ""}`,
        children: value
      }
    )
  ] });
}
function TokenBlock({ token }) {
  var _a;
  const [copied, setCopied] = reactExports.useState(false);
  const grouped = ((_a = token.replace(/\s/g, "").match(/.{1,4}/g)) == null ? void 0 : _a.join("  ")) ?? token;
  function handleCopy() {
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true);
      ue.success("Token copied to clipboard");
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "success-pulse rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider", children: "Vending Token" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "code",
        {
          className: "flex-1 font-mono text-base tracking-[0.2em] text-foreground bg-background border border-border rounded-lg px-4 py-3 break-all leading-relaxed min-w-0 text-center",
          "data-ocid": "token-value",
          children: grouped
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleCopy,
          "aria-label": "Copy token to clipboard",
          "data-ocid": "copy-token-btn",
          className: "shrink-0 transition-smooth",
          children: [
            copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5", children: copied ? "Copied" : "Copy" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter this token in your meter keypad to load the credit." })
  ] });
}
function ReceiptSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 flex-1 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 flex-1 rounded-lg" })
    ] })
  ] });
}
function StateCard({
  icon: Icon,
  title,
  description,
  iconClass
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 text-center space-y-4 fade-up",
      "data-ocid": "receipt-state-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `size-8 ${iconClass}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold font-display", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: description })
        ] })
      ]
    }
  );
}
function TransactionView({
  transaction,
  onBack,
  onNewPurchase
}) {
  const statusKey = transaction.status;
  const cfg = STATUS_CONFIG[statusKey];
  const StatusIcon = cfg.icon;
  const token = transaction.token ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `rounded-xl border bg-card p-5 fade-up ${statusKey === "completed" ? "success-pulse" : ""}`,
        style: { animationDelay: "0.1s" },
        "data-ocid": "receipt-status-card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `rounded-full p-2 shrink-0 ${cfg.bgColor} ring-4 ${cfg.ringColor}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: `size-5 ${cfg.color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: `font-semibold font-display text-base ${cfg.color}`,
                  children: cfg.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: cfg.subLabel })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cfg.badgeClass, "data-ocid": "receipt-status-badge", children: statusKey.charAt(0).toUpperCase() + statusKey.slice(1) })
        ] })
      }
    ),
    statusKey === "completed" && token && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fade-up",
        style: { animationDelay: "0.15s" },
        "data-ocid": "token-block",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TokenBlock, { token })
      }
    ),
    statusKey === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border bg-accent/5 border-accent/20 p-4 text-sm text-accent-foreground fade-up flex items-start gap-3",
        style: { animationDelay: "0.15s" },
        "data-ocid": "pending-notice",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-4 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your payment is being processed. The vending token will appear here once confirmed — please check back shortly." })
        ]
      }
    ),
    statusKey === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border bg-destructive/5 border-destructive/20 p-4 text-sm text-destructive fade-up flex items-start gap-3",
        style: { animationDelay: "0.15s" },
        "data-ocid": "failed-notice",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-4 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "This transaction failed and no token was generated. No charge was applied. Please try purchasing again." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border bg-card px-5 py-4 fade-up",
        style: { animationDelay: "0.2s" },
        "data-ocid": "receipt-details-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold font-display mb-2", children: "Receipt Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                label: "Transaction ID",
                value: `#${transaction.id.toString()}`,
                mono: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                label: "Meter Number",
                value: transaction.meterNumber,
                mono: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "DiSCo", value: transaction.disco }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Customer", value: transaction.customerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                label: "Credit Amount",
                value: formatCredit(transaction.creditAmount)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                label: "Date & Time",
                value: formatTimestamp(transaction.createdAt)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                label: "Payment Method",
                value: transaction.paymentMethod || "—"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-3 pt-1 fade-up",
        style: { animationDelay: "0.25s" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "flex-1 transition-smooth",
              onClick: onBack,
              "data-ocid": "receipt-back-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1.5" }),
                "View History"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1 transition-smooth",
              onClick: onNewPurchase,
              "data-ocid": "receipt-new-purchase-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 mr-1.5" }),
                "New Purchase"
              ]
            }
          )
        ]
      }
    ),
    statusKey === "completed" && token && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        className: "w-full gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 transition-smooth fade-up",
        onClick: () => {
          const msg = `⚡ Electricity Token from Yusuf Power

Token: ${token}
Meter: ${transaction.meterNumber}
DiSCo: ${transaction.disco}
Amount: ${formatCredit(transaction.creditAmount)}

Powered by Yusuf Power`;
          window.open(
            `https://wa.me/?text=${encodeURIComponent(msg)}`,
            "_blank",
            "noopener,noreferrer"
          );
        },
        "data-ocid": "receipt-whatsapp-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
          "Share via WhatsApp"
        ]
      }
    )
  ] });
}
function Receipt() {
  const { id } = useParams({ from: "/receipt/$id" });
  const navigate = useNavigate();
  const txId = BigInt(id);
  const { data: transaction, isLoading, isError } = useTransaction(txId);
  function goBack() {
    navigate({ to: "/history" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-xl mx-auto px-4 py-8 space-y-5",
      "data-ocid": "page-receipt",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: goBack,
            className: "gap-1.5 text-muted-foreground hover:text-foreground transition-smooth -ml-2",
            "data-ocid": "back-to-history-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
              "Back to History"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 fade-up",
            style: { animationDelay: "0.05s" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt$1, { className: "size-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold font-display", children: "Transaction Receipt" })
            ]
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptSkeleton, {}),
        isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          StateCard,
          {
            icon: CircleX,
            title: "Unable to Load Receipt",
            description: "Something went wrong fetching this transaction. Please try again.",
            iconClass: "text-destructive"
          }
        ),
        !isLoading && !isError && !transaction && /* @__PURE__ */ jsxRuntimeExports.jsx(
          StateCard,
          {
            icon: Receipt$1,
            title: "Transaction Not Found",
            description: "No transaction exists with this ID. The link may be invalid or expired.",
            iconClass: "text-muted-foreground"
          }
        ),
        transaction && /* @__PURE__ */ jsxRuntimeExports.jsx(
          TransactionView,
          {
            transaction,
            onBack: goBack,
            onNewPurchase: () => navigate({ to: "/purchase" })
          }
        )
      ]
    }
  );
}
export {
  Receipt
};
