import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './header.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="headerContainer">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="weblogo"
        />
      </Link>
      <ul className="unOL">
        <Link to="/" className="linkElement">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="linkElement">
          <li>Jobs</li>
        </Link>
        <li>
          <button type="button" onClick={onLogout} className="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
