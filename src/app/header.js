import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import Storage from 'app/utils/storage'
import { Images } from 'app/theme'

import './style.scss'

const HeaderContainer = styled.header`
  
`
const Logo = styled.img`
    display: inline-block;
    width: 74px;
  }
`

class Header extends Component {
  constructor(props) {
    super(props)
    this._isAdmin = Storage.get('IS_ADMIN')
  }

  _onLogout = () => {
    const { history } = this.props

    Storage.remove('ACCESS_TOKEN')
    history.push('/login')
  }

  render() {
    const isAdmin = this._isAdmin
    const { history } = this.props

    return (
      <HeaderContainer>
        <div className="top-header">
          <Logo src={Images.LOGO_IMAGE} alt="Logo BAP" />
          <div className="right-head">
            <Button
              onClick={() => {
                history.push('/profile')
              }}
              className="name-user"
            >Profile
            </Button>
            <Button type="primary" shape="circle" onClick={this._onLogout}>
              <Icon type="logout" />
            </Button>
          </div>
        </div>
        <nav className="link-to-page">
          <ul>
            {isAdmin ? (
              <>
              <li>
                <Icon className="icons-link" type="schedule" />
                <Link to="/schedules" className="head-item">Schedules</Link>
              </li>
              <li>
                <Icon className="icons-link" type="solution" />
                <Link to="/topics" className="head-item">Topics</Link>
              </li>
              <li>
                <Icon className="icons-link" type="user" />
                <Link to="/admin/users" className="head-item">Users</Link>
              </li>
              <li>
                <Icon className="icons-link" type="snippets" />
                <Link to="/admin/Category" className="head-item">Category</Link>
              </li>
              </>
            ) : (
              <>
              <li>
                <Icon className="icons-link" type="user" />
                <Link to="/" className="head-item">Home</Link>
              </li>
              <li>
                <Icon className="icons-link" type="schedule" />
                <Link to="/schedules" className="head-item">Schedules</Link>
              </li>
              <li>
                <Icon className="icons-link" type="solution" />
                <Link to="/topics" className="head-item">Topics</Link>
              </li>
              </>
            )}
          </ul>
        </nav>
      </HeaderContainer>
    )
  }
}

export default withRouter(Header)
