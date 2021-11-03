import React, { Component } from 'react'
import styled from 'styled-components'

import { Media } from 'app/theme'

const Div = styled.div`
  max-width: 1140px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;

  ${Media.lessThan('xl')`
    max-width: 960px;
  `}
  ${Media.lessThan('lg')`
    max-width: 720px;
  `}
  ${Media.lessThan('md')`
    max-width: 540px;
  `}
  ${Media.lessThan('sm')`
    max-width: initial;
  `}
`
const Content = styled.div`
  width: 100%;
  border-radius: 5px;
  margin: 15px 0;
`

class Container extends Component {
  static Content = Content

  render() {
    const { children, ...props } = this.props

    return (
      <Div {...props}>{ children }</Div>
    )
  }
}

export default Container
