import React from "react";
import HeroSection from "../components/HeroSection";
import MinimalNavbar from "../components/MinimalNavbar";
import MovieSection from "../components/MovieSection";

export default function Home() {
    const apiKey = "41f174a7";
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
      <MinimalNavbar
  brand={{ name: "MovieSite", href: "/" }}
  links={[
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
  ]}
/>

      <HeroSection />
      <MovieSection title="Action Movies" query="action" apiKey={apiKey} />
      <MovieSection title="Horror Movies" query="horror" apiKey={apiKey} />
      <MovieSection title="Comedy Movies" query="comedy" apiKey={apiKey} />
      <MovieSection title="Drama Movies" query="drama" apiKey={apiKey} />
    </div>
  );
}
