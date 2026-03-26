import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { analyzeFees } from "@/lib/flightData";
import type { FlightResult } from "@/lib/flightData";

interface Props {
  flight: FlightResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FeeAnalysisDialog({ flight, open, onOpenChange }: Props) {
  const data = useMemo(() => {
    if (!flight) return null;
    return analyzeFees(flight.travelClass);
  }, [flight]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" data-testid="fee-dialog">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold flex items-center gap-2">
            Fee Breakdown
            {flight && (
              <Badge variant="secondary" className="text-xs font-normal">
                {flight.airline} · {flight.travelClass}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {data && (
          <div className="space-y-3">
            {Object.entries(data.fees).map(([name, fee]) => (
              <div
                key={name}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
              >
                <div className="mt-0.5">
                  {fee.avoidable ? (
                    <XCircle className="h-4 w-4 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-sm font-semibold tabular-nums">
                      {fee.amount === 0 ? "Free" : `$${fee.amount}`}
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5 mt-1">
                    <Lightbulb className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {fee.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                {data.summary}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
