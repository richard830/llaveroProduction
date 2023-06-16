DROP TABLE IF EXISTS persona CASCADE;
CREATE TABLE persona (
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	edad VARCHAR(255) NOT NULL,
	image VARCHAR(455) NULL,
	id_user BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS usuarios CASCADE;
CREATE TABLE usuarios (
  id BIGSERIAL PRIMARY KEY,
  descripccion VARCHAR(355),
  imageU JSONB,
  id_user BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS userfoto CASCADE;
CREATE TABLE userfoto (
	id BIGSERIAL PRIMARY KEY,
  	imageu VARCHAR(955),
	id_user BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS likes CASCADE;
CREATE TABLE seguidor (
	id BIGSERIAL PRIMARY KEY,
	user_id BIGINT NOT NULL,
	userfoto_id BIGINT NOT NULL,
	favorito INTEGER NULL,
	created_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(userfoto_id) REFERENCES userfoto(id) ON UPDATE CASCADE ON DELETE CASCADE
)











DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	phone VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,

	edad VARCHAR(10)  NULL,
	profesion VARCHAR(450)  NULL,
	ciudad VARCHAR(450)  NULL,
	relacion VARCHAR(450)  NULL,

	userdescripcion VARCHAR(955) NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
	

);
*****************************************************
cambias el nombre sin afecatar los datos
-- Cambiar el nombre de la columna
ALTER TABLE userfoto
RENAME COLUMN created_at TO fechafoto;
-- Modificar el tipo de dato y asignar restricciones a la columna renombrada
ALTER TABLE userfoto
ALTER COLUMN fechafoto TYPE TIMESTAMP(0) USING fechafoto::TIMESTAMP(0),
ALTER COLUMN fechafoto SET NOT NULL;
*************************************************************************



ALTER TABLE users ADD COLUMN estadofoto boolean DEFAULT true;

cambiar tipo d dato
ALTER TABLE users ALTER COLUMN password TYPE varchar(400);

ALTER TABLE doc_exb DROP COLUMN column_b;

ALTER TABLE users ADD COLUMN userdescripcion VARCHAR(900)

INSERT INTO usuarios (descripccion,imageu, id_user,created_at, updated_at) VALUES 
('aqui van las fotoss mias', '{"image": "https://firebasestorage.googleapis.com/v0/b/chicas-bc0ed.appspot.com/o/image_1679100052304?alt=media&token=aa812454-6666-49c2-9ad3-dbdae6d2f84b"}'::jsonb,13,'2023-03-17 19:40:53','2023-03-17 19:40:53');

INSERT INTO usuarios (id, imageu, id_user,created_at, updated_at) VALUES 
('1,{"image": "https://firebasestorage.googleapis.com/v0/b/chicas-bc0ed.appspot.com/o/image_1679100052304?alt=media&token=aa812454-6666-49c2-9ad3-dbdae6d2f84b"}'::jsonb,13,'2023-03-17 19:40:53','2023-03-17 19:40:53');

select * from users u inner join persona p on u.id= p.id_user















DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
)


INSERT INTO roles(name,route,reated_at,updated_at)
	VALUES(
		'CLIENTE',
		'client/product/list',
		'2022-05-02',
		'2022-05-02'
	);


INSERT INTO roles(name,route,reated_at,updated_at)
	VALUES(
		'RESTAURANTE',
		'restaurant/orders/list',
		'2022-05-02',
		'2022-05-02'
	);


INSERT INTO roles(name,route,reated_at,updated_at)
	VALUES(
		'REPARTIDOR',
		'delivery/orders/list',
		'2022-05-02',
		'2022-05-02'
	);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
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



DROP TABLE IF EXISTS categoria CASCADE;
CREATE TABLE categoria (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


DROP TABLE IF EXISTS productos CASCADE;
CREATE TABLE productos (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	precio DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NOT NULL,
	image2 VARCHAR(255) NULL,
	image3 VARCHAR(255) NULL,
	id_category BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_category) REFERENCES categoria(id) ON UPDATE CASCADE ON DELETE CASCADE
);


DROP TABLE IF EXISTS direccion CASCADE;
CREATE TABLE direccion(
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL,
	address VARCHAR(255) NOT NULL,
	vecindario VARCHAR(255) NOT NULL,
	lat DECIMAL DEFAULT 0,
	lng DECIMAL DEFAULT 0,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE

);

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders(
	id BIGSERIAL PRIMARY KEY,
	id_client BIGINT NOT NULL,
	id_delivery BIGINT NULL,
	id_direccion BIGINT NOT NULL,
	lat DECIMAL DEFAULT 0,
	lng DECIMAL DEFAULT 0,
	status VARCHAR(90) NOT NULL,
	timestamp BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_client) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_delivery) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_direccion) REFERENCES direccion(id) ON UPDATE CASCADE ON DELETE CASCADE

);


DROP TABLE IF EXISTS order_has_products CASCADE;
CREATE TABLE order_has_products(
	id_order BIGINT NOT NULL,
	 BIGINT NOT NULL,
	cantidad BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	PRIMARY KEY(id_order, id_product),
	FOREIGN KEY(id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_product) REFERENCES productos(id) ON UPDATE CASCADE ON DELETE CASCADE

);