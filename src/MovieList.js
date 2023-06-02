import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./styles.css";
import MovieDetails from "./MovieDetails";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [characters] = useState(["M", "Q", "Moneypenny"]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/data.json")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setSelectedActor(null);
    setSelectedDirector(null);
    setSelectedCategory("actors");
    setShowAllMovies(false);
  };

  const handleActorClick = (actor) => {
    setSelectedActor(actor);
    setSelectedDirector(null);
    setSelectedCategory("actors");
    setShowAllMovies(false);
  };

  const handleDirectorClick = (director) => {
    setSelectedDirector(director);
    setSelectedActor(null);
    setSelectedCharacter(null);
    setSelectedCategory("directors");
    setShowAllMovies(false);
  };

  const handleAllClick = () => {
    setSelectedCharacter(null);
    setSelectedActor(null);
    setSelectedDirector(null);
    setSelectedCategory(null);
    setShowAllMovies(true);
  };

  const handleClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const getMoviesByActor = () => {
    if (selectedActor) {
      const filteredMovies = movies.filter(
        (movie) => movie[selectedCharacter] === selectedActor
      );
      return filteredMovies.map((movie) => (
        <p key={movie.movie_uid} onClick={() => handleClick(movie.movie_uid)}>
          {movie.movie_title}
        </p>
      ));
    }
    return null;
  };

  const getMoviesByDirector = () => {
    if (selectedDirector) {
      const filteredMovies = movies.filter(
        (movie) => movie.director === selectedDirector
      );
      return filteredMovies.map((movie) => (
        <p key={movie.movie_uid} onClick={() => handleClick(movie.movie_uid)}>
          {movie.movie_title}
        </p>
      ));
    }
    return null;
  };

  const getAllMovies = () => {
    return movies.map((movie) => (
      <p key={movie.movie_uid} onClick={() => handleClick(movie.movie_uid)}>
        {movie.movie_title}
      </p>
    ));
  };

  const getUniqueActors = () => {
    const actorSet = new Set();
    movies.forEach((movie) => {
      const actor = movie[selectedCharacter];
      if (actor && actor !== "No Actor") {
        actorSet.add(actor);
      }
    });
    return Array.from(actorSet);
  };

  const getUniqueDirectors = () => {
    const directorSet = new Set();
    movies.forEach((movie) => {
      directorSet.add(movie.director);
    });
    return Array.from(directorSet);
  };

  return (
    <div className="container">
      <h1>James Bond Movie Database</h1>
      <div className="buttons">
        {characters.map((character) => (
          <span
            className="text-button"
            key={character}
            onClick={() => handleCharacterClick(character)}
          >
            {character}
          </span>
        ))}
        <span
          className="text-button"
          onClick={() => handleDirectorClick("All")}
        >
          Directors
        </span>
        <span className="text-button" onClick={() => handleAllClick()}>
          All
        </span>
      </div>

      {selectedCharacter && !selectedActor && selectedCategory === "actors" && (
        <div>
          <h3>{selectedCharacter} Actors:</h3>
          {getUniqueActors().map((actor) => (
            <button
              className="actor-button"
              key={actor}
              onClick={() => handleActorClick(actor)}
            >
              {actor}
            </button>
          ))}
        </div>
      )}

      {selectedCharacter && selectedActor && selectedCategory === "actors" && (
        <div>
          <h3>Movies by {selectedActor}:</h3>
          {getMoviesByActor()}
        </div>
      )}

      {selectedDirector && selectedCategory === "directors" && (
        <div>
          <h3>Movies by Directors:</h3>
          {getUniqueDirectors().map((director) => (
            <button
              className="director-button"
              key={director}
              onClick={() => handleDirectorClick(director)}
            >
              {director}
            </button>
          ))}
          {getMoviesByDirector()}
        </div>
      )}

      {showAllMovies && (
        <div>
          <h3>All Movies:</h3>
          {getAllMovies()}
        </div>
      )}

      {!selectedCategory && !showAllMovies && (
        <div>
          <h3>All Movies:</h3>
          {movies.map((movie) => (
            <p
              key={movie.movie_uid}
              onClick={() => handleClick(movie.movie_uid)}
            >
              {movie.movie_title}
            </p>
          ))}
        </div>
      )}

      <Routes>
        <Route
          path="/movies/:movieId"
          element={<MovieDetails movies={movies} />}
        />
      </Routes>
    </div>
  );
};

export default MovieList;
