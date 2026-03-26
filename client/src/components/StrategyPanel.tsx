import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarCheck, Eye, Route, Tag, DollarSign, Mail,
  Shield, MapPin
} from "lucide-react";

const strategies = [
  {
    num: 1,
    title: "Optimal Dates Scanner",
    icon: CalendarCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    description: "Analyzes departure and return dates within a flexible interval to find the cheapest date combinations. Shows the 3 best options ranked.",
  },
  {
    num: 2,
    title: "Hidden Flight Searcher",
    icon: Eye,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10",
    description: "Lists flights including low-cost airlines, regional carriers, and lesser-known connections. Sorted by total actual price, not base fares.",
  },
  {
    num: 3,
    title: "Smart Layover Routes",
    icon: Route,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    description: "Designs alternative routes with 1-2 layovers. Prioritizes layovers under 4 hours and airports without high transit fees.",
  },
  {
    num: 4,
    title: "Verified Deals & Promos",
    icon: Tag,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    description: "Finds active promotional codes, flash sales, and discounts. Verifies expiration dates and sources. Discards expired or unverifiable ones.",
  },
  {
    num: 5,
    title: "Fee Breakdown & Elimination",
    icon: DollarSign,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-500/10",
    description: "Breaks down additional fees: baggage, seats, priority boarding. Suggests legal strategies to avoid or minimize each one.",
  },
  {
    num: 6,
    title: "Price Negotiation Email",
    icon: Mail,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
    description: "Drafts a professional email requesting a competitor price match or discount. Mentions loyalty, current pricing, and alternative prices found.",
  },
  {
    num: 7,
    title: "Flexibility & Risk Analysis",
    icon: Shield,
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-500/10",
    description: "Analyzes change, cancellation, and refund policies. Identifies the least financial risk if plans change. Points out hidden clauses.",
  },
  {
    num: 8,
    title: "Hidden Destination Strategy",
    icon: MapPin,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    description: "Evaluates whether tickets with hidden destinations (skiplagging) can reduce cost. Explains real risks and airline policies.",
  },
];

export default function StrategyPanel() {
  return (
    <Card className="p-5 border border-border/60 bg-card" data-testid="strategy-panel">
      <h3 className="text-sm font-semibold mb-3">8 Travel Hacking Strategies</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Based on the viral thread — every search uses all 8 strategies to find you the best price.
      </p>

      <div className="space-y-2.5">
        {strategies.map((s) => (
          <div
            key={s.num}
            className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className={`w-7 h-7 rounded-md ${s.bg} flex items-center justify-center shrink-0 mt-0.5`}>
              <s.icon className={`h-3.5 w-3.5 ${s.color}`} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs tabular-nums px-1.5 py-0">
                  {s.num}
                </Badge>
                <p className="text-xs font-medium truncate">{s.title}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
