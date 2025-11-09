import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/SearchPage.css";
import MinimalNavbar from "../components/MinimalNavbar";

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const API_KEY = "41f174a7";
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&type=movie`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMovies([]);
        setLoading(false);
      });
  }, [searchQuery]);

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <><MinimalNavbar /><div className="search-page">
      <h1 className="section-title">
        Results for "{searchQuery || "all"}"
      </h1>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <img
                src={movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.Title} />
              <div className="movie-title">{movie.Title}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No results found.</p>
      )}
    </div></>
  );
}
