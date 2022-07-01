import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

//   レンダリングコンポーネント
const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  return (
    <div className="single-movie-container">
      <div className="title-block">
        <h3 className="movie-title">{movie.Title}</h3>
      </div>
      <div className="image">
        <img src={poster} alt={`The movie title: ${movie.Title}`} />
      </div>
      <p className="year">{movie.Year}</p>
    </div>
  );
};

export default Movie;
