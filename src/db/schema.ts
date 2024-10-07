
import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tasks = pgTable("tasks", {
  id: integer("id").primaryKey(),
  name: text("name")
    .notNull(),
});

export const selectTasksSchema = createSelectSchema(tasks);

export const insertTasksSchema = createInsertSchema(
  tasks,
  {
    // @ts-ignore
    name: schema => schema.name.min(1).max(500),
  },
).required({
  // done: true,
}).omit({
  id: true,
  // createdAt: true,
  // updatedAt: true,
});

export const patchTasksSchema = insertTasksSchema.partial();
