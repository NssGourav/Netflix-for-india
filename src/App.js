import React, { useState } from 'react';
import movies from './indian_movies.json';
import './App.css';

function MovieCard({ movie, onSelect }) {
  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="p-2">
        <h2 className="text-white text-lg font-semibold">{movie.title}</h2>
        <p className="text-gray-400 text-sm">{movie.genre.join(', ')} | {movie.year}</p>
      </div>
    </div>
  );
}

function MovieModal({ movie, onClose }) {
  if (!movie) return null;
  return (
    <div className="movie-modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img src={movie.poster} alt={movie.title} className="modal-poster" />
        <div className="modal-details">
          <h2 className="modal-title">{movie.title}</h2>
          <div className="modal-meta">
            <span>{movie.year}</span>
            <span>{movie.genre.join(', ')}</span>
          </div>
          <p className="modal-description">{movie.description}</p>
          <p className="text-gray-400 mb-4"><strong>Cast:</strong> {movie.cast.join(', ')}</p>
          <div className="mt-4">
            <button className="play-button">▶ Play</button>
            <button className="more-info">More Info</button>
          </div>
          <div className="mt-6">
            <iframe
              src={movie.trailer}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-48 md:h-64 rounded"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');

  const genres = ['All', ...Array.from(new Set(movies.flatMap(m => m.genre)))];

  const filteredMovies = movies.filter(movie => {
    const matchesGenre = genre === 'All' || movie.genre.includes(genre);
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  // Find a featured movie for the hero banner
  const featuredMovie = movies.find(movie => movie.id === 1) || movies[0];

  // Get trending Telugu movies (IDs 6-10)
  const trendingMovies = movies.filter(movie => movie.id >= 6 && movie.id <= 10);

  return (
    <div className="netflix-container">
      <header className="netflix-header">
        <div className="netflix-logo">NETFLIX INDIA</div>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="filter-select"
          >
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="hero-banner">
        <img src={featuredMovie.poster} alt={featuredMovie.title} />
        <div className="hero-content">
          <h1 className="hero-title">{featuredMovie.title}</h1>
          <p className="hero-description">{featuredMovie.description.substring(0, 150)}...</p>
          <div className="flex">
            <button className="play-button">▶ Play</button>
            <button className="more-info" onClick={() => setSelectedMovie(featuredMovie)}>More Info</button>
          </div>
        </div>
      </div>

      {/* Movie Sections */}
      <section className="movie-section">
        <h2 className="section-title">Popular in India</h2>
        <div className="movie-row">
          {filteredMovies.slice(0, 5).map(movie => (
            <MovieCard key={movie.id} movie={movie} onSelect={setSelectedMovie} />
          ))}
        </div>
      </section>

      <section className="movie-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="movie-row">
          {trendingMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onSelect={setSelectedMovie} />
          ))}
        </div>
      </section>

      {/* Movie Modal */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

export default App;
