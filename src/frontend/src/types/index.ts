import type { Principal } from "@icp-sdk/core/principal";

// ─── Primitive Aliases ───────────────────────────────────────────────────────
export type UserId = Principal;
export type Timestamp = bigint;
export type TransactionId = bigint;
export type MeterId = bigint;

// ─── Meter ───────────────────────────────────────────────────────────────────
export interface Meter {
  id: MeterId;
  owner: UserId;
  meterNumber: string;
  displayName: string;
  disco: string;
  createdAt: Timestamp;
}

// ─── Transaction / Vending ───────────────────────────────────────────────────
export type OrderStatus = "pending" | "completed" | "failed";

export interface Transaction {
  id: TransactionId;
  owner: UserId;
  meterNumber: string;
  disco: string;
  customerName: string;
  creditAmount: bigint;
  token?: string;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: Timestamp;
}

// ─── Meter Validation ────────────────────────────────────────────────────────
export interface ValidatedMeter {
  customerName: string;
  meterNumber: string;
  disco: string;
}

// ─── Token Result ────────────────────────────────────────────────────────────
export interface TokenResult {
  token: string;
  units: number;
  transactionId: TransactionId;
}

// ─── Admin Stats ─────────────────────────────────────────────────────────────
export interface AdminStats {
  totalCount: bigint;
  totalRevenue: bigint;
  recentTransactions: Transaction[];
}

// ─── DisCo Options ───────────────────────────────────────────────────────────
export const DISCO_OPTIONS = [
  { value: "AEDC", label: "AEDC — Abuja DisCo" },
  { value: "IKEDC", label: "Ikeja Electric" },
  { value: "EKEDC", label: "Eko Electric" },
  { value: "IBEDC", label: "Ibadan DisCo" },
  { value: "EEDC", label: "Enugu DisCo" },
  { value: "PHEDC", label: "Port Harcourt DisCo" },
  { value: "KAEDCO", label: "Kaduna DisCo" },
  { value: "JEDC", label: "Jos DisCo" },
  { value: "BEDC", label: "Benin DisCo" },
  { value: "KEDCO", label: "Kano DisCo" },
] as const;

export type DiscoValue = (typeof DISCO_OPTIONS)[number]["value"];

// ─── UI Helpers ──────────────────────────────────────────────────────────────
export function getOrderStatusKey(status: OrderStatus): OrderStatus {
  return status;
}

export function formatTimestamp(ts: Timestamp): string {
  return new Date(Number(ts) / 1_000_000).toLocaleString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatCredit(creditAmount: bigint): string {
  return `₦${(Number(creditAmount) / 100).toFixed(2)}`;
}

export function formatNaira(kobo: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(kobo / 100);
}
