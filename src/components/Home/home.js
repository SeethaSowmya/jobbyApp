import './home.css'
import {Link} from 'react-router-dom'
import Header from '../Header/header'

const Home = () => (
  <div className="homeContainer">
    <Header />
    <div className="mainContainer">
      <h1>Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs,salary information company
        reviews.Find the fits your abilities and potential.
      </p>
      <Link to="/Jobs/">
        <button type="button" className="findJobsBtn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
