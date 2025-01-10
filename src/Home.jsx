import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faFilm, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const API_KEY = "fadb58c698c6b23be592155cc37ab29a";
const API_URL_POPULAR = "https://api.themoviedb.org/3/movie/popular";
const API_URL_SEARCH = "https://api.themoviedb.org/3/search/movie";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [searchVisible, setSearchVisible] = useState(false); // Track visibility of search bar

  // Handle input change for search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Toggle search bar visibility
  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
  };

  // Fetch popular movies or search based on query
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const url = searchQuery
        ? `${API_URL_SEARCH}?api_key=${API_KEY}&query=${searchQuery}`
        : `${API_URL_POPULAR}?api_key=${API_KEY}`;

      try {
        const response = await axios.get(url); // Use axios to fetch data
        setMovies(response.data.results); // Store movie data
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false once fetch is done
      }
    };

    fetchMovies();
  }, [searchQuery]); // Only run the effect when searchQuery changes

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid align-items-center">
          {/* Logo/Title */}
          <a
            className="navbar-brand text-white"
            style={{
              fontWeight: "700",
              fontSize: "2.25rem",
            }}
          >
            <FontAwesomeIcon
              icon={faFilm}
              style={{
                color: "#F7931A",
                fontSize: "2.25rem",
                padding: "0px 5px",
              }}
            />
            Movies App
          </a>

          {/* Search Icon for small screens */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-white d-lg-none search-icon" // Hide on large screens, show on small
            onClick={toggleSearchVisibility}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          />

          {/* Search Container */}
          <div
            className={`search-container ${
              searchVisible ? "d-block d-lg-flex m-auto" : "d-none d-lg-flex"
            }`}
            id="navbarSearch"
          >
            <input
              type="text"
              className="form-control me-2 "
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={handleClearSearch}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </nav>

      <h2 className="p-3" style={{ display: searchQuery ? "none" : "block" }}>
        Popular Movies
      </h2>

      {loading && <p>Loading...</p>}

      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {movies.length === 0 && !loading ? (
            <p>No movies found. Try a different search!</p>
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="col">
                <div className="card h-100 m-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <Link
                      to={`/movie/${movie.id}`}
                      className="btn btn-warning float-end mt-4"
                    >
                      View Details
                    </Link>
                  </div>
                  <div className="card-footer text-muted fw-bold">
                    <span>{movie.release_date.slice(0, 4)}</span>
                    <span className="float-end">
                      {movie.vote_average.toFixed(1)}
                      <FontAwesomeIcon
                        className="ms-1"
                        icon={faStar}
                        style={{ color: "#F7931A" }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
