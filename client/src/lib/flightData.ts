// All data and logic runs client-side — no backend needed for GitHub Pages deployment

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

export interface FlightResult {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  price: number;
  travelClass: string;
  departure: { airport: string; airportId: string; time: string };
  arrival: { airport: string; airportId: string; time: string };
  duration: number;
  stops: number;
  layovers?: Array<{ airport: string; duration: number }>;
  airplane: string;
  legroom: string;
  extensions: string[];
  carbonEmissions?: { thisFlight: number; typical: number; differencePercent: number };
  bookingUrl: string;
  source: string;
  isOptimalDate?: boolean;
  isHiddenFlight?: boolean;
  hasSmartLayover?: boolean;
  hasDealOrPromo?: boolean;
  savings?: number;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  travelClass: string;
  passengers: number;
  flexDays: number;
  maxStops: number;
  sortBy: string;
}

export interface SearchResponse {
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

export function searchFlights(params: SearchParams): SearchResponse {
  const airlinesData = [
    { name: "Delta", code: "DL", logo: "https://www.gstatic.com/flights/airline_logos/70px/DL.png" },
    { name: "United", code: "UA", logo: "https://www.gstatic.com/flights/airline_logos/70px/UA.png" },
    { name: "American", code: "AA", logo: "https://www.gstatic.com/flights/airline_logos/70px/AA.png" },
    { name: "Southwest", code: "WN", logo: "https://www.gstatic.com/flights/airline_logos/70px/WN.png" },
    { name: "JetBlue", code: "B6", logo: "https://www.gstatic.com/flights/airline_logos/70px/B6.png" },
    { name: "Alaska", code: "AS", logo: "https://www.gstatic.com/flights/airline_logos/70px/AS.png" },
    { name: "Spirit", code: "NK", logo: "https://www.gstatic.com/flights/airline_logos/70px/NK.png" },
    { name: "Frontier", code: "F9", logo: "https://www.gstatic.com/flights/airline_logos/70px/F9.png" },
  ];

  const classMultiplier: Record<string, number> = {
    economy: 1,
    premium_economy: 1.6,
    business: 3.2,
    first: 5.5,
  };

  const { origin, destination, departDate, travelClass, flexDays, maxStops, sortBy } = params;
  const mult = classMultiplier[travelClass] || 1;
  const basePrice = 180 + Math.floor(Math.random() * 120);

  const dates: string[] = [departDate];
  if (flexDays > 0) {
    for (let i = 1; i <= flexDays; i++) {
      const d = new Date(departDate);
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
      d.setDate(d.getDate() + 2 * i);
      dates.push(d.toISOString().split("T")[0]);
    }
  }

  const strategies = ["isOptimalDate", "isHiddenFlight", "hasSmartLayover", "hasDealOrPromo"];
  const results: FlightResult[] = [];

  for (let i = 0; i < 12; i++) {
    const airline = airlinesData[i % airlinesData.length];
    const flightNum = `${airline.code} ${100 + Math.floor(Math.random() * 900)}`;
    const stops = Math.min(Math.floor(Math.random() * 3), maxStops);
    const baseDuration = 120 + Math.floor(Math.random() * 180);
    const duration = baseDuration + stops * (40 + Math.floor(Math.random() * 60));
    const priceVariation = Math.floor(Math.random() * 200) - 80;
    const price = Math.max(99, Math.round((basePrice + priceVariation) * mult));
    const originalPrice = Math.round(price * (1.15 + Math.random() * 0.35));
    const departHour = 6 + Math.floor(Math.random() * 14);
    const departMin = Math.floor(Math.random() * 4) * 15;
    const arriveHour = (departHour + Math.floor(duration / 60)) % 24;
    const arriveMin = (departMin + duration) % 60;
    const dateIdx = Math.floor(Math.random() * Math.min(dates.length, 3));
    const flightDate = dates[dateIdx];
    const strategy = strategies[Math.floor(Math.random() * strategies.length)];

    const originAirport = airports.find((a) => a.code === origin);
    const destAirport = airports.find((a) => a.code === destination);

    const result: FlightResult = {
      id: `flight-${i}-${Date.now()}`,
      airline: airline.name,
      airlineLogo: airline.logo,
      flightNumber: flightNum,
      price,
      travelClass:
        travelClass === "business"
          ? "Business"
          : travelClass === "first"
          ? "First"
          : travelClass === "premium_economy"
          ? "Premium Economy"
          : "Economy",
      departure: {
        airport: originAirport?.name || `${origin} Airport`,
        airportId: origin,
        time: `${flightDate} ${String(departHour).padStart(2, "0")}:${String(departMin).padStart(2, "0")}`,
      },
      arrival: {
        airport: destAirport?.name || `${destination} Airport`,
        airportId: destination,
        time: `${flightDate} ${String(arriveHour).padStart(2, "0")}:${String(arriveMin).padStart(2, "0")}`,
      },
      duration,
      stops,
      layovers:
        stops > 0
          ? Array.from({ length: stops }, () => ({
              airport: ["DFW", "ORD", "ATL", "DEN", "MSP", "PHX"][Math.floor(Math.random() * 6)],
              duration: 40 + Math.floor(Math.random() * 80),
            }))
          : undefined,
      airplane: ["Boeing 737MAX 8", "Airbus A320neo", "Boeing 787-9", "Embraer E175", "Boeing 777-300ER"][Math.floor(Math.random() * 5)],
      legroom: `${28 + Math.floor(Math.random() * 12)} in`,
      extensions: [
        stops === 0 ? "Nonstop" : `${stops} stop${stops > 1 ? "s" : ""}`,
        "Wi-Fi",
        "In-seat power",
        `Carbon emissions: ${120 + Math.floor(Math.random() * 100)} kg`,
      ],
      carbonEmissions: {
        thisFlight: 120000 + Math.floor(Math.random() * 100000),
        typical: 187000,
        differencePercent: Math.floor(Math.random() * 40) - 20,
      },
      bookingUrl: `https://www.google.com/travel/flights?q=flights+from+${origin}+to+${destination}`,
      source: "google_flights",
      [strategy]: true,
      savings: originalPrice - price,
    };
    results.push(result);
  }

  results.sort((a, b) => {
    switch (sortBy) {
      case "price": return a.price - b.price;
      case "duration": return a.duration - b.duration;
      case "stops": return a.stops - b.stops;
      default: return a.price - b.price;
    }
  });

  const prices = results.map((r) => r.price);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  return {
    flights: results,
    meta: {
      total: results.length,
      origin,
      destination,
      departDate,
      returnDate: params.returnDate,
      travelClass,
      priceInsights: {
        lowest: lowestPrice,
        highest: highestPrice,
        average: avgPrice,
        recommendation:
          lowestPrice < avgPrice * 0.8
            ? "Great deal! Price is well below average."
            : "Prices are typical for this route.",
      },
    },
  };
}

export interface FeeItem {
  amount: number;
  avoidable: boolean;
  tip: string;
}

export function analyzeFees(travelClass: string): { fees: Record<string, FeeItem>; totalAvoidable: number; summary: string } {
  const fees: Record<string, FeeItem> = {};

  if (travelClass === "Economy" || travelClass === "Premium Economy") {
    fees["Checked Bag (1st)"] = { amount: 35, avoidable: true, tip: "Use airline credit card for free checked bag. Pack carry-on only if possible." };
    fees["Checked Bag (2nd)"] = { amount: 45, avoidable: true, tip: "Ship items via USPS/UPS for heavy loads — often cheaper than 2nd bag fee." };
    fees["Seat Selection"] = { amount: 25, avoidable: true, tip: "Skip seat selection — free seats assigned at check-in. Or get airline credit card." };
    fees["Priority Boarding"] = { amount: 15, avoidable: true, tip: "Not worth it unless overhead bin space is critical. Board last for less hassle." };
  }
  if (travelClass === "Business" || travelClass === "First") {
    fees["Checked Bag (1st)"] = { amount: 0, avoidable: false, tip: "Included with Business/First class." };
    fees["Checked Bag (2nd)"] = { amount: 0, avoidable: false, tip: "Included with Business/First class." };
    fees["Lounge Access"] = { amount: 0, avoidable: false, tip: "Included. Check for partner lounges if connecting." };
    fees["Priority Boarding"] = { amount: 0, avoidable: false, tip: "Included with your fare class." };
  }
  fees["Wi-Fi (full flight)"] = { amount: 8, avoidable: true, tip: "T-Mobile users get free GoGo Wi-Fi. Delta provides free Wi-Fi on most flights." };
  fees["In-flight Meals"] = { amount: 12, avoidable: true, tip: "Bring your own food. Airport restaurants are often cheaper than in-flight purchases." };
  fees["Change/Cancel Fee"] = {
    amount: travelClass === "Economy" ? 200 : 0,
    avoidable: travelClass === "Economy",
    tip:
      travelClass === "Economy"
        ? "Book refundable fare or use airline credit card with trip protection."
        : "No change fees for Business/First class tickets.",
  };

  const totalAvoidable = Object.values(fees)
    .filter((f) => f.avoidable)
    .reduce((sum, f) => sum + f.amount, 0);

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
    changePolicy:
      travelClass === "Economy"
        ? { fee: 200, note: "Standard economy tickets have a $200 change fee. Consider booking flexible/refundable fare for $50-100 more — it pays for itself if plans change." }
        : { fee: 0, note: "Business and First class tickets typically allow free changes. Verify fare rules before booking." },
    cancelPolicy:
      travelClass === "Economy"
        ? { refund: "Credit only", note: "Most economy fares give airline credit, not cash refund. Book with a credit card that has trip cancellation insurance." }
        : { refund: "Full refund within 24h, credit after", note: "Business/First class fares usually offer full refund within 24 hours. After that, airline credit." },
    riskScore: travelClass === "Economy" ? "Medium-High" : "Low",
    recommendation:
      travelClass === "Economy"
        ? "Consider upgrading to flexible economy or booking Business class — the change/cancel protection often justifies the cost difference."
        : "Low financial risk. Your fare class includes flexible change and cancellation policies.",
    hiddenClauses: [
      "24-hour free cancellation is federally mandated for all US flights",
      "Name changes are generally not allowed — book under legal name",
      "Schedule changes by the airline may qualify you for a free change",
      "Credit card trip protection may cover what the airline won't",
    ],
  };
}
