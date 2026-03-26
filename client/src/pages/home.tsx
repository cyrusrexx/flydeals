import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { searchFlights } from "@/lib/flightData";
import type { FlightResult, SearchParams, SearchResponse } from "@/lib/flightData";

interface SavedDeal {
  id: number;
  airline: string;
  flightNumber: string;
  price: number;
  originalPrice: number;
  origin: string;
  destination: string;
  travelClass: string;
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [feeAnalysisFlight, setFeeAnalysisFlight] = useState<FlightResult | null>(null);
  const [flexFlight, setFlexFlight] = useState<FlightResult | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [savedDeals, setSavedDeals] = useState<SavedDeal[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleSearch = (params: SearchParams) => {
    setIsSearching(true);
    // Simulate a brief loading state for UX
    setTimeout(() => {
      const results = searchFlights(params);
      setSearchResults(results);
      setIsSearching(false);
    }, 400);
  };

  const handleSaveDeal = (flight: FlightResult) => {
    const deal: SavedDeal = {
      id: nextId,
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      price: flight.price,
      originalPrice: flight.price + (flight.savings || 0),
      origin: flight.departure.airportId,
      destination: flight.arrival.airportId,
      travelClass: flight.travelClass,
    };
    setSavedDeals((prev) => [deal, ...prev]);
    setNextId((n) => n + 1);
  };

  const handleDeleteDeal = (id: number) => {
    setSavedDeals((prev) => prev.filter((d) => d.id !== id));
  };

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
              {savedDeals.length > 0 && (
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
        <FlightSearchForm onSearch={handleSearch} isLoading={isSearching} />

        {/* Saved Deals Panel */}
        {showSaved && (
          <div className="mt-4 space-y-2" data-testid="saved-deals-panel">
            <h2 className="text-sm font-semibold">Saved Deals ({savedDeals.length})</h2>
            {savedDeals.length === 0 && (
              <p className="text-xs text-muted-foreground py-4 text-center">
                No saved deals yet. Search for flights and bookmark the ones you like.
              </p>
            )}
            {savedDeals.map((deal) => (
              <div
                key={deal.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card"
                data-testid={`saved-deal-${deal.id}`}
              >
                <div>
                  <p className="text-sm font-medium">
                    {deal.origin} → {deal.destination}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {deal.airline} · {deal.flightNumber} · {deal.travelClass}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold tabular-nums text-primary">${deal.price}</p>
                    {deal.originalPrice > deal.price && (
                      <p className="text-xs line-through text-muted-foreground">${deal.originalPrice}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteDeal(deal.id)}
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
            {isSearching && (
              <div className="space-y-3" data-testid="search-loading">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-28 w-full rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            )}

            {/* Results */}
            {searchResults && !isSearching && (
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
                    onSave={handleSaveDeal}
                    onAnalyzeFees={(f) => setFeeAnalysisFlight(f)}
                    onCheckFlexibility={(f) => setFlexFlight(f)}
                  />
                ))}
              </>
            )}

            {/* Empty state */}
            {!searchResults && !isSearching && (
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
