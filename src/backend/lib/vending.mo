import List "mo:core/List";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Common "../types/common";
import Types "../types/vending";

module {
  /// Generate a pseudo-random 20-digit token string from a seed (canister time).
  public func generateToken(seed : Int) : Text {
    // Derive 20 digits using the seed
    let n : Nat = Int.abs(seed) % 100_000_000_000_000_000_000;
    // pad to 20 digits
    var digits = n.toText();
    while (digits.size() < 20) {
      digits := "0" # digits;
    };
    digits;
  };

  public func createOrder(
    transactions : List.List<Types.Transaction>,
    nextId : Nat,
    owner : Common.UserId,
    req : Types.CreateOrderRequest,
    now : Common.Timestamp,
  ) : Types.Transaction {
    let tx : Types.Transaction = {
      id = nextId;
      owner;
      meterNumber = req.meterNumber;
      disco = req.disco;
      customerName = req.customerName;
      creditAmount = req.creditAmount;
      token = null;
      paymentMethod = req.paymentMethod;
      status = #pending;
      createdAt = now;
    };
    transactions.add(tx);
    tx;
  };

  public func completeOrder(
    transactions : List.List<Types.Transaction>,
    txId : Common.TransactionId,
    token : Text,
    _units : Float,   // reserved for future use: units are derived at read time from creditAmount
  ) : ?Types.Transaction {
    var result : ?Types.Transaction = null;
    transactions.mapInPlace(
      func(tx) {
        if (tx.id == txId) {
          let updated = { tx with status = #completed; token = ?token };
          result := ?updated;
          updated;
        } else {
          tx;
        };
      }
    );
    result;
  };

  public func failOrder(
    transactions : List.List<Types.Transaction>,
    txId : Common.TransactionId,
  ) : ?Types.Transaction {
    var result : ?Types.Transaction = null;
    transactions.mapInPlace(
      func(tx) {
        if (tx.id == txId) {
          let updated = { tx with status = #failed };
          result := ?updated;
          updated;
        } else {
          tx;
        };
      }
    );
    result;
  };

  public func listTransactions(
    transactions : List.List<Types.Transaction>,
    owner : Common.UserId,
  ) : [Types.Transaction] {
    transactions.filter(func(tx) { tx.owner == owner }).toArray();
  };

  public func getTransaction(
    transactions : List.List<Types.Transaction>,
    owner : Common.UserId,
    txId : Common.TransactionId,
  ) : ?Types.Transaction {
    transactions.find(func(tx) { tx.id == txId and tx.owner == owner });
  };

  public func getAllTransactions(
    transactions : List.List<Types.Transaction>,
  ) : [Types.Transaction] {
    transactions.toArray();
  };

  public func getAdminStats(
    transactions : List.List<Types.Transaction>,
  ) : Types.AdminStats {
    let all = transactions.toArray();
    let totalCount = all.size();
    let totalRevenue = all.foldLeft(0, func(acc, tx) { acc + tx.creditAmount });

    // Sort all by createdAt descending, take 10
    let sorted = all.sort(func(a, b) {
      if (a.createdAt > b.createdAt) { #less }
      else if (a.createdAt < b.createdAt) { #greater }
      else { #equal };
    });
    let recent = if (sorted.size() <= 10) { sorted } else {
      sorted.sliceToArray(0, 10);
    };

    { totalCount; totalRevenue; recentTransactions = recent };
  };
};
