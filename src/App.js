import {Switch, Route} from 'react-router-dom'
import {useState} from 'react'

import MovieContext from './context/MovieContext'

import PopularMoviesPage from './components/PopularMoviesPage'
import TopRatedPage from './components/TopRatedPage'
import UpcomingMoviesPage from './components/UpcomingMoviesPage'
import SearchPage from './components/SearchPage'
import './App.css'

const API_KEY = '3423fc47c6fa7d48601ae20e0c4afcc5'

// write your code here
const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getSerachInput = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(each => ({
      id: each.id,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })

  const searchQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const api = `https://api.themoviedb.org/3/search/movie?api_key=3423fc47c6fa7d48601ae20e0c4afcc5&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(api)
    const data = await response.json()
    setSearchResponse(getSerachInput(data))
    setApiStatus('SUCCESS')
  }
  return (
    <MovieContext.Provider
      value={{
        searchQuery,
        searchResponse,
        apiStatus,
        onChangeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={PopularMoviesPage} />
        <Route exact path="/top-rated" component={TopRatedPage} />
        <Route exact path="/upcoming" component={UpcomingMoviesPage} />
        <Route exact path="/search" component={SearchPage} />
      </Switch>
    </MovieContext.Provider>
  )
}

export default App
