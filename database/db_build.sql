BEGIN;

DROP TABLE IF EXISTS members, votes cascade;

CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  description TEXT,
  languages TEXT
);

CREATE TABLE votes (
  id INTEGER PRIMARY KEY,
  member_id INTEGER references members (id) NOT NULL,
  num_votes INTEGER
);

COMMIT;
