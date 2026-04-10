import { c as createLucideIcon, u as useAuth, d as useNavigate, r as reactExports, j as jsxRuntimeExports, Z as Zap, L as LogIn } from "./index-CM896zBE.js";
import { u as useTransactions, f as formatTimestamp, a as formatCredit } from "./index-Cxc1ny_n.js";
import { R as Receipt } from "./receipt-CcB3f4T9.js";
import { C as Clock } from "./clock-DjvFB3AE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
function StatusBadge({ status }) {
  const classes = {
    completed: "badge-success",
    pending: "badge-pending",
    failed: "badge-failed"
  };
  const labels = {
    completed: "SUCCESS",
    pending: "PENDING",
    failed: "FAILED"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes[status], "data-ocid": `status-badge-${status}`, children: labels[status] });
}
const FILTERS = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" }
];
function FilterTabs({
  active,
  onChange,
  counts
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex gap-1 p-1 bg-muted/50 rounded-lg w-full sm:w-auto overflow-x-auto",
      "data-ocid": "filter-tabs",
      role: "tablist",
      children: FILTERS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": active === value,
          onClick: () => onChange(value),
          className: `flex-1 sm:flex-none flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-smooth
            ${active === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
          "data-ocid": `filter-tab-${value}`,
          children: [
            label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs rounded-full px-1.5 py-0.5 leading-none
              ${active === value ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
                children: counts[value]
              }
            )
          ]
        },
        value
      ))
    }
  );
}
function TransactionRow({
  tx,
  onClick
}) {
  const status = tx.status;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "group border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-smooth",
      onClick,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      },
      tabIndex: 0,
      "data-ocid": `tx-row-${tx.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-foreground block truncate max-w-[110px] sm:max-w-none", children: tx.meterNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground sm:hidden", children: tx.disco })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 sm:px-6 text-sm text-muted-foreground hidden sm:table-cell", children: tx.disco }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 sm:px-6 text-sm text-muted-foreground hidden sm:table-cell", children: formatTimestamp(tx.createdAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 sm:px-6 text-sm font-semibold text-foreground", children: formatCredit(tx.creditAmount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 sm:px-6 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 sm:px-6 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatTimestamp(tx.createdAt) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth ml-auto" }) })
      ]
    }
  );
}
function EmptyState({ filter }) {
  const msg = filter === "all" ? "Your purchase history will appear here once you buy electricity." : `No ${filter} transactions found. Try a different filter.`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 gap-4 text-center",
      "data-ocid": "empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-7 h-7 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium text-foreground", children: filter === "all" ? "No transactions yet" : `No ${filter} transactions` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: msg })
        ] })
      ]
    }
  );
}
function LoginPrompt({ login }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 gap-5 text-center",
      "data-ocid": "login-prompt",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground font-display", children: "Sign in to view your history" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: "Log in with Internet Identity to see all your past electricity purchases." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: login,
            className: "flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold transition-smooth hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "login-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
              "Sign In"
            ]
          }
        )
      ]
    }
  );
}
function ErrorState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
      "data-ocid": "error-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Failed to load transactions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Please refresh the page." })
      ]
    }
  );
}
const SKELETON_ROWS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"];
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", "data-ocid": "loading-skeleton", children: SKELETON_ROWS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-4 px-4 sm:px-6 py-3.5 border-b border-border last:border-0 animate-pulse",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-muted flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-muted rounded w-28" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-40 hidden sm:block" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-muted rounded w-14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded-full w-20 hidden sm:block" })
      ]
    },
    id
  )) });
}
function StatCard({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide truncate", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground font-display leading-tight", children: value })
    ] })
  ] });
}
function History() {
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const { data: transactions, isLoading, isError } = useTransactions();
  const navigate = useNavigate();
  const [filter, setFilter] = reactExports.useState("all");
  const sorted = reactExports.useMemo(() => {
    if (!transactions) return [];
    return [...transactions].sort((a, b) => Number(b.createdAt - a.createdAt));
  }, [transactions]);
  const counts = reactExports.useMemo(() => {
    const completed = sorted.filter((t) => t.status === "completed").length;
    const pending = sorted.filter((t) => t.status === "pending").length;
    const failed = sorted.filter((t) => t.status === "failed").length;
    return { all: sorted.length, completed, pending, failed };
  }, [sorted]);
  const filtered = reactExports.useMemo(() => {
    if (filter === "all") return sorted;
    return sorted.filter((t) => t.status === filter);
  }, [sorted, filter]);
  const totalSpent = reactExports.useMemo(
    () => sorted.filter((t) => t.status === "completed").reduce((sum, t) => sum + Number(t.creditAmount), 0),
    [sorted]
  );
  const totalSpentFormatted = reactExports.useMemo(() => {
    const nairaAmount = totalSpent / 100;
    return `₦${nairaAmount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
  }, [totalSpent]);
  function handleRowClick(id) {
    navigate({ to: "/receipt/$id", params: { id: id.toString() } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-up",
      "data-ocid": "page-history",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Transaction History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Browse all your past electricity purchases" })
        ] }),
        !authLoading && !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, { login }),
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          !isLoading && !isError && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Purchases",
                value: counts.all.toString(),
                icon: Receipt
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Spent",
                value: totalSpentFormatted,
                icon: Zap
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Pending",
                value: counts.pending.toString(),
                icon: Clock
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground font-display", children: "Purchases" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterTabs,
                {
                  active: filter,
                  onChange: setFilter,
                  counts
                }
              )
            ] }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {}) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { filter }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "transactions-list", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 sm:px-6 py-3", children: "Meter" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 sm:px-6 py-3 hidden sm:table-cell", children: "DisCo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 sm:px-6 py-3 hidden sm:table-cell", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 sm:px-6 py-3", children: "Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 sm:px-6 py-3 hidden sm:table-cell", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 sm:px-6 py-3 sm:hidden text-right", children: "Details" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 sm:px-6 py-3", "aria-label": "Receipt" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TransactionRow,
                {
                  tx,
                  onClick: () => handleRowClick(tx.id)
                },
                tx.id.toString()
              )) })
            ] }) })
          ] })
        ] })
      ]
    }
  );
}
export {
  History
};
