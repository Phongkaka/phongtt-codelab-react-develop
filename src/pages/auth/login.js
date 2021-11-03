import React, { Component } from 'react'
import { Input, Button, message, Icon } from 'antd'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import './style.scss'
import styled from 'styled-components'

import { Container, FitHeightContainer, Page } from 'app/components'
import Storage from 'app/utils/storage'
import { login } from 'app/api/auth'
import { Images } from 'app/theme'

const Logo = styled.img`
  display: block;
  width: 150px;
  margin: 0 auto;
`

const schemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

class Login extends Component {
  state = {
    isLoading: false
  }

  componentDidMount() {
    document.title = 'Seminar - Login'
  }

  _onSubmit = async (values) => {
    try {
      this.setState({
        isLoading: true
      })

      const result = await login(values)
      this.setState({
        isLoading: false
      })

      if (result.token != null) {
        const { history } = this.props
        Storage.set('ACCESS_TOKEN', `${result.type} ${result.token}`)
        Storage.set('IS_ADMIN', result.role === 1)

        history.push(result.role === 1 ? '/admin' : '/')
      }
    } catch {
      message.error('Email hoặc password không đúng!')
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    const { isLoading } = this.state

    return (
      <Page className="login">
        <FitHeightContainer>
          <Container>
            <Formik
              validationSchema={schemaValidation}
              onSubmit={this._onSubmit}
              render={props => (
                <form className="form" onSubmit={props.handleSubmit}>
                  <Logo src={Images.LOGO_IMAGE} />
                  <h1>Seminar Managerment</h1>
                  <div className="field">
                    <Field
                      name="email"
                      render={({ field, form }) => (
                        <div className="main-field">
                          <p className="label">Email</p>
                          <div className="wrp-input">
                            <Icon className="icons-input" type="user" />
                            <Input {...field} />
                          </div>
                          <p className="error-message">{form.errors.email}</p>
                        </div>
                      )}
                    />
                  </div>
                  <div className="field">
                    <Field
                      name="password"
                      render={({ field, form }) => (
                        <div className="main-field">
                          <p className="label">Password</p>
                          <div className="wrp-input">
                            <Icon className="icons-input" type="key" />
                            <Input type="password" {...field} />
                          </div>
                          <p className="error-message">{form.errors.password}</p>
                        </div>
                      )}
                    />
                  </div>
                  <Button
                    onClick={props.handleSubmit}
                    className="button-login"
                    type="primary"
                    loading={isLoading}
                  >
                    Login
                  </Button>
                </form>
              )}
            />
          </Container>
        </FitHeightContainer>
      </Page>
    )
  }
}

export default Login
