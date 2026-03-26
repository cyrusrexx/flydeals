import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Plane, Clock, ArrowRight, Bookmark, ExternalLink, Leaf,
  CalendarCheck, Eye, Route, Tag, Shield
} from "lucide-react";
import type { FlightResult } from "@/lib/flightData";

interface Props {
  flight: FlightResult;
  onSave?: (flight: FlightResult) => void;
  onAnalyzeFees?: (flight: FlightResult) => void;
  onCheckFlexibility?: (flight: FlightResult) => void;
  rank?: number;
}

function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

function formatTime(timeStr: string) {
  const parts = timeStr.split(" ");
  return parts[1] || timeStr;
}

export default function FlightCard({ flight, onSave, onAnalyzeFees, onCheckFlexibility, rank }: Props) {
  const strategyBadges = [];
  if (flight.isOptimalDate) strategyBadges.push({ label: "Optimal Date", icon: CalendarCheck, color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" });
  if (flight.isHiddenFlight) strategyBadges.push({ label: "Hidden Flight", icon: Eye, color: "bg-purple-500/15 text-purple-700 dark:text-purple-400" });
  if (flight.hasSmartLayover) strategyBadges.push({ label: "Smart Layover", icon: Route, color: "bg-amber-500/15 text-amber-700 dark:text-amber-400" });
  if (flight.hasDealOrPromo) strategyBadges.push({ label: "Deal Found", icon: Tag, color: "bg-blue-500/15 text-blue-700 dark:text-blue-400" });

  return (
    <Card
      className="p-4 border border-border/60 hover:border-primary/30 transition-colors group"
      data-testid={`flight-card-${flight.id}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Rank */}
        {rank && (
          <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary/10 items-center justify-center text-xs font-semibold text-primary shrink-0">
            {rank}
          </div>
        )}

        {/* Airline */}
        <div className="flex items-center gap-2.5 sm:w-32 shrink-0">
          <img
            src={flight.airlineLogo}
            alt={flight.airline}
            className="w-8 h-8 rounded"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div>
            <p className="text-sm font-medium leading-tight">{flight.airline}</p>
            <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="text-right">
            <p className="text-sm font-semibold tabular-nums">{formatTime(flight.departure.time)}</p>
            <p className="text-xs text-muted-foreground">{flight.departure.airportId}</p>
          </div>

          <div className="flex-1 flex flex-col items-center gap-0.5 px-2">
            <p className="text-xs text-muted-foreground">{formatDuration(flight.duration)}</p>
            <div className="w-full flex items-center gap-1">
              <div className="h-px flex-1 bg-border" />
              {flight.stops === 0 ? (
                <Plane className="h-3 w-3 text-primary shrink-0" />
              ) : (
                <>
                  {Array.from({ length: flight.stops }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                  ))}
                </>
              )}
              <div className="h-px flex-1 bg-border" />
            </div>
            <p className="text-xs text-muted-foreground">
              {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
              {flight.layovers && flight.layovers.length > 0 && (
                <span> · {flight.layovers.map(l => l.airport).join(", ")}</span>
              )}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold tabular-nums">{formatTime(flight.arrival.time)}</p>
            <p className="text-xs text-muted-foreground">{flight.arrival.airportId}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right">
            <p className="text-lg font-bold text-primary tabular-nums">${flight.price}</p>
            {flight.savings && flight.savings > 0 && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Save ${flight.savings}
              </p>
            )}
            <p className="text-xs text-muted-foreground">{flight.travelClass}</p>
          </div>

          <div className="flex flex-col gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => onSave?.(flight)}
                  data-testid={`button-save-${flight.id}`}
                >
                  <Bookmark className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save deal</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={flight.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-7 w-7 rounded-md hover:bg-secondary transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Book on Google Flights</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Badges & Details row */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-border/40">
        {strategyBadges.map((b) => (
          <Badge key={b.label} variant="secondary" className={`text-xs gap-1 ${b.color}`}>
            <b.icon className="h-3 w-3" />
            {b.label}
          </Badge>
        ))}
        <Badge variant="secondary" className="text-xs gap-1">
          <Plane className="h-3 w-3" />
          {flight.airplane}
        </Badge>
        {flight.legroom && (
          <Badge variant="secondary" className="text-xs">
            {flight.legroom} legroom
          </Badge>
        )}
        {flight.carbonEmissions && flight.carbonEmissions.differencePercent < 0 && (
          <Badge variant="secondary" className="text-xs gap-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
            <Leaf className="h-3 w-3" />
            {Math.abs(flight.carbonEmissions.differencePercent)}% less CO₂
          </Badge>
        )}

        <div className="ml-auto flex gap-1.5">
          {onAnalyzeFees && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAnalyzeFees(flight)}
              className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
              data-testid={`button-fees-${flight.id}`}
            >
              Fee breakdown
            </Button>
          )}
          {onCheckFlexibility && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCheckFlexibility(flight)}
              className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
              data-testid={`button-flex-${flight.id}`}
            >
              <Shield className="h-3 w-3 mr-1" />
              Flexibility
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
