import React, { Component } from 'react'
import { Modal, Button, Input, Icon } from 'antd'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import './style.scss'

import { TYPES } from 'app/store/actions'

const schemaValidation = yup.object().shape({
  oldPassword: yup.string().required(),
  newPassword: yup.string().required(),
  confirmedPassword: yup.string().required()
})


class ChangePasswordModal extends Component {
  state = {
    visible: false
  }

  open = () => {
    this.setState({
      visible: true
    })
  }

  close = () => {
    this.setState({
      visible: false
    })
  }

  _onChangePassword = (values) => {
    const { changePassword } = this.props
    changePassword(values, (action) => {
      if (action === TYPES.CHANGE_PASSWORD_SUCCESS) {
        this.close()
      }
    })
  }

  render() {
    const { profileStore } = this.props
    return (
      <div className="change-password-modal">
        <Modal
          footer={false}
          title="Đổi mật khẩu"
          visible={this.state.visible}
          onCancel={this.close}
        >
          <Formik
            enableReinitialize
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={schemaValidation}
            onSubmit={this._onChangePassword}
            render={props => (
              <form className="form" onSubmit={props.handleSubmit}>
                <div className="field">
                  <p className="label">Mật khẩu cũ</p>
                  <div className="change-model">
                    <Icon className="icons-input" type="unlock" />
                    <Field
                      name="oldPassword"
                      render={({ field, form }) => (
                        <div className="wrp-input">
                          <Input id="oldPass" name="oldPass" type="password" {...field} />
                          <p className="error-message">{form.errors.oldPassword}</p>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="field">
                  <p className="label">Mật khẩu mới</p>
                  <div className="change-model">
                    <Icon className="icons-input" type="lock" />
                    <Field
                      name="newPassword"
                      render={({ field, form }) => (
                        <div className="wrp-input">
                          <Input id="newPassword" name="newPassword" type="password" {...field} />
                          <p className="error-message">{form.errors.newPassword}</p>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="field">
                  <p className="label">Xác nhận mật khẩu</p>
                  <div className="change-model">
                    <Icon className="icons-input" type="key" />
                    <Field
                      name="confirmedPassword"
                      render={({ field, form }) => (
                        <div className="wrp-input">
                          <Input id="confirmedPassword" name="confirmedPassword" type="password" {...field} />
                          <p className="error-message">{form.errors.confirmedPassword}</p>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <Button
                  onClick={props.handleSubmit}
                  loading={profileStore.submitting === TYPES.CHANGE_PASSWORD_REQUEST}
                  type=""
                >
                  Xác nhận
                </Button>
              </form>
            )}
          />
        </Modal>
      </div>
    )
  }
}

export default ChangePasswordModal
