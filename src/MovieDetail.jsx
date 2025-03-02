import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom"; 
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL_MOVIE = "https://api.themoviedb.org/3/movie";


const languageMap = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  zh: "Chinese",
  ko: "Korean",
  ar: "Arabic",
  hi: "Hindi",
  // Add more languages as needed
};

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL_MOVIE}/${id}?api_key=${API_KEY}&append_to_response=credits`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]); 

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>Movie not found!</p>;
  }

  const languageName =
    languageMap[movie.original_language] || movie.original_language;

  const countries = movie.production_countries
    .map((country) => country.name)
    .join(", ");

  const mainStars = movie.credits.cast.slice(0, 5);

  const director = movie.credits.crew.find(
    (person) => person.job === "Director"
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <span
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
            </span>
          </Link>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <h1 className="ms-lg-2">{movie.title}</h1>
            <br />
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <strong>Release Date</strong>
                  <br />
                  {movie.release_date}
                </div>
                <div className="col text-center">
                  <strong>IMBD</strong>
                  <br />
                  <div className="ms-1">
                  {movie.vote_average.toFixed(1)}
                  <FontAwesomeIcon
                    className="ms-1"
                    icon={faStar}
                    style={{ color: "#F7931A" }}
                  />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <p className="ms-lg-2">{movie.overview}</p>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <strong>Genres:</strong>{" "}
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </div>
                <div className="col text-center">
                  <strong>{movie.runtime} minutes </strong>
                </div>
              </div>
            </div>
            <br />
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <strong>Production Countries:</strong> {countries || "N/A"}
                </div>
                <div className="col text-center">
                  <strong>{languageName}</strong>
                </div>
              </div>
            </div>
            <br />
            <p>
              
            </p>
            <p className="ms-lg-2">
              <strong>Director:</strong> {director ? director.name : "N/A"}
            </p>
            <p className="ms-lg-2">
              <strong>Main Stars:</strong>
              {mainStars.length > 0
                ? mainStars.map((star) => star.name).join(", ")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
