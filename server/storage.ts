import { db } from "./db";
import { inquiries, type InsertInquiry, type Inquiry } from "@shared/schema";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }
}

// Mock storage for landing page only (no database required)
export class MockStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    // Return a mock inquiry response without database
    return {
      id: Date.now(),
      ...insertInquiry,
      createdAt: new Date(),
    } as Inquiry;
  }
}

// Use MockStorage when DATABASE_URL is not set (landing page only mode)
export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MockStorage();
