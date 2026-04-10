import Common "common";

module {
  public type Meter = {
    id : Common.MeterId;
    owner : Common.UserId;
    meterNumber : Text;
    displayName : Text;
    disco : Text;
    createdAt : Common.Timestamp;
  };
};
