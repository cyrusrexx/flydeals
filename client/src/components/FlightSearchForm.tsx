import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plane, ArrowRightLeft, Calendar, Users, Sliders, Search } from "lucide-react";
import type { FlightSearchRequest } from "@shared/schema";

interface Props {
  onSearch: (params: FlightSearchRequest) => void;
  isLoading: boolean;
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
  const [travelClass, setTravelClass] = useState<"economy" | "premium_economy" | "business" | "first">("business");
  const [passengers, setPassengers] = useState(1);
  const [flexDays, setFlexDays] = useState(3);
  const [maxStops, setMaxStops] = useState(1);
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure" | "arrival" | "stops">("price");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [originFilter, setOriginFilter] = useState("");
  const [destFilter, setDestFilter] = useState("");

  const { data: airports } = useQuery<Array<{ code: string; name: string; city: string }>>({
    queryKey: ["/api/airports"],
  });

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

  const filteredOriginAirports = airports?.filter(
    (a) =>
      originFilter === "" ||
      a.code.toLowerCase().includes(originFilter.toLowerCase()) ||
      a.city.toLowerCase().includes(originFilter.toLowerCase()) ||
      a.name.toLowerCase().includes(originFilter.toLowerCase())
  ) || [];

  const filteredDestAirports = airports?.filter(
    (a) =>
      destFilter === "" ||
      a.code.toLowerCase().includes(destFilter.toLowerCase()) ||
      a.city.toLowerCase().includes(destFilter.toLowerCase()) ||
      a.name.toLowerCase().includes(destFilter.toLowerCase())
  ) || [];

  return (
    <Card className="p-5 border border-border/60 bg-card" data-testid="search-form">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* Origin */}
          <div className="md:col-span-3">
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">From</Label>
            <Select value={origin} onValueChange={setOrigin}>
              <SelectTrigger data-testid="select-origin" className="h-10">
                <div className="flex items-center gap-2">
                  <Plane className="h-3.5 w-3.5 text-primary" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search airports..."
                    value={originFilter}
                    onChange={(e) => setOriginFilter(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                {filteredOriginAirports.slice(0, 15).map((a) => (
                  <SelectItem key={a.code} value={a.code}>
                    {a.code} — {a.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">To</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger data-testid="select-destination" className="h-10">
                <div className="flex items-center gap-2">
                  <Plane className="h-3.5 w-3.5 text-accent rotate-90" style={{ color: "hsl(var(--accent))" }} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search airports..."
                    value={destFilter}
                    onChange={(e) => setDestFilter(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                {filteredDestAirports.slice(0, 15).map((a) => (
                  <SelectItem key={a.code} value={a.code}>
                    {a.code} — {a.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              className="w-full h-10 bg-primary hover:bg-primary/90"
              data-testid="button-search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Class & options row */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <Select value={travelClass} onValueChange={(v: any) => setTravelClass(v)}>
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
                {[1,2,3,4,5,6].map(n => (
                  <SelectItem key={n} value={String(n)}>{n}</SelectItem>
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

          <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
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
                  {[0,1,2,3,5,7].map(n => (
                    <SelectItem key={n} value={String(n)}>±{n}</SelectItem>
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
