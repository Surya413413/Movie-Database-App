import Loader from 'react-loader-spinner'

import MoviePage from '../MoviePage'
import GlobalNavbar from '../GlobalNavbar'
import Pagination from '../Pagination'
import MovieContext from '../../context/MovieContext'

import './index.css'

const SearchPage = () => {
  const renderEmptyView = () => (
    <div>
      <h1>No results found.</h1>
      <p>Don not get worried, Try to search again.</p>
    </div>
  )

  const renderMoviesList = searchResponse => {
    const {results} = searchResponse

    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul>
        {results.map(movie => (
          <MoviePage key={movie.id} eachMovies={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div>
      <Loader type="TailSpin" />
    </div>
  )

  const renderSearchResultViews = value => {
    const {apiStatus, searchQuery, searchResponse} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <MovieContext.Consumer>
      {value => {
        const {searchResponse, searchQuery} = value

        return (
          <>
            <GlobalNavbar />
            <div>{renderSearchResultViews(value)}</div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={searchQuery}
            />
          </>
        )
      }}
    </MovieContext.Consumer>
  )
}

export default SearchPage
