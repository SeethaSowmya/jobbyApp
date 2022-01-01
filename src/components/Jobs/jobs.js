import {Component} from 'react'
import Cookies from 'js-cookie'

class Jobs extends Component {
  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwt = Cookies.get('jwt_token')
    console.log(jwt)
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.data
    console.log(response)

  }

  render() {
    return (
      <div className="container">
        <div className="leftContainer" />
        <div className="RightContainer" />
      </div>
    )
  }
}

export default Jobs
