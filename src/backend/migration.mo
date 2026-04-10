import List "mo:core/List";
import MeterTypes "types/meters";
import VendingTypes "types/vending";

module {
  // ── Old types (inlined from .old/src/backend/types/*.mo) ───────────────────
  type OldUserId = Principal;
  type OldTimestamp = Int;
  type OldMeterId = Nat;
  type OldTransactionId = Nat;

  type OldMeter = {
    id : OldMeterId;
    owner : OldUserId;
    meterNumber : Text;
    displayName : Text;
    createdAt : OldTimestamp;
  };

  type OldOrderStatus = {
    #pending;
    #completed;
    #failed;
  };

  type OldTransaction = {
    id : OldTransactionId;
    owner : OldUserId;
    meterNumber : Text;
    creditAmount : Nat;
    vendingToken : ?Text;
    paymentIntentId : Text;
    status : OldOrderStatus;
    createdAt : OldTimestamp;
  };

  // ── Old actor shape ─────────────────────────────────────────────────────────
  type OldActor = {
    meters : List.List<OldMeter>;
    transactions : List.List<OldTransaction>;
  };

  // ── New actor shape ─────────────────────────────────────────────────────────
  type NewActor = {
    meters : List.List<MeterTypes.Meter>;
    transactions : List.List<VendingTypes.Transaction>;
  };

  // ── Migration function ──────────────────────────────────────────────────────
  public func run(old : OldActor) : NewActor {
    let meters = old.meters.map<OldMeter, MeterTypes.Meter>(
      func(m) { { m with disco = "" } }
    );

    let transactions = old.transactions.map<OldTransaction, VendingTypes.Transaction>(
      func(t) {
        {
          id = t.id;
          owner = t.owner;
          meterNumber = t.meterNumber;
          disco = "";
          customerName = "";
          creditAmount = t.creditAmount;
          token = t.vendingToken;
          paymentMethod = t.paymentIntentId;
          status = t.status;
          createdAt = t.createdAt;
        }
      }
    );

    { meters; transactions };
  };
};
