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
      <Link to="/" className="weblogo">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="unOL">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/jobs">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" onClick={onLogout} className="button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
