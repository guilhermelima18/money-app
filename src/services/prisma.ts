import { PrismaClient } from "@prisma/client/react-native";
import { reactiveHooksExtension } from "@prisma/react-native";

const baseClient = new PrismaClient({
  log: ["query"],
});

export const prisma = baseClient.$extends(reactiveHooksExtension());

export async function initializeDatabase() {
  try {
    await baseClient.$applyPendingMigrations();
  } catch (error) {
    console.log("Não foi possível iniciar o banco de dados!");
    throw new Error("Não foi possível iniciar o banco de dados!");
  }
}
