import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type TransactionId = bigint;
export interface TokenResult {
    token: string;
    units: number;
    transactionId: TransactionId;
}
export type Timestamp = bigint;
export interface ValidatedMeter {
    customerName: string;
    meterNumber: string;
    disco: string;
}
export interface Meter {
    id: MeterId;
    displayName: string;
    owner: UserId;
    meterNumber: string;
    createdAt: Timestamp;
    disco: string;
}
export interface AdminStats {
    totalCount: bigint;
    recentTransactions: Array<Transaction>;
    totalRevenue: bigint;
}
export type MeterId = bigint;
export interface Transaction {
    id: TransactionId;
    customerName: string;
    status: OrderStatus;
    token?: string;
    paymentMethod: string;
    owner: UserId;
    meterNumber: string;
    createdAt: Timestamp;
    creditAmount: bigint;
    disco: string;
}
export enum OrderStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export interface backendInterface {
    addMeter(meterNumber: string, displayName: string, disco: string): Promise<Meter>;
    completeOrder(txId: TransactionId, token: string, units: number): Promise<Transaction | null>;
    createOrder(meterNumber: string, disco: string, customerName: string, creditAmount: bigint, paymentMethod: string): Promise<Transaction>;
    deleteMeter(meterId: MeterId): Promise<boolean>;
    failOrder(txId: TransactionId): Promise<Transaction | null>;
    getAdmin(): Promise<Principal | null>;
    getAdminStats(): Promise<AdminStats>;
    getAllTransactions(): Promise<Array<Transaction>>;
    getMeter(meterId: MeterId): Promise<Meter | null>;
    getMeters(): Promise<Array<Meter>>;
    getMyTransactions(): Promise<Array<Transaction>>;
    getTransaction(txId: TransactionId): Promise<Transaction | null>;
    purchaseToken(meterNumber: string, disco: string, amount: bigint, customerName: string, paymentMethod: string): Promise<{
        __kind__: "ok";
        ok: TokenResult;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setAdmin(p: Principal): Promise<void>;
    validateMeter(meterNumber: string, disco: string): Promise<{
        __kind__: "ok";
        ok: ValidatedMeter;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
