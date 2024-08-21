import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MoviePage from '../MoviePage'
import GlobalNavbar from '../GlobalNavbar'
import Pagination from '../Pagination'

import './index.css'

const apiConstantStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  loading: 'LOADING',
}
class PopularMoviesPage extends Component {
  state = {apiStatus: apiConstantStatus.loading, popularData: {}}

  componentDidMount() {
    this.getPopularData()
  }

  getResponse = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(each => ({
      id: each.id,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })

  getPopularData = async (page = 1) => {
    const api = `https://api.themoviedb.org/3/movie/popular?api_key=3423fc47c6fa7d48601ae20e0c4afcc5&language=en-US&page=${page}`
    const response = await fetch(api)
    const data = await response.json()
    const recivesData = this.getResponse(data)

    if (response.ok) {
      console.log(data)

      this.setState({
        apiStatus: apiConstantStatus.success,
        popularData: recivesData,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderLoading = () => (
    <div>
      <Loader type="TailSpin" />
    </div>
  )

  renderPopularData = () => {
    const {popularData} = this.state
    const {results} = popularData

    return (
      <ul className="popular-container">
        {results.map(each => (
          <MoviePage eachMovies={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderPopularData()
      case apiConstantStatus.failure:
        return <p>failed page</p>
      case apiConstantStatus.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {popularData} = this.state
    return (
      <>
        <GlobalNavbar />
        <div>{this.renderSwitch()}</div>
        <Pagination
          totalPages={popularData.totalPages}
          apiCallback={this.getPopularData}
        />
      </>
    )
  }
}
export default PopularMoviesPage
