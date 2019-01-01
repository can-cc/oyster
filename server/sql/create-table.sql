
CREATE TABLE vapidKey (
       publicKey TEXT NOT NULL,
       privateKey TEXT NOT NULL
);

CREATE TABLE webpush_subscribers (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       serialization TEXT NOT NULL,
       useragent TEXT
);

