import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > * {
    width: 100%;
  }

  &.has-header {
    height: calc(100vh - 67px);
  }
`

export default ({ children, hasHeader }) => (
  <Container className={classNames(hasHeader && 'has-header')}>
    {children}
  </Container>
)
