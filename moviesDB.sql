DROP DATABASE moviesDB;
CREATE DATABASE moviesDB;

USE moviesDB;

CREATE TABLE movies (
	title VARCHAR(25) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(32) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) NOT NULL
);

CREATE TABLE genre (
	id INT NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE movies_genre(
	genre_id int
)