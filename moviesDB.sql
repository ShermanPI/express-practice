DROP DATABASE IF EXISTS moviesDB;
CREATE DATABASE moviesDB;

USE moviesDB;

-- Crear tabla de películas
CREATE TABLE movie (
    id BINARY(16) NOT NULL,
    title VARCHAR(25) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(32) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) NOT NULL,
    PRIMARY KEY (id)
);

-- Crear tabla de géneros
CREATE TABLE genre (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- Crear tabla para relacionar películas con géneros
CREATE TABLE movie_genre (
    movie_id BINARY(16) NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movie(id),
    FOREIGN KEY (genre_id) REFERENCES genre(id)
);

-- Poblar la tabla de géneros
INSERT INTO genre (name) VALUES
('Action'),
('Comedy'),
('Drama'),
('Thriller'),
('Horror'),
('Sci-Fi'),
('Romance'),
('Documentary');

-- Poblar la tabla de películas
INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), 'Inception', 2010, 'Christopher Nolan', 148, NULL, 8.8),
(UUID_TO_BIN(UUID()), 'The Dark Knight', 2008, 'Christopher Nolan', 152, NULL, 9.0),
(UUID_TO_BIN(UUID()), 'Interstellar', 2014, 'Christopher Nolan', 169, NULL, 8.6),
(UUID_TO_BIN(UUID()), 'The Grand Budapest Hotel', 2014, 'Wes Anderson', 99, NULL, 8.1),
(UUID_TO_BIN(UUID()), 'Parasite', 2019, 'Bong Joon Ho', 132, NULL, 8.6),
(UUID_TO_BIN(UUID()), 'The Matrix', 1999, 'Lana Wachowski, Lilly Wachowski', 136, NULL, 8.7),
(UUID_TO_BIN(UUID()), 'Get Out', 2017, 'Jordan Peele', 104, NULL, 7.7);

-- Poblar dinámicamente la tabla movie_genre con relaciones basadas en UUID
-- Inception: Action (1), Sci-Fi (6)
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 1 FROM movie WHERE title = 'Inception';
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 6 FROM movie WHERE title = 'Inception';

-- The Dark Knight: Action (1), Thriller (4)
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 1 FROM movie WHERE title = 'The Dark Knight';
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 4 FROM movie WHERE title = 'The Dark Knight';

-- Interstellar: Drama (3), Sci-Fi (6)
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 3 FROM movie WHERE title = 'Interstellar';
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 6 FROM movie WHERE title = 'Interstellar';

-- The Grand Budapest Hotel: Comedy (2), Drama (3)
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 2 FROM movie WHERE title = 'The Grand Budapest Hotel';
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 3 FROM movie WHERE title = 'The Grand Budapest Hotel';

-- Parasite: Drama (3), Thriller (4)
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 3 FROM movie WHERE title = 'Parasite';
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 4 FROM movie WHERE title = 'Parasite';

-- The Matrix: Action (1), Sci-Fi (6)
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 1 FROM movie WHERE title = 'The Matrix';
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 6 FROM movie WHERE title = 'The Matrix';

-- Get Out: Horror (5), Thriller (4)
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 5 FROM movie WHERE title = 'Get Out';
INSERT INTO movie_genre (movie_id, genre_id)
SELECT id, 4 FROM movie WHERE title = 'Get Out';

-- Consultas de prueba
SELECT * FROM movie;
SELECT * FROM genre;
SELECT BIN_TO_UUID(movie_id) as movie_id, BIN_TO_UUID(genre_id) as genre_id
FROM movie_genre;

SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, g.id as genre_id, g.name as genre_name
        FROM movie as m
        INNER JOIN movie_genre ON BIN_TO_UUID(movie_genre.movie_id) = BIN_TO_UUID(m.id)
        INNER JOIN genre as g ON movie_genre.genre_id = g.id
        WHERE g.name LIKE 'Romance'