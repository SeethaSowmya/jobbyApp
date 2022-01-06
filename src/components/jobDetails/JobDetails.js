import {Component} from 'react'
import Cookies from 'js-cookie'

import './JobDetails.css'
import DisplayDetails from '../Display/display'

class JobDetails extends Component {
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
      'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search='

    const responseT = await fetch(apiUrlT, options)
    const dataT = await responseT.json()
    console.log(dataT)
    if (responseT.ok === true) {
      console.log(dataT, '///')
      dataT.jobs.map(each => console.log(each.employment_type))
      dataT.jobs.map(each => console.log(each.package_per_annum))
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
      console.log(update[0].employmentType)
      this.setState({details: update})
    }
  }

  render() {
    const {details} = this.state
    return (
      <>
        {details.map(each => (
          <DisplayDetails list={each} key={each.id} />
        ))}
      </>
    )
  }
}
export default JobDetails
