// import { PrismaClient } from "@prisma/client";

// declare global  {
//     var prisma: PrismaClient |undefined;
// }

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV === "production") globalThis.prisma = db;
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined; // Usamos var aquí porque es necesario para declare global
}

const prisma = global.prisma || new PrismaClient({
  log: ["query", "info", "warn", "error"], // Agrega logs para debugging si es necesario
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const db = prisma;
