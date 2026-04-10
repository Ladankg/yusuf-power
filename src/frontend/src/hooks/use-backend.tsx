import { type Backend, createActor } from "@/backend";
import type {
  AdminStats,
  Meter,
  MeterId,
  TokenResult,
  Transaction,
  TransactionId,
  ValidatedMeter,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Typed actor methods interface ────────────────────────────────────────────
interface BackendActor {
  addMeter: (
    meterNumber: string,
    displayName: string,
    disco: string,
  ) => Promise<Meter>;
  getMeters: () => Promise<Meter[]>;
  getMeter: (meterId: MeterId) => Promise<Meter | null>;
  deleteMeter: (meterId: MeterId) => Promise<boolean>;
  validateMeter: (
    meterNumber: string,
    disco: string,
  ) => Promise<
    { __kind__: "ok"; ok: ValidatedMeter } | { __kind__: "err"; err: string }
  >;
  purchaseToken: (
    meterNumber: string,
    disco: string,
    amount: bigint,
    customerName: string,
    paymentMethod: string,
  ) => Promise<
    { __kind__: "ok"; ok: TokenResult } | { __kind__: "err"; err: string }
  >;
  createOrder: (
    meterNumber: string,
    disco: string,
    customerName: string,
    creditAmount: bigint,
    paymentMethod: string,
  ) => Promise<Transaction>;
  completeOrder: (
    txId: TransactionId,
    token: string,
    units: number,
  ) => Promise<Transaction | null>;
  failOrder: (txId: TransactionId) => Promise<Transaction | null>;
  getMyTransactions: () => Promise<Transaction[]>;
  getAllTransactions: () => Promise<Transaction[]>;
  getTransaction: (txId: TransactionId) => Promise<Transaction | null>;
  getAdminStats: () => Promise<AdminStats>;
}

function useBackendActor() {
  const { actor, isFetching } = useActor<Backend>(createActor);
  return { actor: actor as unknown as BackendActor | null, isFetching };
}

// ─── Meters ───────────────────────────────────────────────────────────────────
export function useMeters() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Meter[]>({
    queryKey: ["meters"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMeters();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMeter() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    Meter,
    Error,
    { meterNumber: string; displayName: string; disco: string }
  >({
    mutationFn: ({ meterNumber, displayName, disco }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addMeter(meterNumber, displayName, disco);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meters"] }),
  });
}

export function useDeleteMeter() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, MeterId>({
    mutationFn: (meterId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteMeter(meterId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meters"] }),
  });
}

// ─── Meter Validation ─────────────────────────────────────────────────────────
export function useValidateMeter() {
  const { actor } = useBackendActor();
  return useMutation<
    ValidatedMeter,
    Error,
    { meterNumber: string; disco: string }
  >({
    mutationFn: async ({ meterNumber, disco }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.validateMeter(meterNumber, disco);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
  });
}

// ─── Token Purchase ───────────────────────────────────────────────────────────
export function usePurchaseToken() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    TokenResult,
    Error,
    {
      meterNumber: string;
      disco: string;
      amount: bigint;
      customerName: string;
      paymentMethod: string;
    }
  >({
    mutationFn: async ({
      meterNumber,
      disco,
      amount,
      customerName,
      paymentMethod,
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.purchaseToken(
        meterNumber,
        disco,
        amount,
        customerName,
        paymentMethod,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

// ─── Transactions ─────────────────────────────────────────────────────────────
export function useTransactions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyTransactions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTransaction(txId: TransactionId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Transaction | null>({
    queryKey: ["transaction", txId?.toString()],
    queryFn: async () => {
      if (!actor || txId === null) return null;
      return actor.getTransaction(txId);
    },
    enabled: !!actor && !isFetching && txId !== null,
  });
}

export function useCreateOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    Transaction,
    Error,
    {
      meterNumber: string;
      disco: string;
      customerName: string;
      creditAmount: bigint;
      paymentMethod: string;
    }
  >({
    mutationFn: ({
      meterNumber,
      disco,
      customerName,
      creditAmount,
      paymentMethod,
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createOrder(
        meterNumber,
        disco,
        customerName,
        creditAmount,
        paymentMethod,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

export function useCompleteOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    Transaction | null,
    Error,
    { txId: TransactionId; token: string; units: number }
  >({
    mutationFn: async ({ txId, token, units }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.completeOrder(txId, token, units);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

export function useFailOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<Transaction | null, Error, TransactionId>({
    mutationFn: async (txId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.failOrder(txId);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export function useAdminStats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AdminStats | null>({
    queryKey: ["adminStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllTransactions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Transaction[]>({
    queryKey: ["allTransactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTransactions();
    },
    enabled: !!actor && !isFetching,
  });
}
