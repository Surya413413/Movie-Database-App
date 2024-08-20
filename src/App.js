import {Switch, Route} from 'react-router-dom'

import PopularMoviesPage from './components/PopularMoviesPage'
import TopRatedPage from './components/TopRatedPage'
import UpcomingMoviesPage from './components/UpcomingMoviesPage'

import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={PopularMoviesPage} />
    <Route exact path="/top-rated" component={TopRatedPage} />
    <Route exact path="/upcoming" component={UpcomingMoviesPage} />
  </Switch>
)

export default App
