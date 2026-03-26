import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus, Zap } from "lucide-react";

interface PriceInsightsData {
  lowest: number;
  highest: number;
  average: number;
  recommendation: string;
}

interface Props {
  insights: PriceInsightsData;
  totalResults: number;
}

export default function PriceInsights({ insights, totalResults }: Props) {
  const isGoodDeal = insights.lowest < insights.average * 0.8;

  return (
    <Card className="p-4 border border-border/60 bg-card" data-testid="price-insights">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-amber-500" />
        <h3 className="text-sm font-semibold">Price Insights</h3>
        <span className="text-xs text-muted-foreground ml-auto">{totalResults} flights found</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center p-2 rounded-lg bg-emerald-500/10">
          <TrendingDown className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
          <p className="text-lg font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
            ${insights.lowest}
          </p>
          <p className="text-xs text-muted-foreground">Lowest</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-secondary/50">
          <Minus className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
          <p className="text-lg font-bold tabular-nums">${insights.average}</p>
          <p className="text-xs text-muted-foreground">Average</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-red-500/10">
          <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400 mx-auto mb-1" />
          <p className="text-lg font-bold tabular-nums text-red-700 dark:text-red-400">
            ${insights.highest}
          </p>
          <p className="text-xs text-muted-foreground">Highest</p>
        </div>
      </div>

      {/* Price bar */}
      <div className="relative h-2 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 mb-2">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-primary shadow-sm"
          style={{
            left: `${Math.min(95, Math.max(5, ((insights.lowest - insights.lowest) / (insights.highest - insights.lowest)) * 100))}%`,
          }}
        />
      </div>

      <p className={`text-xs font-medium ${isGoodDeal ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
        {insights.recommendation}
      </p>
    </Card>
  );
}
