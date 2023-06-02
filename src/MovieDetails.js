import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function MovieDetails({ movies }) {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get("/data.json");
        const fetchedMovies = response.data;
        const foundMovie = fetchedMovies.find(
          (movie) => movie.movie_uid === movieId
        );
        setMovie(foundMovie);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Fetching movie... Please wait!</div>;
  }

  const {
    movie_uid,
    movie_title,
    movie_year,
    bond_actor,
    director,
    M,
    Q,
    moneypenny,
    bond_girl,
    bond_girl_actress,
    car,
  } = movie;

  return (
    <div className="movie-details-container">
      <div className="back-button">
        <Link to="/">Back</Link>
      </div>

      <div className="movie-details">
        <h2>{movie_title}</h2>
        <p>Release Year: {movie_year}</p>
        <p>ID: {movie_uid}</p>
        <p>Director: {director}</p>
        <p>Who played James Bond? {bond_actor}</p>
        <p>Who played M? {M}</p>
        <p>Who played Q? {Q}</p>
        <p>Who played Moneypenny? {moneypenny}</p>
        <p>
          Who played the character {bond_girl} in {movie_title}?{" "}
          {bond_girl_actress}
        </p>
        <p>What car did James Bond drive in the movie? {car}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
