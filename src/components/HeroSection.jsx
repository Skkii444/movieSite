import React, { useEffect, useState, useRef } from "react";
import "../style/HeroSection.css";

export default function HeroSection() {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);
  const API_KEY = "41f174a7";

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers&type=movie`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -window.innerWidth * 0.8 : window.innerWidth * 0.8;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  // drag-to-scroll
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
    const walk = (x - startX.current) * 1.3;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="hero-container">
      <div className="hero-header">
        <h2 className="hero-title">🔥 Trending</h2>
        <div className="hero-arrows">
          <button onClick={() => scroll("left")} className="hero-arrow">
            &#8592;
          </button>
          <button onClick={() => scroll("right")} className="hero-arrow">
            &#8594;
          </button>
        </div>
      </div>

      <div
        className="hero-scroll"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="hero-slide">
              <img
                src={
                  movie.Poster !== "N/A"
  ? movie.Poster.replace("SX300", "SX1080")
  : "https://via.placeholder.com/800x450?text=No+Image"

                }
                alt={movie.Title}
                className="hero-poster"
              />
              <div className="hero-overlay">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="loading-text">Loading movies...</p>
        )}
      </div>
    </section>
  );
}
