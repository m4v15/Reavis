BEGIN;

DROP TABLE IF EXISTS members, votes cascade;

CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position	VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  description TEXT,
  languages	TEXT
);

CREATE TABLE votes (
  id	PRIMARY KEY SERIAL NOT NULL,
  member_id references members(id) INT NOT NULL,
  num_votes	INT
);

INSERT INTO members (name, position, location, description, languages)
VALUES ('macintoshhelper', 'student', 'Planet Earth', 'I don\'t know', 'UK and US English');

INSERT INTO members (name, position, location, description, languages)
VALUES ('Suuuuuha', 'student', 'Nazareth', 'BLIMEY!', 'Arabic, English');

INSERT INTO members (name, position, location, description, languages)
VALUES ('RQ16', 'student', 'Everywhere', 'self-obsessed', 'Arabic, English');

INSERT INTO members (name, position, location, description, languages)
VALUES ('mavis', 'student', 'Nazareth', 'no comment', 'English, Arabic شوي');

COMMIT;
