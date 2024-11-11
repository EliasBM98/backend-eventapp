-------------------TABLAS-------------------

--Tabla user
CREATE TABLE users (
id serial NOT NULL PRIMARY KEY,
name varchar (50) NOT NULL,
surname varchar (50) NOT NULL,
email varchar(100) NOT NULL UNIQUE,
password varchar (100) NOT NULL,
role varchar (10) NOT NULL,
created_at DATE default current_timestamp
);

--Tabla event_phase
CREATE TABLE event_phase (
id serial NOT NULL PRIMARY KEY,
name varchar (50) NOT NULL UNIQUE
);

--Tabla event_type
CREATE TABLE event_type (
id serial NOT NULL PRIMARY KEY,
name varchar (50) NOT NULL UNIQUE
);

--Tabla enterprise
CREATE TABLE enterprise (
id serial NOT NULL PRIMARY KEY,
name varchar (50) NOT NULL UNIQUE,
description varchar (200)
);

--Tabla --Ojo me falta meter team!!
CREATE TABLE events (
id serial NOT NULL PRIMARY KEY,
name varchar (100) NOT NULL UNIQUE,
description varchar(100) NOT NULL,
year DATE,
start_date DATE,
end_date DATE,

event_phase integer NOT NULL,
FOREIGN KEY (event_phase) REFERENCES event_phase(id),

event_type integer NOT NULL,
FOREIGN KEY (event_type) REFERENCES event_type (id),

enterprise integer NOT NULL,
FOREIGN KEY (enterprise) REFERENCES enterprise (id),

chief integer NOT NULL,
FOREIGN KEY (chief) REFERENCES users (id),
 
created_at DATE default current_timestamp);



-------------------Valores prueba-------------------
--Users
INSERT INTO users(name, surname, email, password, role)
VALUES
('Juan', 'Martinez', 'jm@correo.com', 'juan123', 'user'),
('Maria', 'Fernandez', 'mf@correo.com', 'maria123', 'lead'),
('Javier', 'Ramirez', 'jr@correo.com', 'javier123', 'Admin');

--Event_phase
INSERT INTO event_phase (name)
VALUES
('Notificación evento'),
('Busqueda equipo técnico'),
('Preparación Material'),
('Montaje'),
('Evento'),
('Desmontaje');

--Event_type
INSERT INTO event_type (name)
VALUES
('Festival'),
('Concierto'),
('Musical'),
('Obra de teatro'),
('Corporativo'),
('Grabación');

--Enterprise
INSERT INTO enterprise (name, description)
VALUES
('Repsol', 'Empresa energética' ),
('Coca-Cola', 'Empresa alimentaria'),
('Los40', 'Cadena de radio'),
('Marriot', 'Cadena hotelera');

--Events
INSERT INTO events(name, 
					description, 
					year, 
					start_date, 
					end_date, 
					event_phase, 
					event_type, 
					enterprise,
					chief)
VALUES
('Los 40 music awards', 'Gala de premios de los 40', '2024/10/10', '2024/10/12', '2024/10/14', 1, 1, 3, 2);