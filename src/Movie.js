import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Movie({ movie }) {
  //destructure object
  const { movie_uid, movie_title, movie_year, bond_actor, director } = movie;

  return (
    //display properties
    //route to new movie detail component
    <div>
      <Link to={`/movies/${movie_uid}`}>
        <h2>{movie_title}</h2>
      </Link>
      <p>Release Year: {movie_year}</p>
      <p>ID: {movie_uid}</p>
      <p>Who played James Bond? {bond_actor}</p>
      <p>Director: {director}</p>
    </div>
  );
}

export default Movie;
