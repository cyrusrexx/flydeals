import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Plane, Moon, Sun, ExternalLink,
  CalendarCheck, Eye, Route, Tag, DollarSign, Mail, Shield, MapPin,
  ChevronRight, Sparkles, Info,
} from "lucide-react";
import FlightSearchForm from "@/components/FlightSearchForm";
import JSXPanel from "@/components/JSXPanel";
import StrategyPanel from "@/components/StrategyPanel";
import FeeAnalysisDialog from "@/components/FeeAnalysisDialog";
import FlexibilityDialog from "@/components/FlexibilityDialog";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import { useTheme } from "@/components/ThemeProvider";
import { generateStrategyLinks, analyzeFees, analyzeFlexibility } from "@/lib/flightData";
import type { SearchParams, SearchLink } from "@/lib/flightData";

const strategyIcons: Record<string, typeof CalendarCheck> = {
  calendar: CalendarCheck,
  eye: Eye,
  route: Route,
  tag: Tag,
  dollar: DollarSign,
  mail: Mail,
  shield: Shield,
  map: MapPin,
};

const strategyColors: Record<number, string> = {
  1: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  2: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/20",
  3: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20",
  4: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/20",
  5: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20",
  6: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
  7: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/20",
  8: "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/20",
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [showFees, setShowFees] = useState(false);
  const [showFlex, setShowFlex] = useState(false);

  const links = useMemo(() => {
    if (!searchParams) return [];
    return generateStrategyLinks(searchParams);
  }, [searchParams]);

  // Group links by strategy number
  const groupedLinks = useMemo(() => {
    const groups: Record<number, SearchLink[]> = {};
    for (const link of links) {
      if (!groups[link.strategyNum]) groups[link.strategyNum] = [];
      groups[link.strategyNum].push(link);
    }
    return groups;
  }, [links]);

  const feeData = useMemo(() => {
    if (!searchParams) return null;
    return analyzeFees(searchParams.travelClass);
  }, [searchParams]);

  const flexData = useMemo(() => {
    if (!searchParams) return null;
    return analyzeFlexibility(searchParams.travelClass);
  }, [searchParams]);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    // Also open the primary Google Flights search immediately
    const primaryLink = generateStrategyLinks(params)[0];
    if (primaryLink) {
      window.open(primaryLink.url, "_blank", "noopener,noreferrer");
    }
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
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9" data-testid="button-theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search Form */}
        <FlightSearchForm onSearch={handleSearch} isLoading={false} />

        {/* Info banner after search */}
        {searchParams && (
          <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Google Flights opened in a new tab</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Below are additional searches using all 8 travel-hacking strategies. Each link opens Google Flights or a deal site with real prices.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Strategy links */}
          <div className="lg:col-span-8 space-y-5">
            {searchParams && Object.entries(groupedLinks).map(([numStr, stratLinks]) => {
              const num = Number(numStr);
              const colorClass = strategyColors[num] || "";
              const firstLink = stratLinks[0];
              const IconComponent = strategyIcons[firstLink.icon] || CalendarCheck;

              return (
                <div key={num}>
                  {/* Strategy header */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <Badge className={`text-xs gap-1 border ${colorClass}`}>
                      <IconComponent className="h-3 w-3" />
                      {num}. {firstLink.strategy}
                    </Badge>
                  </div>

                  {/* Links */}
                  <div className="space-y-2">
                    {stratLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3.5 rounded-lg border border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group"
                        data-testid={`link-${link.id}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">
                            {link.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {link.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                          <ExternalLink className="h-3.5 w-3.5" />
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Fee & Flexibility cards after strategy links */}
            {searchParams && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Card
                  className="p-4 border border-border/60 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all"
                  onClick={() => setShowFees(true)}
                  data-testid="card-fees"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-red-500" />
                    <h3 className="text-sm font-semibold">Fee Breakdown</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feeData
                      ? `${Object.keys(feeData.fees).length} fees analyzed. ${feeData.summary}`
                      : "Analyze baggage, seat, and change fees."}
                  </p>
                </Card>

                <Card
                  className="p-4 border border-border/60 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all"
                  onClick={() => setShowFlex(true)}
                  data-testid="card-flex"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-teal-500" />
                    <h3 className="text-sm font-semibold">Flexibility & Risk</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {flexData
                      ? `Risk: ${flexData.riskScore}. Change fee: ${flexData.changePolicy.fee === 0 ? "Free" : "$" + flexData.changePolicy.fee}.`
                      : "Analyze change and cancellation policies."}
                  </p>
                </Card>
              </div>
            )}

            {/* Empty state */}
            {!searchParams && (
              <div className="text-center py-16" data-testid="empty-state">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-base font-semibold mb-1">Find the cheapest real flights</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  Enter your trip details above and hit search. FlyDeals opens Google Flights with your exact search,
                  then generates additional searches using all 8 travel-hacking strategies — alternate dates,
                  nearby airports, deal sites, and more. Every link shows real prices.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {["Flexible dates", "Nearby airports", "Deal sites", "Skiplagged", "Fee analysis", "Seat comparison"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
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

      <footer className="border-t border-border/60 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            FlyDeals — Every link opens real prices. No fake data.
          </p>
          <PerplexityAttribution />
        </div>
      </footer>

      {/* Dialogs */}
      <FeeAnalysisDialog travelClass={searchParams?.travelClass || "business"} open={showFees} onOpenChange={setShowFees} />
      <FlexibilityDialog travelClass={searchParams?.travelClass || "business"} open={showFlex} onOpenChange={setShowFlex} />
    </div>
  );
}
