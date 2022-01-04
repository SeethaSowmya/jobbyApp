import './Jobdetails.css'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {Component} from 'react'
import Cookies from 'js-cookie'

class JobDetailsDisplay extends Component {
  state = {details: []}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const jwt = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const apiUrlT =
      'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000'

    const responseT = await fetch(apiUrlT, options)
    const dataT = await responseT.json()
    console.log(dataT)
    if (responseT.ok === true) {
      console.log(dataT, '///')
      dataT.jobs.map(each => console.log(each))
      const update = dataT.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(update.location)
      this.setState({details: update})
    
  }

  render() {
    const {details} = this.state
    const {
      employmentType,
      title,
      rating,
      packagePerAnnum,
      location,
      companyLogoUrl,
      jobDescription,
    } = details
    return (
      <div className="brownBg">
        <div>
          <img src={companyLogoUrl} alt={title} />
          <div>
            <h1>{title}</h1>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                alt=""
              />
              <p>{rating}</p>
            </div>
          </div>
          <div>
            <div>
              <MdLocationOn />
              <p>{location}</p>
              <MdWork />
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </div>
    )
  }
}
export default JobDetailsDisplay
