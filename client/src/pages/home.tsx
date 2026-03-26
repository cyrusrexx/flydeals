import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plane, Moon, Sun, Bookmark, Trash2,
} from "lucide-react";
import FlightSearchForm from "@/components/FlightSearchForm";
import FlightCard from "@/components/FlightCard";
import JSXPanel from "@/components/JSXPanel";
import StrategyPanel from "@/components/StrategyPanel";
import PriceInsights from "@/components/PriceInsights";
import FeeAnalysisDialog from "@/components/FeeAnalysisDialog";
import FlexibilityDialog from "@/components/FlexibilityDialog";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import { useTheme } from "@/components/ThemeProvider";
import type { FlightResult, FlightSearchRequest, SavedDeal } from "@shared/schema";

interface SearchResponse {
  flights: FlightResult[];
  meta: {
    total: number;
    origin: string;
    destination: string;
    departDate: string;
    returnDate?: string;
    travelClass: string;
    priceInsights: {
      lowest: number;
      highest: number;
      average: number;
      recommendation: string;
    };
  };
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [feeAnalysisFlight, setFeeAnalysisFlight] = useState<FlightResult | null>(null);
  const [flexFlight, setFlexFlight] = useState<FlightResult | null>(null);
  const [showSaved, setShowSaved] = useState(false);

  const searchMutation = useMutation({
    mutationFn: async (params: FlightSearchRequest) => {
      const res = await apiRequest("POST", "/api/flights/search", params);
      return (await res.json()) as SearchResponse;
    },
    onSuccess: (data) => {
      setSearchResults(data);
      toast({
        title: `Found ${data.meta.total} flights`,
        description: `${data.meta.origin} → ${data.meta.destination} from $${data.meta.priceInsights.lowest}`,
      });
    },
    onError: (err: Error) => {
      toast({ title: "Search failed", description: err.message, variant: "destructive" });
    },
  });

  const { data: savedDeals } = useQuery<SavedDeal[]>({
    queryKey: ["/api/deals"],
  });

  const saveDealMutation = useMutation({
    mutationFn: async (flight: FlightResult) => {
      const res = await apiRequest("POST", "/api/deals", {
        airline: flight.airline,
        price: flight.price,
        originalPrice: flight.price + (flight.savings || 0),
        origin: flight.departure.airportId,
        destination: flight.arrival.airportId,
        departTime: flight.departure.time,
        arriveTime: flight.arrival.time,
        duration: flight.duration,
        stops: flight.stops,
        travelClass: flight.travelClass,
        flightNumber: flight.flightNumber,
        airplane: flight.airplane,
        legroom: flight.legroom,
        extensions: JSON.stringify(flight.extensions),
        bookingUrl: flight.bookingUrl,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/deals"] });
      toast({ title: "Deal saved" });
    },
  });

  const deleteDealMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/deals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/deals"] });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Plane className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">FlyDeals</span>
            <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
              8 strategies
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showSaved ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowSaved(!showSaved)}
              className="text-xs gap-1.5"
              data-testid="button-toggle-saved"
            >
              <Bookmark className="h-3.5 w-3.5" />
              Saved
              {savedDeals && savedDeals.length > 0 && (
                <Badge variant="secondary" className="text-xs ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                  {savedDeals.length}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
              data-testid="button-theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search Form */}
        <FlightSearchForm
          onSearch={(params) => searchMutation.mutate(params)}
          isLoading={searchMutation.isPending}
        />

        {/* Saved Deals Panel */}
        {showSaved && (
          <div className="mt-4 space-y-2" data-testid="saved-deals-panel">
            <h2 className="text-sm font-semibold">Saved Deals ({savedDeals?.length || 0})</h2>
            {(!savedDeals || savedDeals.length === 0) && (
              <p className="text-xs text-muted-foreground py-4 text-center">
                No saved deals yet. Search for flights and bookmark the ones you like.
              </p>
            )}
            {savedDeals?.map((deal) => (
              <div
                key={deal.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card"
                data-testid={`saved-deal-${deal.id}`}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium">
                      {deal.origin} → {deal.destination}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {deal.airline} · {deal.flightNumber} · {deal.travelClass}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold tabular-nums text-primary">${deal.price}</p>
                    {deal.originalPrice && deal.originalPrice > deal.price && (
                      <p className="text-xs line-through text-muted-foreground">${deal.originalPrice}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteDealMutation.mutate(deal.id)}
                    data-testid={`button-delete-deal-${deal.id}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Results */}
          <div className="lg:col-span-8 space-y-4">
            {/* Loading */}
            {searchMutation.isPending && (
              <div className="space-y-3" data-testid="search-loading">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-28 w-full rounded-lg" />
                ))}
              </div>
            )}

            {/* Price insights */}
            {searchResults && !searchMutation.isPending && (
              <>
                <PriceInsights
                  insights={searchResults.meta.priceInsights}
                  totalResults={searchResults.meta.total}
                />

                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold" data-testid="text-results-header">
                    {searchResults.meta.origin} → {searchResults.meta.destination}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {searchResults.meta.departDate}
                    {searchResults.meta.returnDate && ` – ${searchResults.meta.returnDate}`}
                  </span>
                </div>

                {searchResults.flights.map((flight, idx) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    rank={idx + 1}
                    onSave={(f) => saveDealMutation.mutate(f)}
                    onAnalyzeFees={(f) => setFeeAnalysisFlight(f)}
                    onCheckFlexibility={(f) => setFlexFlight(f)}
                  />
                ))}
              </>
            )}

            {/* Empty state */}
            {!searchResults && !searchMutation.isPending && (
              <div className="text-center py-16" data-testid="empty-state">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-base font-semibold mb-1">Find the cheapest flights</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Search above to scan hundreds of flights using 8 proven travel-hacking strategies.
                  Prioritizes Business and First class with the fewest connections.
                </p>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <JSXPanel />
            <StrategyPanel />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            FlyDeals — 8 travel-hacking strategies in one search.
          </p>
          <PerplexityAttribution />
        </div>
      </footer>

      {/* Dialogs */}
      <FeeAnalysisDialog
        flight={feeAnalysisFlight}
        open={!!feeAnalysisFlight}
        onOpenChange={(open) => !open && setFeeAnalysisFlight(null)}
      />
      <FlexibilityDialog
        flight={flexFlight}
        open={!!flexFlight}
        onOpenChange={(open) => !open && setFlexFlight(null)}
      />
    </div>
  );
}
