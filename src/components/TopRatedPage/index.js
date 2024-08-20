import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MoviePage from '../MoviePage'
import GlobalNavbar from '../GlobalNavbar'

import './index.css'

const apiConstantStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  loading: 'LOADING',
}
class TopRatedPage extends Component {
  state = {apiStatus: apiConstantStatus.inProgress, topRatedData: []}

  componentDidMount() {
    this.getTopRatedData()
  }

  getTopRatedData = async () => {
    const api =
      'https://api.themoviedb.org/3/movie/top_rated?api_key=3423fc47c6fa7d48601ae20e0c4afcc5&language=en-US&page=1'
    const response = await fetch(api)
    const data = await response.json()
    console.log(data)
    const reversetopReadted = data.results.map(each => ({
      id: each.id,
      title: each.title,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
    }))

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

    return (
      <ul>
        {topRatedData.map(each => (
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
    const {apiStatus} = this.state
    return (
      <>
        <GlobalNavbar />
        <div>{this.renderSwitch()}</div>
      </>
    )
  }
}
export default TopRatedPage
