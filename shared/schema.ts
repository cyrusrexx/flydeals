import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Saved flight searches
export const savedSearches = sqliteTable("saved_searches", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  departDate: text("depart_date").notNull(),
  returnDate: text("return_date"),
  travelClass: text("travel_class").notNull().default("business"),
  passengers: integer("passengers").notNull().default(1),
  flexDays: integer("flex_days").notNull().default(3),
  createdAt: text("created_at").notNull(),
});

// Saved/favorited flight deals
export const savedDeals = sqliteTable("saved_deals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  searchId: integer("search_id"),
  airline: text("airline").notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  departTime: text("depart_time").notNull(),
  arriveTime: text("arrive_time").notNull(),
  returnDepartTime: text("return_depart_time"),
  returnArriveTime: text("return_arrive_time"),
  duration: integer("duration").notNull(),
  stops: integer("stops").notNull().default(0),
  travelClass: text("travel_class").notNull(),
  flightNumber: text("flight_number"),
  airplane: text("airplane"),
  legroom: text("legroom"),
  extensions: text("extensions"), // JSON array
  carbonEmissions: integer("carbon_emissions"),
  bookingUrl: text("booking_url"),
  savedAt: text("saved_at").notNull(),
  notes: text("notes"),
});

export const insertSavedSearchSchema = createInsertSchema(savedSearches).omit({ id: true });
export const insertSavedDealSchema = createInsertSchema(savedDeals).omit({ id: true });

export type InsertSavedSearch = z.infer<typeof insertSavedSearchSchema>;
export type SavedSearch = typeof savedSearches.$inferSelect;
export type InsertSavedDeal = z.infer<typeof insertSavedDealSchema>;
export type SavedDeal = typeof savedDeals.$inferSelect;

// Flight search request type (not persisted)
export const flightSearchSchema = z.object({
  origin: z.string().min(2).max(5),
  destination: z.string().min(2).max(5),
  departDate: z.string(),
  returnDate: z.string().optional(),
  travelClass: z.enum(["economy", "premium_economy", "business", "first"]).default("business"),
  passengers: z.number().min(1).max(9).default(1),
  flexDays: z.number().min(0).max(7).default(3),
  maxStops: z.number().min(0).max(2).default(1),
  maxPrice: z.number().optional(),
  sortBy: z.enum(["price", "duration", "departure", "arrival", "stops"]).default("price"),
});

export type FlightSearchRequest = z.infer<typeof flightSearchSchema>;

// Flight result type
export interface FlightResult {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  price: number;
  travelClass: string;
  departure: {
    airport: string;
    airportId: string;
    time: string;
  };
  arrival: {
    airport: string;
    airportId: string;
    time: string;
  };
  duration: number;
  stops: number;
  layovers?: Array<{
    airport: string;
    duration: number;
  }>;
  airplane: string;
  legroom: string;
  extensions: string[];
  carbonEmissions?: {
    thisFlight: number;
    typical: number;
    differencePercent: number;
  };
  bookingUrl: string;
  source: "google_flights" | "jsx" | "kiwi";
  // Strategy flags from the thread
  isOptimalDate?: boolean;
  isHiddenFlight?: boolean;
  hasSmartLayover?: boolean;
  hasDealOrPromo?: boolean;
  savings?: number;
}

// JSX specific route info
export interface JSXRoute {
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  price?: number;
  tripType: string;
}
