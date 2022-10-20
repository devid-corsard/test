create table positions (
	position_id BIGSERIAL NOT NULL PRIMARY KEY,
	position VARCHAR(50) NOT NULL
)

create table users (
	id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(60) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(13) NOT NULL,
	position_id BIGINT NOT NULL REFERENCES positions(position_id),
	photo VARCHAR(1000) NOT NULL,
	registration_timestamp TIMESTAMP NOT NULL,
	UNIQUE(email),
	UNIQUE(phone)
)

insert into positions (position) values('Security');
insert into positions (position) values('Designer');
insert into positions (position) values('Content manager');
insert into positions (position) values('Lawyer');

SELECT * FROM users
    ORDER BY registration_timestamp
    LEFT JOIN positions
    ON positions.id = users.position_id
