import React, { useEffect, useState, useRef } from "react";
import "../style/MovieSection.css";

export default function MovieSection({ title, query, apiKey }) {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) setMovies(data.Search);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [query, apiKey]);

  // Scroll buttons
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Mouse drag support
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => (isDragging.current = false);
  const handleMouseUp = () => (isDragging.current = false);

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="movie-section">
      <div className="movie-section-header">
        <h2 className="section-title">{title}</h2>
        <div className="arrows">
          <button className="arrow-btn" onClick={() => scroll("left")}>
            &#8592;
          </button>
          <button className="arrow-btn" onClick={() => scroll("right")}>
            &#8594;
          </button>
        </div>
      </div>

      <div
        className="movie-scroll"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.Title}
              />
              <p>{movie.Title}</p>
            </div>
          ))
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </section>
  );
}
