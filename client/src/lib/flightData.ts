// All data and logic runs client-side — no backend needed

export interface Airport {
  code: string;
  name: string;
  city: string;
}

export const airports: Airport[] = [
  { code: "SFO", name: "San Francisco International", city: "San Francisco, CA" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles, CA" },
  { code: "JFK", name: "John F. Kennedy International", city: "New York, NY" },
  { code: "EWR", name: "Newark Liberty International", city: "Newark, NJ" },
  { code: "LGA", name: "LaGuardia Airport", city: "New York, NY" },
  { code: "ORD", name: "O'Hare International", city: "Chicago, IL" },
  { code: "ATL", name: "Hartsfield-Jackson International", city: "Atlanta, GA" },
  { code: "DFW", name: "Dallas/Fort Worth International", city: "Dallas, TX" },
  { code: "DEN", name: "Denver International", city: "Denver, CO" },
  { code: "SEA", name: "Seattle-Tacoma International", city: "Seattle, WA" },
  { code: "MIA", name: "Miami International", city: "Miami, FL" },
  { code: "BOS", name: "Logan International", city: "Boston, MA" },
  { code: "LAS", name: "Harry Reid International", city: "Las Vegas, NV" },
  { code: "PHX", name: "Phoenix Sky Harbor International", city: "Phoenix, AZ" },
  { code: "MSP", name: "Minneapolis-St. Paul International", city: "Minneapolis, MN" },
  { code: "DTW", name: "Detroit Metropolitan", city: "Detroit, MI" },
  { code: "HNL", name: "Daniel K. Inouye International", city: "Honolulu, HI" },
  { code: "SAN", name: "San Diego International", city: "San Diego, CA" },
  { code: "AUS", name: "Austin-Bergstrom International", city: "Austin, TX" },
  { code: "IAH", name: "George Bush Intercontinental", city: "Houston, TX" },
  { code: "BUR", name: "Hollywood Burbank Airport", city: "Burbank, CA" },
  { code: "OAK", name: "Oakland International", city: "Oakland, CA" },
  { code: "SNA", name: "John Wayne Airport", city: "Orange County, CA" },
  { code: "STS", name: "Charles M. Schulz–Sonoma County", city: "Santa Rosa, CA" },
  { code: "SMF", name: "Sacramento International", city: "Sacramento, CA" },
  { code: "CLD", name: "McClellan–Palomar Airport", city: "Carlsbad, CA" },
  { code: "MRY", name: "Monterey Regional Airport", city: "Monterey, CA" },
  { code: "RNO", name: "Reno-Tahoe International", city: "Reno, NV" },
  { code: "APC", name: "Napa County Airport", city: "Napa, CA" },
  { code: "CCR", name: "Buchanan Field Airport", city: "Concord, CA" },
  { code: "DAL", name: "Dallas Love Field", city: "Dallas, TX" },
  { code: "HOU", name: "William P. Hobby Airport", city: "Houston, TX" },
  { code: "PBI", name: "Palm Beach International", city: "West Palm Beach, FL" },
  { code: "HPN", name: "Westchester County Airport", city: "Westchester, NY" },
  { code: "LHR", name: "London Heathrow", city: "London, UK" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris, France" },
  { code: "NRT", name: "Narita International", city: "Tokyo, Japan" },
  { code: "SJD", name: "Cabo San Lucas International", city: "Cabo San Lucas, MX" },
  { code: "CUN", name: "Cancún International", city: "Cancún, MX" },
  { code: "MCO", name: "Orlando International", city: "Orlando, FL" },
  { code: "TPA", name: "Tampa International", city: "Tampa, FL" },
  { code: "IAD", name: "Dulles International", city: "Washington, DC" },
  { code: "DCA", name: "Reagan National", city: "Washington, DC" },
  { code: "PHL", name: "Philadelphia International", city: "Philadelphia, PA" },
  { code: "CLT", name: "Charlotte Douglas International", city: "Charlotte, NC" },
  { code: "PDX", name: "Portland International", city: "Portland, OR" },
  { code: "SLC", name: "Salt Lake City International", city: "Salt Lake City, UT" },
  { code: "FLL", name: "Fort Lauderdale-Hollywood", city: "Fort Lauderdale, FL" },
  { code: "BWI", name: "Baltimore/Washington International", city: "Baltimore, MD" },
  { code: "SJC", name: "San José Mineta International", city: "San Jose, CA" },
];

export interface JSXRoute {
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  price: number;
  tripType: string;
}

export const jsxRoutes: JSXRoute[] = [
  { origin: "Burbank", originCode: "BUR", destination: "Las Vegas", destinationCode: "LAS", price: 219, tripType: "one-way" },
  { origin: "Oakland", originCode: "OAK", destination: "Las Vegas", destinationCode: "LAS", price: 199, tripType: "one-way" },
  { origin: "Burbank", originCode: "BUR", destination: "Concord", destinationCode: "CCR", price: 299, tripType: "one-way" },
  { origin: "Dallas", originCode: "DAL", destination: "Houston", destinationCode: "HOU", price: 199, tripType: "one-way" },
  { origin: "Houston", originCode: "HOU", destination: "Dallas", destinationCode: "DAL", price: 199, tripType: "one-way" },
  { origin: "Westchester", originCode: "HPN", destination: "West Palm Beach", destinationCode: "PBI", price: 692, tripType: "one-way" },
  { origin: "Burbank", originCode: "BUR", destination: "Las Vegas", destinationCode: "LAS", price: 418, tripType: "round-trip" },
  { origin: "Houston", originCode: "HOU", destination: "Dallas", destinationCode: "DAL", price: 398, tripType: "round-trip" },
  { origin: "Dallas", originCode: "DAL", destination: "Destin", destinationCode: "DSI", price: 309, tripType: "one-way" },
  { origin: "Burbank", originCode: "BUR", destination: "Monterey", destinationCode: "MRY", price: 528, tripType: "round-trip" },
  { origin: "Orange County", originCode: "SNA", destination: "Monterey", destinationCode: "MRY", price: 648, tripType: "round-trip" },
  { origin: "Carlsbad", originCode: "CLD", destination: "Reno", destinationCode: "RNO", price: 438, tripType: "round-trip" },
  { origin: "Burbank", originCode: "BUR", destination: "Napa", destinationCode: "APC", price: 434, tripType: "round-trip" },
  { origin: "Dallas", originCode: "DAL", destination: "Taos", destinationCode: "TSM", price: 704, tripType: "round-trip" },
  { origin: "Burbank", originCode: "BUR", destination: "Taos", destinationCode: "TSM", price: 654, tripType: "round-trip" },
  { origin: "Los Angeles", originCode: "LAX", destination: "Cabo San Lucas", destinationCode: "SJD", price: 574, tripType: "round-trip" },
  { origin: "Orange County", originCode: "SNA", destination: "Napa", destinationCode: "APC", price: 510, tripType: "round-trip" },
  { origin: "Dallas", originCode: "DAL", destination: "Gunnison", destinationCode: "GUC", price: 652, tripType: "round-trip" },
];

export interface SearchParams {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  travelClass: string;
  passengers: number;
  flexDays: number;
  maxStops: number;
}

// Build a Google Flights URL from search params
function buildGoogleFlightsUrl(params: SearchParams & { dateOverride?: string; classOverride?: string; stopsNote?: string }): string {
  const { origin, destination, departDate, returnDate, travelClass, passengers } = params;
  const date = params.dateOverride || departDate;

  const classMap: Record<string, string> = {
    economy: "economy",
    premium_economy: "premium economy",
    business: "business class",
    first: "first class",
  };
  const cls = classMap[params.classOverride || travelClass] || "business class";

  let q = `Flights to ${destination} from ${origin} on ${date}`;
  if (returnDate && !params.dateOverride) {
    q += ` through ${returnDate}`;
  }
  if (passengers > 1) {
    q += ` ${passengers} passengers`;
  }
  q += ` ${cls}`;

  return `https://www.google.com/travel/flights?q=${encodeURIComponent(q)}&curr=USD`;
}

export interface SearchLink {
  id: string;
  title: string;
  description: string;
  url: string;
  strategy: string;
  strategyNum: number;
  icon: string; // icon key for the frontend
}

// Generate all 8 strategy search links for a given set of params
export function generateStrategyLinks(params: SearchParams): SearchLink[] {
  const { origin, destination, departDate, returnDate, travelClass, passengers, flexDays, maxStops } = params;
  const originAirport = airports.find((a) => a.code === origin);
  const destAirport = airports.find((a) => a.code === destination);
  const routeLabel = `${origin} → ${destination}`;

  const links: SearchLink[] = [];

  // 1. Optimal Dates Scanner — main search + flexible date links
  links.push({
    id: "strategy-1-main",
    title: `${routeLabel} — ${travelClass === "business" ? "Business" : travelClass === "first" ? "First" : "Economy"}`,
    description: `Your exact dates: ${departDate}${returnDate ? ` – ${returnDate}` : ""}. Opens Google Flights with real-time prices.`,
    url: buildGoogleFlightsUrl(params),
    strategy: "Optimal Dates Scanner",
    strategyNum: 1,
    icon: "calendar",
  });

  // Add flex date variants
  if (flexDays > 0) {
    for (let offset of [-3, -1, 1, 3]) {
      if (Math.abs(offset) <= flexDays) {
        const d = new Date(departDate);
        d.setDate(d.getDate() + offset);
        const flexDate = d.toISOString().split("T")[0];
        const label = offset < 0 ? `${Math.abs(offset)} days earlier` : `${offset} days later`;
        links.push({
          id: `strategy-1-flex-${offset}`,
          title: `${routeLabel} — ${label} (${flexDate})`,
          description: `Check if departing ${label} is cheaper. Flexible dates often save 20-40%.`,
          url: buildGoogleFlightsUrl({ ...params, dateOverride: flexDate }),
          strategy: "Optimal Dates Scanner",
          strategyNum: 1,
          icon: "calendar",
        });
      }
    }
  }

  // 2. Hidden Flight Searcher — search with nearby airports
  const nearbyAirports: Record<string, string[]> = {
    SFO: ["OAK", "SJC", "SMF"],
    LAX: ["BUR", "SNA", "LGB", "ONT"],
    JFK: ["EWR", "LGA"],
    EWR: ["JFK", "LGA"],
    LGA: ["JFK", "EWR"],
    ORD: ["MDW"],
    DFW: ["DAL"],
    DAL: ["DFW"],
    IAH: ["HOU"],
    HOU: ["IAH"],
    DCA: ["IAD", "BWI"],
    IAD: ["DCA", "BWI"],
    MIA: ["FLL"],
    FLL: ["MIA"],
  };

  const altOrigins = nearbyAirports[origin] || [];
  const altDests = nearbyAirports[destination] || [];

  for (const alt of altOrigins.slice(0, 2)) {
    links.push({
      id: `strategy-2-origin-${alt}`,
      title: `${alt} → ${destination} — Nearby departure airport`,
      description: `Try departing from ${airports.find(a => a.code === alt)?.city || alt} instead. Often significantly cheaper.`,
      url: buildGoogleFlightsUrl({ ...params, origin: alt }),
      strategy: "Hidden Flight Searcher",
      strategyNum: 2,
      icon: "eye",
    });
  }
  for (const alt of altDests.slice(0, 2)) {
    links.push({
      id: `strategy-2-dest-${alt}`,
      title: `${origin} → ${alt} — Nearby arrival airport`,
      description: `Try arriving at ${airports.find(a => a.code === alt)?.city || alt} instead. Check if it's cheaper.`,
      url: buildGoogleFlightsUrl({ ...params, destination: alt }),
      strategy: "Hidden Flight Searcher",
      strategyNum: 2,
      icon: "eye",
    });
  }

  // 3. Route Optimizer with Smart Layovers — search with common hubs
  if (maxStops > 0) {
    links.push({
      id: "strategy-3-google",
      title: `${routeLabel} — Include connecting flights`,
      description: `Google Flights shows 1-2 stop options that are often much cheaper. Sort by price to find the best layover routes.`,
      url: buildGoogleFlightsUrl(params),
      strategy: "Smart Layover Routes",
      strategyNum: 3,
      icon: "route",
    });
  }

  // 4. Verified Deals & Promos — link to deal aggregators
  links.push({
    id: "strategy-4-google-explore",
    title: "Google Flights Explore — Find deals from your area",
    description: `Discover the cheapest destinations from ${originAirport?.city || origin} on a map. Great for flexible destinations.`,
    url: `https://www.google.com/travel/explore?q=flights+from+${origin}&curr=USD`,
    strategy: "Verified Deals & Promos",
    strategyNum: 4,
    icon: "tag",
  });
  links.push({
    id: "strategy-4-secretflying",
    title: "Secret Flying — Mistake fares & flash sales",
    description: "Crowd-sourced mistake fares, error prices, and unadvertised sales updated hourly.",
    url: "https://www.secretflying.com/usa-deals/",
    strategy: "Verified Deals & Promos",
    strategyNum: 4,
    icon: "tag",
  });
  links.push({
    id: "strategy-4-theflightdeal",
    title: "The Flight Deal — Curated cheap fares",
    description: "Curated flight deals from the US. Each deal is manually verified before posting.",
    url: "https://www.theflightdeal.com",
    strategy: "Verified Deals & Promos",
    strategyNum: 4,
    icon: "tag",
  });

  // 5. Fee Breakdown — link to seat comparison tools
  links.push({
    id: "strategy-5-seatguru",
    title: "SeatGuru — Compare seat maps & legroom",
    description: "Check seat maps, legroom, power outlets, and Wi-Fi by airline and aircraft before booking.",
    url: "https://www.seatguru.com",
    strategy: "Fee Breakdown & Elimination",
    strategyNum: 5,
    icon: "dollar",
  });

  // 6. Price Negotiation — economy comparison search
  if (travelClass !== "economy") {
    links.push({
      id: "strategy-6-economy",
      title: `${routeLabel} — Compare Economy price`,
      description: `See Economy pricing for the same route to calculate your upgrade premium and negotiate.`,
      url: buildGoogleFlightsUrl({ ...params, classOverride: "economy" }),
      strategy: "Price Negotiation",
      strategyNum: 6,
      icon: "mail",
    });
  }

  // 7. Flexibility & Risk — search refundable fares
  links.push({
    id: "strategy-7-flexible",
    title: `${routeLabel} — Tips for flexible booking`,
    description: `24-hour free cancellation is federally mandated on US flights. Book directly with the airline for easiest changes. Business/First usually includes free changes.`,
    url: buildGoogleFlightsUrl(params),
    strategy: "Flexibility & Risk Analysis",
    strategyNum: 7,
    icon: "shield",
  });

  // 8. Hidden City / Skiplagged
  links.push({
    id: "strategy-8-skiplagged",
    title: `Skiplagged — Hidden city flights from ${origin}`,
    description: `Check if flights with a connection at ${destination} are cheaper than direct flights to ${destination}. Risks: no checked bags, one-way only.`,
    url: `https://skiplagged.com/flights/${origin}/${destination}/${departDate}${returnDate ? `/${returnDate}` : ""}`,
    strategy: "Hidden Destination Strategy",
    strategyNum: 8,
    icon: "map",
  });

  return links;
}

export interface FeeItem {
  amount: number;
  avoidable: boolean;
  tip: string;
}

export function analyzeFees(travelClass: string): { fees: Record<string, FeeItem>; totalAvoidable: number; summary: string } {
  const fees: Record<string, FeeItem> = {};
  if (travelClass === "economy" || travelClass === "premium_economy") {
    fees["Checked Bag (1st)"] = { amount: 35, avoidable: true, tip: "Use airline credit card for free checked bag. Pack carry-on only if possible." };
    fees["Checked Bag (2nd)"] = { amount: 45, avoidable: true, tip: "Ship items via USPS/UPS for heavy loads — often cheaper than 2nd bag fee." };
    fees["Seat Selection"] = { amount: 25, avoidable: true, tip: "Skip seat selection — free seats assigned at check-in. Or get airline credit card." };
    fees["Priority Boarding"] = { amount: 15, avoidable: true, tip: "Not worth it unless overhead bin space is critical." };
  }
  if (travelClass === "business" || travelClass === "first") {
    fees["Checked Bag (1st)"] = { amount: 0, avoidable: false, tip: "Included with Business/First class." };
    fees["Checked Bag (2nd)"] = { amount: 0, avoidable: false, tip: "Included with Business/First class." };
    fees["Lounge Access"] = { amount: 0, avoidable: false, tip: "Included. Check for partner lounges if connecting." };
    fees["Priority Boarding"] = { amount: 0, avoidable: false, tip: "Included with your fare class." };
  }
  fees["Wi-Fi (full flight)"] = { amount: 8, avoidable: true, tip: "T-Mobile users get free GoGo Wi-Fi. Delta provides free Wi-Fi on most flights." };
  fees["In-flight Meals"] = { amount: 12, avoidable: true, tip: "Bring your own food. Airport restaurants are often cheaper than in-flight purchases." };
  fees["Change/Cancel Fee"] = {
    amount: travelClass === "economy" ? 200 : 0,
    avoidable: travelClass === "economy",
    tip: travelClass === "economy" ? "Book refundable fare or use credit card with trip protection." : "No change fees for Business/First class tickets.",
  };
  const totalAvoidable = Object.values(fees).filter((f) => f.avoidable).reduce((sum, f) => sum + f.amount, 0);
  return { fees, totalAvoidable, summary: `You could save up to $${totalAvoidable} by following these tips.` };
}

export interface FlexibilityData {
  changePolicy: { fee: number; note: string };
  cancelPolicy: { refund: string; note: string };
  riskScore: string;
  recommendation: string;
  hiddenClauses: string[];
}

export function analyzeFlexibility(travelClass: string): FlexibilityData {
  return {
    changePolicy: travelClass === "economy"
      ? { fee: 200, note: "Standard economy tickets have a $200 change fee. Consider flexible/refundable fare for $50-100 more." }
      : { fee: 0, note: "Business and First class tickets typically allow free changes. Verify fare rules before booking." },
    cancelPolicy: travelClass === "economy"
      ? { refund: "Credit only", note: "Most economy fares give airline credit, not cash refund. Book with a credit card that has trip cancellation insurance." }
      : { refund: "Full refund within 24h, credit after", note: "Business/First fares usually offer full refund within 24 hours. After that, airline credit." },
    riskScore: travelClass === "economy" ? "Medium-High" : "Low",
    recommendation: travelClass === "economy"
      ? "Consider upgrading to flexible economy or Business class — the change/cancel protection often justifies the cost."
      : "Low financial risk. Your fare class includes flexible change and cancellation policies.",
    hiddenClauses: [
      "24-hour free cancellation is federally mandated for all US flights",
      "Name changes are generally not allowed — book under legal name",
      "Schedule changes by the airline may qualify you for a free change",
      "Credit card trip protection may cover what the airline won't",
    ],
  };
}
