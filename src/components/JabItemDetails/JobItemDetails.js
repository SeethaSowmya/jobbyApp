import './JobItemDetails.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn, MdWork} from 'react-icons/md'
import Loader from 'react-loader-spinner'

const apiStatusContainer = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    lastData: [],
    lifeCompanyListDetails: [],
    skillsListDetails: [],
    similarJobsListDetails: [],
    status: apiStatusContainer.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  onFailureViewTwo = () => (
    <div className="failurePage">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="whiteHeading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  loaderCode = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  skill = () => {
    const {skillsListDetails} = this.state
    return (
      <ul className="skillContainer">
        {skillsListDetails.map(each => (
          <li id={`${each.skillsName}`} className="skillSubContainer">
            <img
              src={each.skillsImageUrl}
              alt={`${each.skillsName}`}
              className="skillImage"
            />
            <h1 className="subHead">{each.skillsName}</h1>
          </li>
        ))}
      </ul>
    )
  }

  company = () => {
    const {lifeCompanyListDetails} = this.state

    return (
      <div className="companyContainer">
        <h1 className="heading">Description</h1>
        <div className="companySubContainer">
          <p>{lifeCompanyListDetails.description}</p>
          <img
            src={lifeCompanyListDetails.imageUrl}
            alt="description"
            className="companyImg"
          />
        </div>
      </div>
    )
  }

  view = () => {
    const {lastData, similarJobsListDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      title,
      location,
      rating,
      companyWebsiteUrl,
      packagePerAnnum,
    } = lastData
    return (
      <div className="blackContainer">
        <div className="brownBg">
          <div className="flexRow">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logoImgSize"
            />
            <div>
              <h1 className="heading">{title}</h1>
              <div className="rating">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                  alt="job details company logo"
                  className="ratingImg"
                />
                <p className="para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="middlePart flexRow">
            <div className="flexRow ">
              <MdLocationOn />
              <p className="para">{location}</p>
              <MdWork />
              <p className="para">{employmentType}</p>
            </div>
            <p className="para package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <h1 className="heading">Life at Company</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              alt="life at company"
              rel="noreferrer"
            >
              Visit
            </a>
          </div>
          <p className="description">{jobDescription}</p>

          <h1 className="heading">Skills</h1>
          {this.skill()}
          {this.company()}
        </div>
        <h1 className="heading">Similar Jobs</h1>

        <ul className="bg">
          {similarJobsListDetails.map(each => (
            <li id={`${each.title}`} className="brownBg2">
              <div className="flexRow">
                <img
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                  className="logoImgSize"
                />
                <div>
                  <h1 className="heading">{each.title}</h1>
                  <div className="rating">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                      alt=""
                      className="ratingImg"
                    />
                    <p className="para">{each.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="heading">Description</h1>
              <p className="description">{each.jobDescription}</p>
              <div className="flexRow ">
                <MdLocationOn />
                <p className="para">{location}</p>
                <MdWork />
                <p className="para">{employmentType}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getProfile = async () => {
    this.setState({status: apiStatusContainer.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updateTheData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        similarJobs: data.similar_jobs,
        title: data.job_details.title,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        location: data.job_details.location,
      }
      console.log(data)

      const lifeCompanyList = data.job_details.life_at_company
      const lifeCompanyListDetails = {
        description: lifeCompanyList.description,
        imageUrl: lifeCompanyList.image_url,
      }

      const skillsList = data.job_details.skills
      const skillsListDetails = skillsList.map(each => ({
        skillsImageUrl: each.image_url,
        skillsName: each.name,
      }))

      const similarJobs = data.similar_jobs
      console.log(similarJobs)
      const similarJobsListDetails = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        skillsLocation: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        lastData: updateTheData,
        skillsListDetails,
        lifeCompanyListDetails,
        similarJobsListDetails,
        status: apiStatusContainer.success,
      })
    } else {
      this.setState({status: apiStatusContainer.failure})
    }
  }

  switchStatus = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusContainer.inProgress:
        return this.loaderCode()
      case apiStatusContainer.success:
        return this.view()
      case apiStatusContainer.failure:
        return this.onFailureViewTwo()
      default:
        return null
    }
  }

  render() {
    return this.switchStatus()
  }
}

export default JobItemDetails
