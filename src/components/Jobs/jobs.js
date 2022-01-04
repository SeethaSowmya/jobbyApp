import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header/header'
import JobDetailsDisplay from '../jobDetails/JobDetails'

import './jobs.css'

const apiStatusContainer = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const jwt = Cookies.get('jwt_token')
const options = {
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
  method: 'GET',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusContainer.initial,
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const details = data.profile_details
    if (response.ok === true) {
      const pDetails = {
        imgUrl: details.profile_image_url,
        name: details.name,
        shortBio: details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusContainer.success,
        profileDetails: pDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusContainer.failure})
    }
  }

  onSuccessView = () => {
    const {profileDetails} = this.state
    const {name, imgUrl, shortBio} = profileDetails
    return (
      <div className="leftContainer">
        <div className="profileData">
          <img src={imgUrl} alt="profilePic" className="profilePic" />
          <h1 className="headingName">{name}</h1>
          <p className="paraOfBio">{shortBio}</p>
        </div>
      </div>
    )
  }

  onFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
    </div>
  )

  loaderCode = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryButton = () => <button type="button">Retry</button>

  switchStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContainer.inProgress:
        return this.loaderCode()
      case apiStatusContainer.success:
        return this.onSuccessView()
      case apiStatusContainer.failure:
        return this.onFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <JobDetailsDisplay />
        <div className="container">{this.switchStatus()}</div>
        <div className="">
          <p>HGFHGV</p>
        </div>
      </div>
    )
  }
}

export default Jobs
