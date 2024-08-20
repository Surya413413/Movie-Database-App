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
class UpcomingMoviesPage extends Component {
  state = {apiStatus: apiConstantStatus.inProgress, upcomingData: []}

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    const api =
      'https://api.themoviedb.org/3/movie/upcoming?api_key=3423fc47c6fa7d48601ae20e0c4afcc5&language=en-US&page=1'

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
        upcomingData: recivesData,
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

  renderupcomingData = () => {
    const {upcomingData} = this.state

    return (
      <ul className="popular-container">
        {upcomingData.map(each => (
          <MoviePage eachMovies={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderupcomingData()
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
export default UpcomingMoviesPage
