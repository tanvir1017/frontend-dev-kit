import path from "node:path";
import { PrismaConfig } from "prisma";

export default {
  schema: path.join("prisma", "schema"),
} satisfies PrismaConfig;
