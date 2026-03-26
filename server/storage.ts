import {
  type SavedSearch, type InsertSavedSearch, savedSearches,
  type SavedDeal, type InsertSavedDeal, savedDeals,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, desc } from "drizzle-orm";

const sqlite = new Database("data.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite);

export interface IStorage {
  getSavedSearches(): Promise<SavedSearch[]>;
  createSavedSearch(search: InsertSavedSearch): Promise<SavedSearch>;
  deleteSavedSearch(id: number): Promise<void>;
  getSavedDeals(): Promise<SavedDeal[]>;
  createSavedDeal(deal: InsertSavedDeal): Promise<SavedDeal>;
  deleteSavedDeal(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getSavedSearches(): Promise<SavedSearch[]> {
    return db.select().from(savedSearches).orderBy(desc(savedSearches.createdAt)).all();
  }

  async createSavedSearch(search: InsertSavedSearch): Promise<SavedSearch> {
    return db.insert(savedSearches).values(search).returning().get();
  }

  async deleteSavedSearch(id: number): Promise<void> {
    db.delete(savedSearches).where(eq(savedSearches.id, id)).run();
  }

  async getSavedDeals(): Promise<SavedDeal[]> {
    return db.select().from(savedDeals).orderBy(desc(savedDeals.savedAt)).all();
  }

  async createSavedDeal(deal: InsertSavedDeal): Promise<SavedDeal> {
    return db.insert(savedDeals).values(deal).returning().get();
  }

  async deleteSavedDeal(id: number): Promise<void> {
    db.delete(savedDeals).where(eq(savedDeals.id, id)).run();
  }
}

export const storage = new DatabaseStorage();
