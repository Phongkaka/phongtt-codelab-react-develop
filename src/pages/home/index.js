import React, { Component } from 'react'
import { StickyContainer } from 'react-sticky'
import './style.scss'

import { Container, FitHeightContainer, Page } from 'app/components'

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component {
  render() {
    return (
      <Page className="home">
        <FitHeightContainer hasHeader>
          <Container>
            <h2>Home</h2>
            <StickyContainer />
          </Container>
        </FitHeightContainer>
      </Page>
    )
  }
}

export default Home
