import Common "common";

module {
  public type OrderStatus = {
    #pending;
    #completed;
    #failed;
  };

  public type Transaction = {
    id : Common.TransactionId;
    owner : Common.UserId;
    meterNumber : Text;
    disco : Text;
    customerName : Text;
    creditAmount : Nat;
    token : ?Text;
    paymentMethod : Text;
    status : OrderStatus;
    createdAt : Common.Timestamp;
  };

  public type CreateOrderRequest = {
    meterNumber : Text;
    disco : Text;
    customerName : Text;
    creditAmount : Nat;
    paymentMethod : Text;
  };

  public type ValidatedMeter = {
    customerName : Text;
    meterNumber : Text;
    disco : Text;
  };

  public type TokenResult = {
    token : Text;
    units : Float;
    transactionId : Common.TransactionId;
  };

  public type AdminStats = {
    totalCount : Nat;
    totalRevenue : Nat;
    recentTransactions : [Transaction];
  };
};
