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
class TopRatedPage extends Component {
  state = {apiStatus: apiConstantStatus.inProgress, topRatedData: {}}

  componentDidMount() {
    this.getTopRatedData()
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

  getTopRatedData = async (page = 1) => {
    const api = `https://api.themoviedb.org/3/movie/top_rated?api_key=3423fc47c6fa7d48601ae20e0c4afcc5&language=en-US&page=${page}`
    const response = await fetch(api)
    const data = await response.json()
    console.log(data)
    const reversetopReadted = this.getResponse(data)

    if (response.ok) {
      console.log(data)

      this.setState({
        apiStatus: apiConstantStatus.success,
        topRatedData: reversetopReadted,
      })
    }
  }

  renderLoading = () => (
    <div>
      <Loader type="TailSpin" />
    </div>
  )

  renderTopRatedMoviesList = () => {
    const {topRatedData} = this.state
    const {results} = topRatedData

    return (
      <ul>
        {results.map(each => (
          <MoviePage key={each.id} eachMovies={each} />
        ))}
      </ul>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderTopRatedMoviesList()
      case apiConstantStatus.failure:
        return <p>fail</p>
      case apiConstantStatus.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {apiStatus, topRatedData} = this.state
    return (
      <>
        <GlobalNavbar />
        <div>{this.renderSwitch()}</div>
        <Pagination
          totalPages={topRatedData.totalPages}
          apiCallback={this.getTopRatedData}
        />
      </>
    )
  }
}
export default TopRatedPage
