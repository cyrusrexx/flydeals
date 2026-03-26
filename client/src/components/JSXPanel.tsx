import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Crown, Plane } from "lucide-react";
import type { JSXRoute } from "@shared/schema";

export default function JSXPanel() {
  const { data, isLoading } = useQuery<{ routes: JSXRoute[]; total: number }>({
    queryKey: ["/api/jsx/routes"],
  });

  if (isLoading) {
    return (
      <Card className="p-5 border border-border/60">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const routes = data?.routes || [];

  return (
    <Card className="p-5 border border-border/60 bg-card" data-testid="jsx-panel">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Crown className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">JSX Semi-Private</h3>
            <p className="text-xs text-muted-foreground">Check in 20 min before. No crowds.</p>
          </div>
        </div>
        <a
          href="https://www.jsx.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          jsx.com <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {routes.map((route, i) => (
          <a
            key={i}
            href={`https://flights.jsx.com/en/flights`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-colors group"
            data-testid={`jsx-route-${i}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Plane className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">
                  {route.originCode} → {route.destinationCode}
                </p>
                <p className="text-xs text-muted-foreground">
                  {route.origin} → {route.destination}
                </p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {route.tripType}
                </Badge>
              </div>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="text-sm font-bold tabular-nums" style={{ color: "hsl(var(--accent))" }}>
                ${route.price}
              </p>
              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary ml-auto mt-0.5" />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-border/40">
        <p className="text-xs text-muted-foreground leading-relaxed">
          JSX flies semi-private 30-seat jets from private terminals. Routes from Burbank, Oakland,
          Orange County, Dallas, Houston, and more. Skip TSA lines and check in just 20 minutes before departure.
        </p>
      </div>
    </Card>
  );
}
