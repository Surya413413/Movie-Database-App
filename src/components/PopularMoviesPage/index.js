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
class PopularMoviesPage extends Component {
  state = {apiStatus: apiConstantStatus.loading, popularData: []}

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    const api =
      'https://api.themoviedb.org/3/movie/popular?api_key=3423fc47c6fa7d48601ae20e0c4afcc5&language=en-US&page=1'
    const response = await fetch(api)
    const data = await response.json()
    const recivesData = data.results.map(each => ({
      id: each.id,
      title: each.title,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
    }))
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

    return (
      <ul className="popular-container">
        {popularData.map(each => (
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
    return (
      <>
        <GlobalNavbar />
        <div>{this.renderSwitch()}</div>
      </>
    )
  }
}
export default PopularMoviesPage
