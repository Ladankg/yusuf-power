import { c as createLucideIcon, j as jsxRuntimeExports, h as Slot, f as cn, i as cva, u as useAuth, b as Skeleton, S as ShieldCheck, B as Button, L as LogIn, r as reactExports } from "./index-CM896zBE.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BKNbS5Tv.js";
import { i as useAdminStats, j as useAllTransactions, a as formatCredit, f as formatTimestamp } from "./index-Cxc1ny_n.js";
import { u as ue } from "./index-Cus_XuJC.js";
import { C as Copy } from "./copy-BzjeSTDI.js";
import { R as Receipt } from "./receipt-CcB3f4T9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function StatusBadge({ status }) {
  if (status === "completed")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-success", children: "Completed" });
  if (status === "failed") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-failed", children: "Failed" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-pending", children: "Pending" });
}
function StatCard({
  icon: Icon,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card card-lift fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-2xl font-display font-bold text-foreground truncate", children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) })
  ] }) }) });
}
function StatsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
  ] }) }, i)) });
}
function TransactionsTable({ transactions }) {
  if (transactions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        "data-ocid": "admin-table-empty",
        className: "py-10 text-center text-sm text-muted-foreground",
        children: "No transactions found."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40 hover:bg-muted/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold whitespace-nowrap", children: "Meter #" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold whitespace-nowrap", children: "DisCo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold whitespace-nowrap", children: "Customer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-right whitespace-nowrap", children: "Amount" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold whitespace-nowrap", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold whitespace-nowrap", children: "Date" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: transactions.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      TableRow,
      {
        "data-ocid": `admin-tx-row-${i}`,
        className: "hover:bg-muted/20 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs whitespace-nowrap", children: tx.meterNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs whitespace-nowrap", children: tx.disco }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs max-w-[100px] truncate", children: tx.customerName || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-semibold text-right whitespace-nowrap tabular-nums", children: formatCredit(tx.creditAmount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tx.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground whitespace-nowrap", children: formatTimestamp(tx.createdAt) })
        ]
      },
      tx.id.toString()
    )) })
  ] }) });
}
const PAGE_SIZE = 20;
function AllTransactionsSection({
  transactions
}) {
  const [page, setPage] = reactExports.useState(0);
  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
  const pageRows = transactions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card fade-up", "data-ocid": "admin-all-transactions", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4 text-primary" }),
        "All Transactions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full", children: [
        transactions.length,
        " total"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0 pt-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionsTable, { transactions: pageRows }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            disabled: page === 0,
            onClick: () => setPage((p) => p - 1),
            "data-ocid": "admin-prev-page",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          page + 1,
          " / ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            disabled: page >= totalPages - 1,
            onClick: () => setPage((p) => p + 1),
            "data-ocid": "admin-next-page",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function LoginPrompt({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin-login-gate",
      className: "flex flex-col items-center justify-center gap-5 py-16 text-center fade-up",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-7 h-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Sign in required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Log in with Internet Identity to access the admin dashboard." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onLogin,
            className: "gap-2 px-8",
            "data-ocid": "admin-login-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
              "Log in with Internet Identity"
            ]
          }
        )
      ]
    }
  );
}
function AccessDenied({ principalText }) {
  const handleCopy = () => {
    if (!principalText) return;
    navigator.clipboard.writeText(principalText);
    ue.success("Principal ID copied!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin-access-denied",
      className: "flex flex-col items-center gap-5 py-12 text-center fade-up",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-7 h-7 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-destructive", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-sm", children: [
            "Admin privileges required. The canister owner must call",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1.5 py-0.5 rounded text-xs font-mono", children: "setAdmin" }),
            " ",
            "with your principal ID to grant access."
          ] })
        ] }),
        principalText && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-sm bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground text-left", children: "Your Principal ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 break-all text-xs font-mono text-foreground bg-muted/50 rounded-lg p-3 leading-relaxed text-left", children: principalText }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleCopy,
                className: "shrink-0 mt-0.5",
                "data-ocid": "admin-copy-principal",
                "aria-label": "Copy principal ID",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function Admin() {
  const {
    isAuthenticated,
    isLoading: authLoading,
    principalText,
    login
  } = useAuth();
  const statsQuery = useAdminStats();
  const allTxQuery = useAllTransactions();
  const isAdminError = statsQuery.isError || allTxQuery.isError;
  const isDataLoading = statsQuery.isLoading || allTxQuery.isLoading;
  const stats = statsQuery.data ?? null;
  const allTransactions = allTxQuery.data ?? [];
  const completedCount = allTransactions.filter(
    (tx) => tx.status === "completed"
  ).length;
  if (authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSkeleton, {})
    ] });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, { onLogin: login });
  }
  if (isAdminError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, { principalText });
  }
  if (isDataLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 py-2 fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold", children: "Admin Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
        [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-full rounded-md" }, i))
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 fade-up", "data-ocid": "admin-dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold", children: "Admin Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "gap-1.5 text-primary border-primary/30 bg-primary/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5" }),
            "Admin Access"
          ]
        }
      )
    ] }),
    principalText && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20 fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-primary mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-0.5", children: "Your Principal ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground break-all leading-relaxed", children: principalText }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5", children: [
          "Share this with the canister owner to grant or revoke admin. They must call",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-background px-1 rounded font-mono", children: "setAdmin" }),
          " ",
          "with this principal."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "shrink-0 h-7 w-7 p-0",
          onClick: () => {
            navigator.clipboard.writeText(principalText);
            ue.success("Principal copied!");
          },
          "aria-label": "Copy principal ID",
          "data-ocid": "admin-copy-principal-header",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5 text-primary" })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
        "data-ocid": "admin-stats-grid",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: ChartColumn,
              label: "Total Transactions",
              value: stats ? stats.totalCount.toString() : allTransactions.length.toString(),
              sub: "All time"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: DollarSign,
              label: "Total Revenue",
              value: stats ? `₦${(Number(stats.totalRevenue) / 100).toLocaleString("en-NG")}` : formatCredit(
                allTransactions.reduce((s, t) => s + t.creditAmount, 0n)
              ),
              sub: "Sum of all amounts"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: BadgeCheck,
              label: "Completed",
              value: completedCount.toString(),
              sub: `of ${allTransactions.length} transactions`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card fade-up", "data-ocid": "admin-recent-transactions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4 text-primary" }),
        "Recent Transactions"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 pt-0", children: stats && stats.recentTransactions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        TransactionsTable,
        {
          transactions: stats.recentTransactions.slice(0, 10)
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "No recent transactions yet." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AllTransactionsSection, { transactions: allTransactions })
  ] });
}
export {
  Admin
};
