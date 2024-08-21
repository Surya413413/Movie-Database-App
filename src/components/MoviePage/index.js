import {Link} from 'react-router-dom'

import './index.css'

const MoviePage = props => {
  const {eachMovies} = props
  const {id, title, posterPath, voteAverage} = eachMovies
  return (
    <>
      <li className="list-containner">
        <h1 className="title-name">{title}</h1>
        <img src={posterPath} className="poster-img" alt="posters" />
        <p>Rating: {voteAverage}</p>
        <Link to={`/movie/${id}`}>
          <button type="button" className="view-details-button">
            View Details
          </button>
        </Link>
      </li>
    </>
  )
}
export default MoviePage
