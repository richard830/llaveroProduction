
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	edad VARCHAR(10)  NULL,
	profesion VARCHAR(450)  NULL,
	ciudad VARCHAR(450)  NULL,
	relacion VARCHAR(450)  NULL,
	userdescripcion VARCHAR(955) NULL,
	session_token VARCHAR(255) NULL,
	phone VARCHAR(15) NULL ,
	sexo VARCHAR(16) NULL,
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




DROP TABLE IF EXISTS seguidor CASCADE;
CREATE TABLE seguidor (
  id BIGSERIAL PRIMARY KEY,
  id_usuario_logueado INT,
  id_usuario INT,
  FOREIGN KEY (id_usuario_logueado) REFERENCES users(id),
  FOREIGN KEY (id_usuario) REFERENCES users(id),
);


DROP TABLE IF EXISTS userfoto CASCADE;
CREATE TABLE userfoto (
  id_userfoto BIGSERIAL PRIMARY KEY,
  id_usuario INT,
  foto VARCHAR(900),
  vista int,
  created_at TIMESTAMP(0) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);


DROP TABLE IF EXISTS favorito CASCADE;
CREATE TABLE favorito (
  id_favorito BIGSERIAL PRIMARY KEY,
  id_usuario INT,
  id_userfoto INT,
  FOREIGN KEY (id_usuario) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_userfoto) REFERENCES userfoto(id_userfoto) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS pago CASCADE;
CREATE TABLE pago (
  id_pago BIGSERIAL PRIMARY KEY,
  id_usuario INT,
  id_userfoto INT,
  nombre VARCHAR(100),
  ncuenta VARCHAR(50),
  estado BOOL DEFAULT FALSE,
  created_at TIMESTAMP(0) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_userfoto) REFERENCES userfoto(id_userfoto) ON UPDATE CASCADE ON DELETE CASCADE
);


DROP TABLE IF EXISTS tcomentario CASCADE;
CREATE TABLE tcomentario (
  id_comentario BIGSERIAL PRIMARY KEY,
  id_usuario INT,
  id_userfoto INT,
  comentario text,
  fecha TIMESTAMP(0) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_userfoto) REFERENCES userfoto(id_userfoto) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS comentario_megusta CASCADE;
CREATE TABLE comentario_megusta (
  id_coment_megusta BIGSERIAL PRIMARY KEY,
  id_usuario INT,
  id_comentario INT,

  FOREIGN KEY (id_usuario) REFERENCES users(id),
  FOREIGN KEY (id_comentario) REFERENCES tcomentario(id_comentario)

);

DROP TABLE IF EXISTS chat CASCADE;
CREATE TABLE chat (
  id_chat BIGSERIAL PRIMARY KEY,
  id_usuario INT,
  id_usuario_logueado INT,
  mensaje text,
  fecha_chat TIMESTAMP(0) NOT NULL,
  FOREIGN KEY (id_usuario_logueado) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE

);

DROP TABLE IF EXISTS chat CASCADE;
CREATE TABLE voucher (
  id_voucher BIGSERIAL PRIMARY KEY,
  id_usuario INT,
  id_userfoto INT,
  foto VARCHAR(900),
  fecha_voucher TIMESTAMP(0) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_userfoto) REFERENCES userfoto(id_userfoto) ON UPDATE CASCADE ON DELETE CASCADE

);

DROP TABLE IF EXISTS chat CASCADE;
CREATE TABLE configuracion (
  id_config BIGSERIAL PRIMARY KEY,
  numero_like VARCHAR(6),

  titulo_voucher_process text,
  subtitulo_voucher_process text,

  titulo_enviar_datos text,
  subtitulo_enviar_datos text,

  titulo_dia text,
  subtitulo_dia text,
  foto_dia VARCHAR(900),
  estado_dia BOOL DEFAULT FALSE,
  

);

