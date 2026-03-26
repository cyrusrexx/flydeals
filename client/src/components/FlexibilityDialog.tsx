import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { analyzeFlexibility } from "@/lib/flightData";
import type { FlightResult } from "@/lib/flightData";

interface Props {
  flight: FlightResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FlexibilityDialog({ flight, open, onOpenChange }: Props) {
  const data = useMemo(() => {
    if (!flight) return null;
    return analyzeFlexibility(flight.travelClass);
  }, [flight]);

  const riskColor =
    data?.riskScore === "Low"
      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
      : "text-amber-600 dark:text-amber-400 bg-amber-500/10";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" data-testid="flex-dialog">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Flexibility & Risk Analysis
          </DialogTitle>
        </DialogHeader>

        {data && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className={`text-sm px-3 py-1 ${riskColor}`}>
                Risk: {data.riskScore}
              </Badge>
              {flight && (
                <span className="text-xs text-muted-foreground">
                  {flight.airline} · {flight.travelClass}
                </span>
              )}
            </div>

            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 mb-1.5">
                {data.changePolicy.fee === 0 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
                <p className="text-sm font-medium">Change Policy</p>
                <span className="text-sm font-semibold tabular-nums ml-auto">
                  {data.changePolicy.fee === 0 ? "Free" : `$${data.changePolicy.fee} fee`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{data.changePolicy.note}</p>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 mb-1.5">
                <Info className="h-4 w-4 text-blue-500" />
                <p className="text-sm font-medium">Cancellation Policy</p>
                <Badge variant="secondary" className="text-xs ml-auto">
                  {data.cancelPolicy.refund}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{data.cancelPolicy.note}</p>
            </div>

            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-sm leading-relaxed">{data.recommendation}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Things most people miss:</p>
              <ul className="space-y-1.5">
                {data.hiddenClauses.map((clause, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span>
                    {clause}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
