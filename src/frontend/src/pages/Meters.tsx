import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useAddMeter, useDeleteMeter, useMeters } from "@/hooks/use-backend";
import { DISCO_OPTIONS, type Meter, type MeterId } from "@/types";
import { Gauge, Hash, LogIn, PlusCircle, Tag, Trash2, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Login Prompt ─────────────────────────────────────────────────────────────
function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-6 text-center fade-up"
      data-ocid="meters-login-prompt"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Zap className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h2 className="text-xl font-display font-semibold text-foreground">
          Sign in to manage your meters
        </h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-xs mx-auto">
          Save your prepaid electricity meters to quickly top up anytime.
        </p>
      </div>
      <Button onClick={onLogin} className="gap-2" data-ocid="btn-login-meters">
        <LogIn className="w-4 h-4" />
        Sign in with Internet Identity
      </Button>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <Card data-ocid="meters-empty-state">
      <CardContent className="py-16 flex flex-col items-center gap-4 text-center">
        <span className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Gauge className="w-7 h-7 text-muted-foreground" />
        </span>
        <div>
          <p className="font-medium text-foreground">No meters saved yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add a meter to quickly top up electricity without re-entering the
            number each time.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={onAdd}
          data-ocid="btn-add-first-meter"
        >
          <PlusCircle className="w-4 h-4" />
          Add your first meter
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Meter Card ───────────────────────────────────────────────────────────────
function MeterCard({
  meter,
  onDelete,
  isDeleting,
}: {
  meter: Meter;
  onDelete: (id: MeterId) => void;
  isDeleting: boolean;
}) {
  return (
    <Card className="card-lift" data-ocid={`meter-card-${meter.id}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground truncate">
                {meter.displayName}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Hash className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="font-mono text-sm text-muted-foreground tracking-wide truncate">
                  {meter.meterNumber}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {meter.disco}
              </div>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 transition-smooth"
                disabled={isDeleting}
                aria-label={`Delete ${meter.displayName}`}
                data-ocid={`btn-delete-meter-${meter.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Meter</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-foreground">
                    {meter.displayName}
                  </span>{" "}
                  ({meter.meterNumber})? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => onDelete(meter.id)}
                  data-ocid="btn-confirm-delete"
                >
                  Delete Meter
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

function AddMeterForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [meterNumber, setMeterNumber] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [disco, setDisco] = useState("");
  const addMeter = useAddMeter();

  const isValid =
    meterNumber.trim().length > 0 &&
    displayName.trim().length > 0 &&
    disco.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    try {
      await addMeter.mutateAsync({
        meterNumber: meterNumber.trim(),
        displayName: displayName.trim(),
        disco,
      });
      toast.success("Meter saved successfully");
      setMeterNumber("");
      setDisplayName("");
      setDisco("");
      onSuccess();
    } catch {
      toast.error("Failed to save meter. Please try again.");
    }
  }

  return (
    <Card data-ocid="add-meter-form">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-primary" />
          Add New Meter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meter-number" className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5" />
              Meter Number
            </Label>
            <Input
              id="meter-number"
              placeholder="e.g. 0422 7890 1234"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
              className="font-mono"
              autoComplete="off"
              data-ocid="input-meter-number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display-name" className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Display Name
            </Label>
            <Input
              id="display-name"
              placeholder="e.g. Home, Office, Rental"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              data-ocid="input-display-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="disco-meter" className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Distribution Company
            </Label>
            <Select value={disco} onValueChange={setDisco}>
              <SelectTrigger id="disco-meter" data-ocid="input-disco">
                <SelectValue placeholder="Select DiSCo…" />
              </SelectTrigger>
              <SelectContent>
                {DISCO_OPTIONS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="submit"
              disabled={!isValid || addMeter.isPending}
              className="flex-1 gap-2"
              data-ocid="btn-submit-meter"
            >
              {addMeter.isPending ? (
                <>Saving…</>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  Save Meter
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={addMeter.isPending}
              data-ocid="btn-cancel-add"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Loading Skeletons ────────────────────────────────────────────────────────
function MeterSkeletons() {
  return (
    <div className="space-y-3" data-ocid="meters-loading">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function Meters() {
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const { data: meters, isLoading: metersLoading, isError } = useMeters();
  const deleteMeter = useDeleteMeter();
  const [showForm, setShowForm] = useState(false);

  async function handleDelete(meterId: MeterId) {
    try {
      await deleteMeter.mutateAsync(meterId);
      toast.success("Meter deleted");
    } catch {
      toast.error("Failed to delete meter. Please try again.");
    }
  }

  if (authLoading) {
    return (
      <div className="space-y-6 fade-up" data-ocid="page-meters">
        <Skeleton className="h-8 w-40" />
        <MeterSkeletons />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div data-ocid="page-meters">
        <LoginPrompt onLogin={login} />
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-up max-w-2xl" data-ocid="page-meters">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground">
            My Meters
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your saved prepaid electricity meters
          </p>
        </div>
        {!showForm && (
          <Button
            className="gap-2 shrink-0"
            onClick={() => setShowForm(true)}
            data-ocid="btn-add-meter"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Meter</span>
            <span className="sm:hidden">Add</span>
          </Button>
        )}
      </div>

      {/* Add meter form */}
      {showForm && (
        <div className="success-pulse">
          <AddMeterForm
            onSuccess={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Meter list */}
      {metersLoading ? (
        <MeterSkeletons />
      ) : isError ? (
        <Card data-ocid="meters-error-state">
          <CardContent className="py-12 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <Gauge className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Failed to load meters
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Please refresh the page to try again.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : meters && meters.length > 0 ? (
        <div className="space-y-3" data-ocid="meters-list">
          {meters.map((meter) => (
            <MeterCard
              key={meter.id.toString()}
              meter={meter}
              onDelete={handleDelete}
              isDeleting={deleteMeter.isPending}
            />
          ))}
          <p className="text-xs text-muted-foreground text-center pt-1">
            {meters.length} meter{meters.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      ) : (
        !showForm && <EmptyState onAdd={() => setShowForm(true)} />
      )}
    </div>
  );
}
