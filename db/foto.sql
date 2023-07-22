
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);



DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

INSERT INTO roles(name,route,created_at,updated_at)
	VALUES(
		'CLIENTE',
		'/inicio',
		'2022-05-02',
		'2022-05-02'
	);

INSERT INTO roles(name,route,created_at,updated_at)
	VALUES(
		'ADMIN',
		'cliente/admin/list',
		'2022-05-02',
		'2022-05-02'
	);






DROP TABLE IF EXISTS categoria CASCADE;
CREATE TABLE categoria (
	id_categoria BIGSERIAL PRIMARY KEY,
	nombre_categoria VARCHAR(255) NOT NULL UNIQUE,
  	icon VARCHAR(180) NULL,
	created_at TIMESTAMP(0) NOT NULL
	
);

DROP TABLE IF EXISTS password CASCADE;
CREATE TABLE password (
	id_password BIGSERIAL PRIMARY KEY,
  	titulo text NULL,
  	usuario text NULL,
  	contrasen text NULL,
	id_categoria BIGINT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_categoria) REFERENCES categoria(id_categoria) ON UPDATE CASCADE ON DELETE CASCADE
	
);