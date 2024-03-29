CREATE TABLE positions (
	position_id BIGSERIAL NOT NULL PRIMARY KEY,
	position VARCHAR(50) NOT NULL
);

INSERT INTO positions (position) VALUES('Security');
INSERT INTO positions (position) VALUES('Designer');
INSERT INTO positions (position) VALUES('Content manager');
INSERT INTO positions (position) VALUES('Lawyer');

CREATE TABLE counter (
	name VARCHAR(50) NOT NULL,
	amount BIGINT NOT NULL DEFAULT 0
);

INSERT INTO counter (name) VALUES('total_users');

CREATE TABLE users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(60) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(13) NOT NULL,
	position_id BIGINT NOT NULL REFERENCES positions(position_id),
	photo VARCHAR(1000) NOT NULL,
	registration_timestamp TIMESTAMP NOT NULL
);

CREATE TABLE token (
	token_id BIGSERIAL NOT NULL PRIMARY KEY,
	body VARCHAR(300) NOT NULL
);
