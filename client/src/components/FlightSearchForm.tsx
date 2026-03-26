import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plane, ArrowRightLeft, Calendar, Users, Sliders, Search } from "lucide-react";
import { airports } from "@/lib/flightData";
import type { SearchParams } from "@/lib/flightData";

interface Props {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

function AirportPicker({ value, onChange, label, testId }: { value: string; onChange: (code: string) => void; label: string; testId: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = airports.find((a) => a.code === value);

  const filtered = airports.filter((a) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return a.code.toLowerCase().includes(q) || a.city.toLowerCase().includes(q) || a.name.toLowerCase().includes(q);
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</Label>
      <div
        className="flex items-center gap-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => {
          setOpen(true);
          setQuery("");
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        data-testid={testId}
      >
        <Plane className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="truncate">
          {selected ? `${selected.code} — ${selected.city}` : "Select airport"}
        </span>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-border bg-popover shadow-lg overflow-hidden">
          <div className="p-2 border-b border-border/50">
            <Input
              ref={inputRef}
              placeholder="Type city, code, or name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-8 text-sm"
              autoFocus
              data-testid={`${testId}-search`}
            />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 && (
              <div className="px-3 py-4 text-xs text-muted-foreground text-center">
                No airports found
              </div>
            )}
            {filtered.slice(0, 20).map((a) => (
              <button
                key={a.code}
                type="button"
                className={`w-full text-left px-3 py-2 text-sm hover:bg-primary/10 transition-colors flex items-center gap-2 ${
                  a.code === value ? "bg-primary/5 font-medium" : ""
                }`}
                onClick={() => {
                  onChange(a.code);
                  setOpen(false);
                  setQuery("");
                }}
                data-testid={`airport-option-${a.code}`}
              >
                <span className="font-mono text-xs font-semibold text-primary w-8">{a.code}</span>
                <span className="truncate">{a.city}</span>
                <span className="text-xs text-muted-foreground ml-auto shrink-0 hidden sm:inline">{a.name.length > 25 ? a.name.slice(0, 25) + "…" : a.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FlightSearchForm({ onSearch, isLoading }: Props) {
  const [origin, setOrigin] = useState("SFO");
  const [destination, setDestination] = useState("JFK");
  const [departDate, setDepartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    return d.toISOString().split("T")[0];
  });
  const [travelClass, setTravelClass] = useState("business");
  const [passengers, setPassengers] = useState(1);
  const [flexDays, setFlexDays] = useState(3);
  const [maxStops, setMaxStops] = useState(1);
  const [sortBy, setSortBy] = useState("price");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const swapAirports = () => {
    const tmp = origin;
    setOrigin(destination);
    setDestination(tmp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      origin,
      destination,
      departDate,
      returnDate: returnDate || undefined,
      travelClass,
      passengers,
      flexDays,
      maxStops,
      sortBy,
    });
  };

  return (
    <Card className="p-5 border border-border/60 bg-card" data-testid="search-form">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* Origin */}
          <div className="md:col-span-3">
            <AirportPicker value={origin} onChange={setOrigin} label="From" testId="select-origin" />
          </div>

          {/* Swap */}
          <div className="md:col-span-1 flex justify-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={swapAirports}
              className="h-10 w-10 rounded-full hover:bg-primary/10"
              data-testid="button-swap"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Destination */}
          <div className="md:col-span-3">
            <AirportPicker value={destination} onChange={setDestination} label="To" testId="select-destination" />
          </div>

          {/* Dates */}
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">Depart</Label>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="h-10 pl-9 text-sm"
                data-testid="input-depart-date"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">Return</Label>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="h-10 pl-9 text-sm"
                data-testid="input-return-date"
              />
            </div>
          </div>

          {/* Search */}
          <div className="md:col-span-1">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-primary hover:bg-primary/90 mt-5"
              data-testid="button-search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Class & options row */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <Select value={travelClass} onValueChange={setTravelClass}>
            <SelectTrigger className="w-[160px] h-9 text-sm" data-testid="select-class">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="premium_economy">Premium Economy</SelectItem>
              <SelectItem value="business">Business Class</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <Select value={String(passengers)} onValueChange={(v) => setPassengers(Number(v))}>
              <SelectTrigger className="w-[70px] h-9 text-sm" data-testid="select-passengers">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-muted-foreground"
            data-testid="button-advanced"
          >
            <Sliders className="h-3.5 w-3.5 mr-1.5" />
            {showAdvanced ? "Less options" : "More options"}
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px] h-9 text-sm" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Cheapest</SelectItem>
              <SelectItem value="duration">Fastest</SelectItem>
              <SelectItem value="stops">Fewest stops</SelectItem>
              <SelectItem value="departure">Departure</SelectItem>
              <SelectItem value="arrival">Arrival</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Advanced options */}
        {showAdvanced && (
          <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground whitespace-nowrap">Flex days</Label>
              <Select value={String(flexDays)} onValueChange={(v) => setFlexDays(Number(v))}>
                <SelectTrigger className="w-[70px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 5, 7].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      ±{n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground whitespace-nowrap">Max stops</Label>
              <Select value={String(maxStops)} onValueChange={(v) => setMaxStops(Number(v))}>
                <SelectTrigger className="w-[90px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Nonstop</SelectItem>
                  <SelectItem value="1">1 stop</SelectItem>
                  <SelectItem value="2">2 stops</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">
              Flex days scan {flexDays * 2 + 1} date combinations for the cheapest option.
            </p>
          </div>
        )}
      </form>
    </Card>
  );
}
