import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { Movie } from 'types/movie';
import { useEffect , useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from 'utils/requests';
import { validateEmail } from 'utils/validate';

type Props = {
    movieId: String;
}

function FormCard({movieId} : Props) {


    const navigate = useNavigate();
    const [movie , setMovie] = useState<Movie>();

    useEffect(() => {
        axios.get(`${BASE_URL}/movies/${movieId}`)
            .then(response => {
                setMovie(response.data);
            });
    }, [movieId]);

const submit = (event: React.FormEvent<HTMLFormElement>) =>{

    event.preventDefault();

    const email = (event.target as any).email.value;
    const score = (event.target as any).score.value;

    if(!validateEmail(email)){
        return;
    }

    const config: AxiosRequestConfig = {
        baseURL: BASE_URL,
        method: 'PUT',
        url: '/scores',
        data: {
            email: email,
            movieId: movieId,
            score: score
        }
    }
    axios(config).then(response => {
        navigate("/");
    })
}


    return (
        <div className="movie-form-container">
            <img className="movie-movie-card-image" src={movie?.image} alt={movie?.title} />
            <div className="movie-card-bottom-container">
                <h3>{movie?.title}</h3>
                <form className="movie-form" onSubmit={submit}>
                    <div className="form-group movie-form-group">
                        <label htmlFor="email">Informe seu email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group movie-form-group">
                        <label htmlFor="score">Informe sua avaliação</label>
                        <select className="form-control" id="score">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="movie-form-btn-container">
                        <button type="submit" className="movie-btn">Salvar</button>
                    </div>
                </form >
                <Link to="/">
                <button className="movie-btn mt-3">Cancelar</button>
                </Link>


                
            </div >
        </div >
    );
}

export default FormCard;