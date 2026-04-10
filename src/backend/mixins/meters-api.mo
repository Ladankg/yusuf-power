import List "mo:core/List";
import Time "mo:core/Time";
import MeterTypes "../types/meters";
import CommonTypes "../types/common";
import MetersLib "../lib/meters";

mixin (
  meters : List.List<MeterTypes.Meter>,
) {
  var nextMeterId : Nat = 0;

  public shared ({ caller }) func addMeter(
    meterNumber : Text,
    displayName : Text,
    disco : Text,
  ) : async MeterTypes.Meter {
    let now = Time.now();
    let meter = MetersLib.addMeter(meters, nextMeterId, caller, meterNumber, displayName, disco, now);
    nextMeterId += 1;
    meter;
  };

  public shared query ({ caller }) func getMeters() : async [MeterTypes.Meter] {
    MetersLib.listMeters(meters, caller);
  };

  public shared query ({ caller }) func getMeter(meterId : CommonTypes.MeterId) : async ?MeterTypes.Meter {
    MetersLib.getMeter(meters, caller, meterId);
  };

  public shared ({ caller }) func deleteMeter(meterId : CommonTypes.MeterId) : async Bool {
    MetersLib.deleteMeter(meters, caller, meterId);
  };
};
