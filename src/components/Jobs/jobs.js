import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FiSearch} from 'react-icons/fi'

import Header from '../Header/header'
import DisplayDetails from '../Display/display'

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
    details: [],
    activeState: '',
    activeStateTwo: '',
    apiStatusTwo: apiStatusContainer.initial,
    userSearchInput: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobDetails()
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

  updateStatus = () => {
    const {typeOfEmployment} = this.state
    const see = typeOfEmployment.map(each => each.employmentTypeId)
    const temp = see.join(',')
    console.log(temp)
    this.setState({activeState: temp}, this.getJobDetails)
  }

  checkStatusEmployment = event => {
    const {typeOfEmployment} = this.state
    const stat = typeOfEmployment.map(
      each => each.employmentTypeId === event.target.id,
    )

    if (stat.includes(true)) {
      let update = []
      update = typeOfEmployment.filter(
        obj => obj.employmentTypeId !== event.target.id,
      )
      this.setState({typeOfEmployment: update}, this.updateStatus)
    } else {
      const upToDate = []

      const see = employmentTypesList.find(
        random => random.employmentTypeId === event.target.id,
      )
      upToDate.push(see)
      typeOfEmployment.map(item => upToDate.push(item))
      this.setState({typeOfEmployment: upToDate}, this.updateStatus)
    }
  }

  values = id => {
    switch (id) {
      case '10LPA AND ABOVE':
        return '1000000'

      case '20LPA AND ABOVE':
        return '2000000'
      case '30LPA AND ABOVE':
        return '3000000'

      case '40LPA AND ABOVE':
        return '4000000'
      default:
        return null
    }
  }

  checkStatusSalary = event => {
    const element = this.values(event.target.id)
    this.setState({activeStateTwo: element}, this.getJobDetails)
  }

  getJobDetails = async () => {
    // const jwt = Cookies.get('jwt_token')
    const {activeState, activeStateTwo, userSearchInput} = this.state
    console.log(activeStateTwo)
    const optionsTwo = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const apiUrlT = `https://apis.ccbp.in/jobs?employment_type=${activeState}&minimum_package=${activeStateTwo}&search=${userSearchInput}`

    const responseT = await fetch(apiUrlT, optionsTwo)
    const dataT = await responseT.json()
    console.log(dataT)
    if (responseT.ok === true) {
      const update = dataT.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        apiStatusTwo: apiStatusContainer.success,
        details: update,
      })
    } else {
      this.setState({apiStatusTwo: apiStatusContainer.failure})
    }
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
        <ul className="unOrderList">
          <h1 className="whiteHead">Type of Employment</h1>
          {employmentTypesList.map(each => (
            <li>
              <input
                onChange={this.checkStatusEmployment}
                type="checkBox"
                id={each.employmentTypeId}
              />
              <label className="whiteHead" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <div>
          <h1 className="whiteHead">Salary Range</h1>
          <ul className="unOrderList">
            {salaryRangesList.map(eachItem => (
              <li>
                <input
                  type="radio"
                  name="salary"
                  onChange={this.checkStatusSalary}
                  id={eachItem.salaryRangeId}
                />
                <label className="whiteHead" htmlFor={eachItem.salaryRangeId}>
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onFailureView = () => (
    <div className="failurePage">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="whiteHeading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      {this.retryButton()}
    </div>
  )

  loaderCode = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryButton = () => {
    console.log('retry  called')
    return (
      <button type="button" className="retry" onClick={this.getProfile}>
        Retry
      </button>
    )
  }

  switchStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContainer.inProgress:
        return this.loaderCode()
      case apiStatusContainer.success:
        return this.onSuccessView()
      case apiStatusContainer.failure:
        return this.retryButton()
      default:
        return null
    }
  }

  onChangeSearch = event => {
    this.setState({userSearchInput: event.target.value})
  }

  onClickingSearch = () => {
    this.getJobDetails()
  }

  onSuccessViewTwo = () => {
    const {details, userSearchInput} = this.state
    let statusOfDetails
    console.log(details, 'details')
    if (details.length === 0) {
      statusOfDetails = true
    } else {
      statusOfDetails = false
    }
    return (
      <>
        <div>
          <input
            placeholder="Search"
            className="searchElement"
            value={userSearchInput}
            type="search"
            onChange={this.onChangeSearch}
          />
          <button
            type="button"
            testid="searchButton"
            onClick={this.onClickingSearch}
          >
            <FiSearch />
          </button>
        </div>
        {!statusOfDetails &&
          details.map(each => (
            <DisplayDetails list={each} key={each.id} idd={each.id} />
          ))}
        {statusOfDetails && (
          <div className="failurePage">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="heading">No Jobs Found</h1>
            <p className="para">We could not find any jobs.Try other filters</p>
          </div>
        )}
      </>
    )
  }

  switchStatusTwo = () => {
    const {apiStatusTwo} = this.state
    switch (apiStatusTwo) {
      case apiStatusContainer.inProgress:
        return this.loaderCode()
      case apiStatusContainer.success:
        return this.onSuccessViewTwo()
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
          <div className="rightContainer">{this.switchStatusTwo()}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
