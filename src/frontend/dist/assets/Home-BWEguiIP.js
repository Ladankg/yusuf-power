import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, Z as Zap, B as Button, L as LogIn, S as ShieldCheck, H as History, a as Link, b as Skeleton } from "./index-CM896zBE.js";
import { C as Card, a as CardContent } from "./card-BKNbS5Tv.js";
import { u as useTransactions, f as formatTimestamp, a as formatCredit } from "./index-Cxc1ny_n.js";
import { C as CircleCheck, a as CircleX } from "./circle-x-BYwHQvSo.js";
import { C as Clock } from "./clock-DjvFB3AE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function StatusBadge({ status }) {
  if (status === "completed")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-success", children: "Success" });
  if (status === "pending")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-pending", children: "Pending" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-failed", children: "Failed" });
}
function TransactionSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3.5 flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 ml-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12 ml-auto rounded-full" })
    ] })
  ] }) });
}
function LoginPrompt({
  onLogin,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 fade-up", "data-ocid": "login-prompt", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden bg-primary shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat",
          style: {
            backgroundImage: "url('/assets/generated/yusuf-power-hero.dim_800x600.png')"
          },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-6 pt-10 pb-8 flex flex-col items-center text-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/30 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Zap,
          {
            className: "w-10 h-10 text-primary-foreground",
            strokeWidth: 2
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-primary-foreground tracking-tight leading-tight", children: "Yusuf Power" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary-foreground/80 text-base mt-2 leading-relaxed max-w-xs", children: [
            "Power your home, anytime.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/60 text-sm", children: "Fast, secure electricity tokens for every Nigerian." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "w-full max-w-xs mt-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold gap-2 h-14 text-base rounded-2xl transition-smooth shadow-md",
            onClick: onLogin,
            disabled: isLoading,
            "data-ocid": "login-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
              isLoading ? "Connecting…" : "Sign in to Buy Electricity"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1", children: "Why choose Yusuf Power?" }),
      [
        {
          icon: Zap,
          title: "Instant Electricity Tokens",
          desc: "Get your prepaid token in seconds, direct to your screen.",
          color: "text-primary",
          bg: "bg-primary/10"
        },
        {
          icon: ShieldCheck,
          title: "Secure Payments via Paystack",
          desc: "Bank-grade encryption keeps your transactions safe.",
          color: "text-primary",
          bg: "bg-primary/10"
        },
        {
          icon: History,
          title: "Full Transaction History",
          desc: "Every purchase saved — find your old tokens anytime.",
          color: "text-primary",
          bg: "bg-primary/10"
        }
      ].map(({ icon: Icon, title, desc, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `flex-shrink-0 w-10 h-10 rounded-xl ${bg} flex items-center justify-center`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: desc })
            ] })
          ]
        },
        title
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/30 border border-border px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Supported DisCos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: [
        "AEDC",
        "Ikeja",
        "Eko",
        "Ibadan",
        "Enugu",
        "PHC",
        "Kano",
        "Kaduna",
        "Benin",
        "Jos"
      ].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full",
          children: d
        },
        d
      )) })
    ] })
  ] });
}
function LastTransactionCard({ isLoading }) {
  const { data: txs, isLoading: txLoading } = useTransactions();
  const loading = isLoading || txLoading;
  const lastTx = (txs == null ? void 0 : txs[0]) ?? null;
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2", children: "Last Purchase" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionSkeleton, {})
    ] });
  }
  if (!lastTx) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "last-transaction", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Last Purchase" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/history",
          className: "text-xs text-primary hover:underline transition-smooth flex items-center gap-0.5",
          children: [
            "See all ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/receipt/$id",
        params: { id: lastTx.id.toString() },
        "data-ocid": "last-tx-row",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card card-lift cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3.5 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: lastTx.status === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary" }) : lastTx.status === "failed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-accent-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: lastTx.meterNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                formatTimestamp(lastTx.createdAt)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: formatCredit(lastTx.creditAmount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: lastTx.status })
          ] })
        ] }) })
      }
    )
  ] });
}
function AuthenticatedHome() {
  const { data: txs, isLoading: txLoading } = useTransactions();
  const totalPurchases = (txs == null ? void 0 : txs.filter((t) => t.status === "completed").length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 fade-up", "data-ocid": "page-home", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden bg-primary shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 opacity-10 bg-cover bg-center",
          style: {
            backgroundImage: "url('/assets/generated/yusuf-power-hero.dim_800x600.png')"
          },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-6 pt-8 pb-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-7 h-7 rounded-lg bg-primary-foreground/20 border border-primary-foreground/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Zap,
            {
              className: "w-3.5 h-3.5 text-primary-foreground",
              strokeWidth: 2.5
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary-foreground/70 tracking-wide uppercase", children: "Yusuf Power" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-primary-foreground leading-tight", children: [
          "Power your home,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "anytime."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-sm mt-1.5", children: totalPurchases > 0 ? `${totalPurchases} successful purchase${totalPurchases > 1 ? "s" : ""} made.` : "Your electricity, delivered instantly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "mt-5 w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold gap-2 h-14 text-base rounded-2xl transition-smooth shadow-md",
            "data-ocid": "buy-electricity-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/purchase", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
              "Buy Electricity",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-auto opacity-60" })
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/history", "data-ocid": "nav-history-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card card-lift cursor-pointer h-full border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "View past purchases" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", "data-ocid": "nav-admin-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card card-lift cursor-pointer h-full border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Dashboard & stats" })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LastTransactionCard, { isLoading: txLoading }),
    !txLoading && ((txs == null ? void 0 : txs.length) ?? 0) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-dashed", "data-ocid": "empty-transactions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-8 flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6 text-primary/60" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No transactions yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-[240px]", children: "Your first electricity purchase will show up here." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          size: "sm",
          className: "gap-1.5 mt-1 font-semibold rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/purchase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
            "Buy your first token"
          ] })
        }
      )
    ] }) })
  ] });
}
function Home() {
  const { isAuthenticated, isLoading, login } = useAuth();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, { onLogin: login, isLoading });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedHome, {});
}
export {
  Home
};
