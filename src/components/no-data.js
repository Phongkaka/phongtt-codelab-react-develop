import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Icon = styled.div`
  background-color: #292929;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: #ffd713;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 7px;
`
const Text = styled.p`

`

export default ({ text }) => (
    <Container>
      <Icon>!</Icon>
      <Text>{text || 'No data'}</Text>
    </Container>
)
