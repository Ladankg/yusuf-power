import List "mo:core/List";
import Common "../types/common";
import Types "../types/meters";

module {
  public func addMeter(
    meters : List.List<Types.Meter>,
    nextId : Nat,
    owner : Common.UserId,
    meterNumber : Text,
    displayName : Text,
    disco : Text,
    now : Common.Timestamp,
  ) : Types.Meter {
    let meter : Types.Meter = {
      id = nextId;
      owner;
      meterNumber;
      displayName;
      disco;
      createdAt = now;
    };
    meters.add(meter);
    meter;
  };

  public func listMeters(
    meters : List.List<Types.Meter>,
    owner : Common.UserId,
  ) : [Types.Meter] {
    meters.filter(func(m) { m.owner == owner }).toArray();
  };

  public func getMeter(
    meters : List.List<Types.Meter>,
    owner : Common.UserId,
    meterId : Common.MeterId,
  ) : ?Types.Meter {
    meters.find(func(m) { m.id == meterId and m.owner == owner });
  };

  public func deleteMeter(
    meters : List.List<Types.Meter>,
    owner : Common.UserId,
    meterId : Common.MeterId,
  ) : Bool {
    let before = meters.size();
    let kept = meters.filter(func(m) { not (m.id == meterId and m.owner == owner) });
    if (kept.size() < before) {
      meters.clear();
      meters.append(kept);
      true;
    } else {
      false;
    };
  };
};
