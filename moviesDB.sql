DROP DATABASE moviesDB;
CREATE DATABASE moviesDB;

USE moviesDB;

CREATE TABLE movies (
	movie_id BINARY(16) NOT NULL,
	title VARCHAR(25) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(32) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) NOT NULL,
    PRIMARY KEY (movie_id)
);

CREATE TABLE genre (
	genre_id INT NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (genre_id)
);

CREATE TABLE movies_genre(
	PRIMARY KEY(movie_id, genre_id),
    movie_id BINARY(16) REFERENCES movies(movie_id),
    genre_id int REFERENCES genre(genre_id)
);