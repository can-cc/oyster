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

CREATE TABLE user (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       username TEXT UNQUIE,
       hash TEXT,
       created_at DATE,
       updated_at DATE
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

