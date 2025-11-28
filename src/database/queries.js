import { getDb } from "./db";
import { users } from "./schema";

export async function getAllUsers() {
  const db = await getDb();
  return db.select().from(users);
}

export async function createUser(name) {
  const db = await getDb();
  await db.insert(users).values({ name });
}
