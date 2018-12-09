CREATE TABLE atom (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT,
       source TEXT,
       link TEXT,
       content TEXT,
       published TEXT,
       author TEXT,
       isRead BOOLEAN
);

CREATE TABLE vapidKey (
       publicKey TEXT NOT NULL,
       privateKey TEXT NOT NULL
);

CREATE TABLE webpush_subscribers (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       serialization TEXT NOT NULL,
       useragent TEXT
);

