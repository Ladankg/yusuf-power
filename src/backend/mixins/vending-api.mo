import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import VendingTypes "../types/vending";
import CommonTypes "../types/common";
import VendingLib "../lib/vending";

mixin (
  transactions : List.List<VendingTypes.Transaction>,
) {
  var nextTransactionId : Nat = 0;
  var adminPrincipal : ?Principal = null;

  /// Set the admin principal (first caller to claim, or existing admin can re-set).
  public shared ({ caller }) func setAdmin(p : Principal) : async () {
    switch (adminPrincipal) {
      case (null) { adminPrincipal := ?p };
      case (?admin) {
        if (caller != admin) Runtime.trap("Unauthorized");
        adminPrincipal := ?p;
      };
    };
  };

  /// Returns the current admin principal.
  public shared query func getAdmin() : async ?Principal {
    adminPrincipal;
  };

  // ── Helper ────────────────────────────────────────────────────────────────

  func requireAdmin(caller : Principal) {
    switch (adminPrincipal) {
      case (?admin) {
        if (caller != admin) Runtime.trap("Unauthorized: admin only");
      };
      case (null) { Runtime.trap("No admin configured") };
    };
  };

  // ── Vtpass placeholder ────────────────────────────────────────────────────

  /// Calls Vtpass validation API (placeholder/mock). Returns customer name and meter info.
  public shared ({ caller }) func validateMeter(
    meterNumber : Text,
    disco : Text,
  ) : async { #ok : VendingTypes.ValidatedMeter; #err : Text } {
    // Placeholder: in production this would make an HTTP outcall to Vtpass
    // API keys are stored securely in backend only — never returned to frontend
    if (meterNumber.size() < 6) {
      return #err("Invalid meter number: must be at least 6 characters");
    };
    let validated : VendingTypes.ValidatedMeter = {
      customerName = "Test Customer";
      meterNumber;
      disco;
    };
    #ok(validated);
  };

  /// Calls Vtpass purchase API (placeholder/mock). Stores transaction and returns 20-digit token.
  public shared ({ caller }) func purchaseToken(
    meterNumber : Text,
    disco : Text,
    amount : Nat,
    customerName : Text,
    paymentMethod : Text,
  ) : async { #ok : VendingTypes.TokenResult; #err : Text } {
    if (amount == 0) {
      return #err("Amount must be greater than zero");
    };
    let now = Time.now();
    // Placeholder: in production this would make an HTTP outcall to Vtpass
    // API keys are stored securely in backend only — never returned to frontend
    let token = VendingLib.generateToken(now + nextTransactionId.toInt());
    let units : Float = amount.toFloat() / 100.0;

    let req : VendingTypes.CreateOrderRequest = {
      meterNumber;
      disco;
      customerName;
      creditAmount = amount;
      paymentMethod;
    };
    let tx = VendingLib.createOrder(transactions, nextTransactionId, caller, req, now);
    nextTransactionId += 1;

    // Mark immediately as completed (placeholder flow)
    let _ = VendingLib.completeOrder(transactions, tx.id, token, units);

    let result : VendingTypes.TokenResult = {
      token;
      units;
      transactionId = tx.id;
    };
    #ok(result);
  };

  public shared ({ caller }) func createOrder(
    meterNumber : Text,
    disco : Text,
    customerName : Text,
    creditAmount : Nat,
    paymentMethod : Text,
  ) : async VendingTypes.Transaction {
    let now = Time.now();
    let req : VendingTypes.CreateOrderRequest = {
      meterNumber;
      disco;
      customerName;
      creditAmount;
      paymentMethod;
    };
    let tx = VendingLib.createOrder(transactions, nextTransactionId, caller, req, now);
    nextTransactionId += 1;
    tx;
  };

  public shared query ({ caller }) func getMyTransactions() : async [VendingTypes.Transaction] {
    VendingLib.listTransactions(transactions, caller);
  };

  public shared query ({ caller }) func getTransaction(
    txId : CommonTypes.TransactionId,
  ) : async ?VendingTypes.Transaction {
    VendingLib.getTransaction(transactions, caller, txId);
  };

  public shared ({ caller }) func completeOrder(
    txId : CommonTypes.TransactionId,
    token : Text,
    units : Float,
  ) : async ?VendingTypes.Transaction {
    requireAdmin(caller);
    VendingLib.completeOrder(transactions, txId, token, units);
  };

  public shared ({ caller }) func failOrder(
    txId : CommonTypes.TransactionId,
  ) : async ?VendingTypes.Transaction {
    requireAdmin(caller);
    VendingLib.failOrder(transactions, txId);
  };

  /// Admin: returns all transactions across all users.
  public shared ({ caller }) func getAllTransactions() : async [VendingTypes.Transaction] {
    requireAdmin(caller);
    VendingLib.getAllTransactions(transactions);
  };

  /// Admin: returns aggregate stats and last 10 transactions.
  public shared ({ caller }) func getAdminStats() : async VendingTypes.AdminStats {
    requireAdmin(caller);
    VendingLib.getAdminStats(transactions);
  };
};
