import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from 'app/components'

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #292929;
  padding: 30px 0;
`
const Logo = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 39px;

  .icon-circle-logo {
    font-size: 55px;
    margin-bottom: 10px;
  }

  .icon-text-logo {
    font-size: 8.5px;
  }
`
const CopyrightBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .icon-company-logo {
    font-size: 20px;
  }

  .text {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    margin-bottom: 0;
  }
`
const NavigationBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: 48px;

  a {
    color: white;
  }
`

@connect(state => ({
  routerStore: state.router
}))

class Footer extends Component {
  render() {
    const { navigation } = this.props

    return (
      <FooterContainer>
        <Container className="container">
          <Logo>
            <span className="icon-circle-logo" />
            <span className="icon-text-logo" />
          </Logo>
          {navigation && (
            <NavigationBox>
              <Link to="/">
                MAIN
              </Link>
              <Link to="/history">
                ACTIVITY
              </Link>
              <Link to="/ranking">
                RANKING
              </Link>
            </NavigationBox>
          )}
          <CopyrightBox>
            <span className="icon-company-logo">
              <span className="path1" />
              <span className="path2" />
              <span className="path3" />
              <span className="path4" />
              <span className="path5" />
              <span className="path6" />
              <span className="path7" />
              <span className="path8" />
              <span className="path9" />
              <span className="path10" />
              <span className="path11" />
              <span className="path12" />
              <span className="path13" />
              <span className="path14" />
            </span>
            <p className="text">©2018 NatsumeAtari Inc</p>
          </CopyrightBox>
        </Container>
      </FooterContainer>
    )
  }
}

export default Footer
