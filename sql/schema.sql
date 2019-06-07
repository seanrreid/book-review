create database book_review;

create table books (
    id serial primary key,
    publisher varchar(200),
    description text,
    title varchar(200),
    price varchar(100),
    creators varchar(1000),
    release_date int,
    diamond_id varchar(100)
);

create table users (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(200),
    password varchar(500)
);

create table reviews (
    id serial primary key,
    score integer,
    content text,
    book_id integer references books(id),
    user_id integer references users(id)
);