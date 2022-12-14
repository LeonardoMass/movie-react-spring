import MovieScore from "components/MovieScore";
import { Link } from "react-router-dom";
import { Movie } from "types/movie"


type Props = {
    movie: Movie;
}

function MovieCard({ movie }: Props) {
   


    return (
        <div className="movie-listing-space">
            <img className="movie-movie-card-image" src={movie.image} alt={movie.title} />
            <div className="movie-card-bottom-container">
                <h3>{movie.title}</h3>
                <MovieScore movie={movie} />

                <Link to={`/form/${movie.id}`}>
                <div className="movie-btn">Avaliar</div>
                </Link>
            </div>
        </div>
    );
}

export default MovieCard;