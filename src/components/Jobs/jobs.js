import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header/header'
import JobDetails from '../jobDetails/JobDetails'

import './jobs.css'

const apiStatusContainer = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const salaryRangesList = [
  {
    label: '10LPA and above',
    salaryRangeId: '10LPA AND ABOVE',
  },
  {
    label: '20LPA and above',
    salaryRangeId: '20LPA AND ABOVE',
  },
  {
    label: '30LPA and above',
    salaryRangeId: '30LPA AND ABOVE',
  },
  {
    label: '40LPA and above',
    salaryRangeId: '40LPA AND ABOVE',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

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
    typeOfEmployment: [],
    salaryRange: [],
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

  checkStatusEmployment = event => {
    const {typeOfEmployment} = this.state
    const stat = typeOfEmployment.map(
      each => each.employmentTypeId === event.target.id,
    )
    console.log(stat === [])

    if (stat === []) {
      let update = []
      update = typeOfEmployment.filter(
        obj => obj.employmentTypeId !== event.target.id,
      )
      console.log(update, 'removed')
      this.setState({typeOfEmployment: update})
    } else {
      let upToDate = []

      upToDate = employmentTypesList.find(
        random => random.employmentTypeId === event.target.id,
      )
      typeOfEmployment.map(item => upToDate.push(item))
      console.log(upToDate, 'updated')

      this.setState({typeOfEmployment: upToDate})
    }
  }

  checkStatusSalary = event => {
    const {salaryRange} = this.state
    const status = salaryRange.includes(event.target.id)
    if (status) {
      let update = []
      update = salaryRange.filter(each => each !== event.target.id)
      console.log(update, 'updated')
      this.setState({salaryRange: update})
    } else {
      salaryRange.push(event.target.id)
    }
    console.log(salaryRange)
  }

  onSuccessView = () => {
    const {profileDetails} = this.state
    const {name, imgUrl, shortBio} = profileDetails
    return (
      <div>
        <div className="profileData">
          <img src={imgUrl} alt="profilePic" className="profilePic" />
          <h1 className="headingName">{name}</h1>
          <p className="paraOfBio">{shortBio}</p>
        </div>
        <hr />
        <div>
          <h1 className="whiteHead">Type of Employment</h1>
          {employmentTypesList.map(each => (
            <div>
              <input
                onChange={this.checkStatusEmployment}
                type="checkBox"
                id={each.employmentTypeId}
              />
              <label className="whiteHead" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h1 className="whiteHead">Salary Range</h1>
          {salaryRangesList.map(eachItem => (
            <div>
              <input
                type="checkBox"
                onChange={this.checkStatusSalary}
                id={eachItem.salaryRangeId}
              />
              <label className="whiteHead" htmlFor={eachItem.salaryRangeId}>
                {eachItem.label}
              </label>
            </div>
          ))}
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
        <div className="container">
          <div className="leftContainer">{this.switchStatus()}</div>
          <div className="rightContainer">
            <JobDetails />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
