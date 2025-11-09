import React, { useState } from "react";
import "../style/MinimalNavbar.css";

export default function MinimalNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          <a href="/">MovieSite</a>
        </div>

        {/* Links */}
        <nav className={`navbar-links ${open ? "open" : ""}`}>
          <a href="/" className="active">Home</a>
          <a href="/movies">Movies</a>
          <a href="/about">About</a>
          <input type="text" placeholder="Search..." className="navbar-search" />
        </nav>

        {/* Mobile toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`bar ${open ? "open" : ""}`}></span>
          <span className={`bar ${open ? "open" : ""}`}></span>
          <span className={`bar ${open ? "open" : ""}`}></span>
        </button>
      </div>
    </header>
  );
}
