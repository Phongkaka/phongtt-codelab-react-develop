import React from 'react'
import styled from 'styled-components'
import { Field, ErrorMessage } from 'formik'

const ErrorText = styled.div`
  height: 20px;
  color: red;
  font-size: 12px;
  padding-top: 2px;
`
const Label = styled.p`
  margin-bottom: 5px;
`

export default ({ component: Component, name, label, ...props }) => {
  label = label && <Label>{label}</Label>

  return (
    <div>
      {label}
      <Field {...props} name={name} component={Component} />
      <ErrorText>
        <ErrorMessage name={name} />
      </ErrorText>
    </div>
  )
}
