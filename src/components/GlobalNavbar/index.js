import {Link} from 'react-router-dom'

import './index.css'

const GlobalNavbar = () => (
  <nav className="nav-container">
    <h1>movieDB</h1>
    <ul className="unorder-list-container">
      <li className="list-links">
        <Link to="/" className="list-links">
          popular
        </Link>
      </li>
      <li className="list-links">
        <Link to="/top-rated" className="list-links">
          Top Rated
        </Link>
      </li>
      <li className="list-links">
        <Link to="/upcoming" className="list-links">
          Upcoming
        </Link>
      </li>
    </ul>
  </nav>
)

export default GlobalNavbar
