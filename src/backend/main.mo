import List "mo:core/List";
import MeterTypes "types/meters";
import VendingTypes "types/vending";
import MetersApi "mixins/meters-api";
import VendingApi "mixins/vending-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  let meters = List.empty<MeterTypes.Meter>();
  let transactions = List.empty<VendingTypes.Transaction>();

  include MetersApi(meters);
  include VendingApi(transactions);
};
