CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
  `id` integer PRIMARY KEY AUTOINCREMENT,
  `name` text NOT NULL
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` text NOT NULL
);