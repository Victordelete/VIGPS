PRAGMA user_version = 001;

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` text NOT NULL
);

INSERT OR IGNORE INTO users (id, name) values 
  (1, 'admin'), (2, 'support'), (3, 'test');