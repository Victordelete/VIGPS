PRAGMA user_version = 001;

CREATE TABLE user (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    access INTEGER NOT NULL
);

INSERT OR IGNORE INTO user (id, name, email, access) values 
        (1, 'admin', 'admin@vigps.com', 1),
        (2, 'support', 'support@vigps.com', 2),
        (3, 'user', 'user@vigps.com', 3);

CREATE TABLE video (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    name text NOT NULL,
    record_date DATETIME,
    is_sync BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

INSERT OR IGNORE INTO video (id, user_id, name, record_date) values 
        (1, 1, 'video1', '2000-01-01'),
        (2, 1, 'video2', '2000-01-01'),
        (3, 1, 'video3', '2000-01-01'),
        (4, 1, 'video4', '2000-01-01'),
        (5, 1, 'video5', '2000-01-01');

CREATE TABLE position (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    video_id INTEGER NOT NULL,
    altitude INTEGER,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    timestamp INTEGER,
    FOREIGN KEY (video_id) REFERENCES video (id) ON DELETE CASCADE
);