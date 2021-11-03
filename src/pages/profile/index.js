import React, { Component } from 'react'
import { connect } from 'react-redux'
import Storage from 'app/utils/storage'
import { Button, Input, Select } from 'antd'
import { Container, FitHeightContainer, Page } from 'app/components'
import { actions, TYPES } from 'app/store/actions'
import { Formik, Field } from 'formik'

import ChangePasswordModal from './change-password-modal'

const { Option } = Select

@connect(state => ({
  profileStore: state.users
}), {
  getProfile: actions.getProfile,
  updateProfile: actions.updateProfile,
  changePassword: actions.changePassword
})

class Profile extends Component {
  constructor(props) {
    super(props)
    this._isAdmin = Storage.get('IS_ADMIN')
  }

  componentDidMount() {
    this.props.getProfile()
  }

  _onSubmit = (values) => {
    const { updateProfile } = this.props
    updateProfile(values)
  }

  render() {
    const isAdmin = this._isAdmin
    const { profileStore, changePassword } = this.props

    return (
      <Page className="profile-page">
        <FitHeightContainer hasHeader>
          <Container>
            <Formik
              enableReinitialize
              initialValues={profileStore.profile}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={this._onSubmit}
              render={props => (
                <form className="form" onSubmit={props.handleSubmit}>
                  <div className="field">
                    <p className="label">Name</p>
                    <Field
                      name="name"
                      render={({ field }) => (
                        <div>
                          <Input {...field} />
                        </div>
                      )}
                    />
                  </div>
                  <div className="field">
                    <p className="label">Email</p>
                    <Field
                      name="email"
                      render={({ field }) => (
                        <div>
                          {isAdmin ? (
                            <>
                              <Input {...field} />
                            </>
                          ) : (
                            <>
                              <Input {...field} disabled />
                            </>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="field">
                    <p className="label">Role</p>
                    <Field
                      name="role"
                      render={({ field }) => (
                        <div>
                          {isAdmin ? (
                            <>
                              <Select
                                {...field}
                                onChange={(value) => {
                                  field.onChange({ target: { value, name: field.name } })
                                }}
                                onBlur={(value) => {
                                  field.onChange({ target: { value, name: field.name } })
                                }}
                              >
                                <Option value={0}>User</Option>
                                <Option value={1}>Admin</Option>
                              </Select>
                            </>
                          ) : (
                            <Select
                              disabled
                              {...field}
                              onChange={(value) => {
                                field.onChange({ target: { value, name: field.name } })
                              }}
                              onBlur={(value) => {
                                field.onChange({ target: { value, name: field.name } })
                              }}
                            >
                              <Option value={0}>User</Option>
                              <Option value={1}>Admin</Option>
                            </Select>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="btn-group">
                    <Button
                      onClick={props.handleSubmit}
                      type="primary"
                    >
                      Update
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => this._ChangePasswordModal.open()}
                      className="btn-changePassword"
                    >
                      Change Password
                    </Button>
                  </div>
                </form>
              )}
            />
            <ChangePasswordModal
              changePassword={changePassword}
              profileStore={profileStore}
              ref={(ref) => { this._ChangePasswordModal = ref }}
            />
          </Container>
        </FitHeightContainer>
      </Page>
    )
  }
}

export default Profile
