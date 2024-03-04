-- Creamos la base de datos "users" con su respectiva tabla y creamos el usuario "admin" --

create database if not exists users;

use users;

create table users (
	id INT auto_increment primary key,
    name VARCHAR(60) not null,
    email VARCHAR(100) not null,
    password VARCHAR(60) not null
);

insert into users (name, email, password) values ("admin", "admin@admin.com", "admin")
