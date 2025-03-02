import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faFilm, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL_POPULAR = import.meta.env.VITE_API_URL_POPULAR;
const API_URL_SEARCH = import.meta.env.VITE_API_URL_SEARCH;

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVisible, setSearchVisible] = useState(false); 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const url = searchQuery
        ? `${API_URL_SEARCH}?api_key=${API_KEY}&query=${searchQuery}`
        : `${API_URL_POPULAR}?api_key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        setMovies(response.data.results); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMovies();
  }, [searchQuery]); 

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid align-items-center">
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

          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-white d-lg-none search-icon" 
            onClick={toggleSearchVisibility}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          />

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
