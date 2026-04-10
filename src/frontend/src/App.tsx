import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  notFound,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ─── Lazy pages ───────────────────────────────────────────────────────────────
const Home = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.Home })),
);
const Purchase = lazy(() =>
  import("@/pages/Purchase").then((m) => ({ default: m.Purchase })),
);
const History = lazy(() =>
  import("@/pages/History").then((m) => ({ default: m.History })),
);
const Receipt = lazy(() =>
  import("@/pages/Receipt").then((m) => ({ default: m.Receipt })),
);
const Admin = lazy(() =>
  import("@/pages/Admin").then((m) => ({ default: m.Admin })),
);
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound })),
);

// ─── Page loading skeleton ────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="space-y-4 pt-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  );
}

// ─── Root layout route ────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
  notFoundComponent: () => (
    <Suspense fallback={<PageLoader />}>
      <NotFound />
    </Suspense>
  ),
});

// ─── Page routes ──────────────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const purchaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/purchase",
  component: Purchase,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: History,
});

const receiptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/receipt/$id",
  component: Receipt,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  purchaseRoute,
  historyRoute,
  receiptRoute,
  adminRoute,
]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    throw notFound();
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
