import './display.css'
import {Link, withRouter} from 'react-router-dom'
import {MdLocationOn, MdWork} from 'react-icons/md'

const DisplayDetails = props => {
  const {list, idd} = props
  const {
    employmentType,
    title,
    rating,
    packagePerAnnum,
    location,
    companyLogoUrl,
    jobDescription,
  } = list

  return (
    <Link to={`/jobs/${idd}`}>
      <div className="brownBg">
        <div className="flexRow">
          <img src={companyLogoUrl} alt={title} className="logoImgSize" />
          <div>
            <h1 className="heading">{title}</h1>
            <div className="rating">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                alt=""
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
        <h1 className="heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default withRouter(DisplayDetails)
