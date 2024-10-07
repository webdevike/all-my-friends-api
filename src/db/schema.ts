import { integer, text, boolean, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const tasks = pgTable('tasks', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  done: boolean('done').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Task = InferModel<typeof tasks>;
export type NewTask = InferModel<typeof tasks, 'insert'>;

// If you need to define custom validation or transformation logic,
// you can create separate functions for that purpose.
export function validateNewTask(task: NewTask): NewTask {
  if (task.name.length < 1 || task.name.length > 500) {
    throw new Error('Task name must be between 1 and 500 characters');
  }
  return task;
}

export function validateTaskUpdate(task: Partial<NewTask>): Partial<NewTask> {
  if (task.name !== undefined && (task.name.length < 1 || task.name.length > 500)) {
    throw new Error('Task name must be between 1 and 500 characters');
  }
  return task;
}
