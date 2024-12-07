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

-- Populate the genre table with genres
INSERT INTO genre (name) VALUES
('Action'),
('Comedy'),
('Drama'),
('Thriller'),
('Horror'),
('Sci-Fi'),
('Romance'),
('Documentary');

-- Populate the movies table with sample movies
INSERT INTO movies (movie_id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), 'Inception', 2010, 'Christopher Nolan', 148, NULL, 8.8),
(UUID_TO_BIN(UUID()), 'The Dark Knight', 2008, 'Christopher Nolan', 152, NULL, 9.0),
(UUID_TO_BIN(UUID()), 'Interstellar', 2014, 'Christopher Nolan', 169, NULL, 8.6),
(UUID_TO_BIN(UUID()), 'The Grand Budapest Hotel', 2014, 'Wes Anderson', 99, NULL, 8.1),
(UUID_TO_BIN(UUID()), 'Parasite', 2019, 'Bong Joon Ho', 132, NULL, 8.6),
(UUID_TO_BIN(UUID()), 'The Matrix', 1999, 'Lana Wachowski, Lilly Wachowski', 136, NULL, 8.7),
(UUID_TO_BIN(UUID()), 'Get Out', 2017, 'Jordan Peele', 104, NULL, 7.7);

-- Populate the movies_genre table to associate movies with genres
INSERT INTO movies_genre (movie_id, genre_id) VALUES
-- Inception: Action, Sci-Fi
(UUID_TO_BIN(UUID()), 1),
(UUID_TO_BIN(UUID()), 6),
-- The Dark Knight: Action, Thriller
(UUID_TO_BIN(UUID()), 1),
(UUID_TO_BIN(UUID()), 4),
-- Interstellar: Drama, Sci-Fi
(UUID_TO_BIN(UUID()), 3),
(UUID_TO_BIN(UUID()), 6),
-- The Grand Budapest Hotel: Comedy, Drama
(UUID_TO_BIN(UUID()), 2),
(UUID_TO_BIN(UUID()), 3),
-- Parasite: Drama, Thriller
(UUID_TO_BIN(UUID()), 3),
(UUID_TO_BIN(UUID()), 4),
-- The Matrix: Action, Sci-Fi
(UUID_TO_BIN(UUID()), 1),
(UUID_TO_BIN(UUID()), 6),
-- Get Out: Horror, Thriller
(UUID_TO_BIN(UUID()), 5),
(UUID_TO_BIN(UUID()), 4);
