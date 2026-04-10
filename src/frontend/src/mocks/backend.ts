import type { backendInterface, Meter, Transaction } from "../backend.d";
import { OrderStatus } from "../backend.d";
import { Principal } from "@icp-sdk/core/principal";

const mockOwner = Principal.fromText("2vxsx-fae");
const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleMeters: Meter[] = [
  {
    id: BigInt(1),
    displayName: "Home - Kitchen",
    owner: mockOwner,
    meterNumber: "KE001-2345678",
    disco: "IKEDC",
    createdAt: now,
  },
  {
    id: BigInt(2),
    displayName: "Office Block A",
    owner: mockOwner,
    meterNumber: "KE002-9876543",
    disco: "AEDC",
    createdAt: now - BigInt(86400000000000),
  },
];

const sampleTransactions: Transaction[] = [
  {
    id: BigInt(1),
    status: OrderStatus.completed,
    owner: mockOwner,
    meterNumber: "KE001-2345678",
    disco: "IKEDC",
    customerName: "Aminu Yusuf",
    createdAt: now,
    token: "4521883099120034774",
    creditAmount: BigInt(100000),
    paymentMethod: "paystack",
  },
  {
    id: BigInt(2),
    status: OrderStatus.pending,
    owner: mockOwner,
    meterNumber: "KE002-9876543",
    disco: "AEDC",
    customerName: "Fatima Bello",
    createdAt: now - BigInt(3600000000000),
    creditAmount: BigInt(200000),
    paymentMethod: "paystack",
  },
  {
    id: BigInt(3),
    status: OrderStatus.failed,
    owner: mockOwner,
    meterNumber: "KE001-2345678",
    disco: "IKEDC",
    customerName: "Aminu Yusuf",
    createdAt: now - BigInt(86400000000000),
    creditAmount: BigInt(50000),
    paymentMethod: "paystack",
  },
];

export const mockBackend: backendInterface = {
  addMeter: async (meterNumber, displayName, disco) => ({
    id: BigInt(Date.now()),
    displayName,
    owner: mockOwner,
    meterNumber,
    disco,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
  }),
  completeOrder: async (txId, _token, _units) =>
    sampleTransactions.find((t) => t.id === txId) ?? null,
  createOrder: async (meterNumber, disco, customerName, creditAmount, paymentMethod) => ({
    id: BigInt(Date.now()),
    status: OrderStatus.pending,
    owner: mockOwner,
    meterNumber,
    disco,
    customerName,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    creditAmount,
    paymentMethod,
  }),
  deleteMeter: async () => true,
  failOrder: async (txId) =>
    sampleTransactions.find((t) => t.id === txId) ?? null,
  getAdmin: async () => null,
  getAdminStats: async () => ({
    totalCount: BigInt(sampleTransactions.length),
    totalRevenue: sampleTransactions.reduce((sum, t) => sum + t.creditAmount, BigInt(0)),
    recentTransactions: sampleTransactions,
  }),
  getAllTransactions: async () => sampleTransactions,
  getMeter: async (meterId) =>
    sampleMeters.find((m) => m.id === meterId) ?? null,
  getMeters: async () => sampleMeters,
  getMyTransactions: async () => sampleTransactions,
  getTransaction: async (txId) =>
    sampleTransactions.find((t) => t.id === txId) ?? null,
  purchaseToken: async (meterNumber, _disco, amount) => ({
    __kind__: "ok" as const,
    ok: {
      token: "4521883099120034774",
      units: Number(amount) / 100 / 100,
      transactionId: BigInt(Date.now()),
    },
  }),
  setAdmin: async (_p) => undefined,
  validateMeter: async (meterNumber, disco) => ({
    __kind__: "ok" as const,
    ok: {
      customerName: "Aminu Yusuf",
      meterNumber,
      disco,
    },
  }),
};
