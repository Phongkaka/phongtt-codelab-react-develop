import React, { Component } from 'react'
import { Modal, Input, Button, Select } from 'antd'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

import { TYPES } from 'app/store/actions'

const { Option } = Select

const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  role: yup.string().required()
})

export default class EditUserModal extends Component {
  state = {
    visible: false,
    user: null
  }

  open = (user) => {
    this.setState({
      visible: true,
      user
    })
  }

  close = () => {
    this.setState({
      visible: false
    })
  }

  _onSubmit = (values) => {
    const { createUser, updateUser, getUsers } = this.props
    const { user } = this.state

    if (user) {
      updateUser(values, (action) => {
        if (action === TYPES.UPDATE_USER_SUCCESS) {
          this.close()
          getUsers()
        }
      })
    } else {
      createUser(values, (action) => {
        if (action === TYPES.CREATE_USER_SUCCESS) {
          this.close()
          getUsers()
        }
      })
    }
  }

  render() {
    const { usersStore } = this.props
    const { user } = this.state

    const initialValues = {
      ...user,
      password: ''
    } || {}

    return (
      <Modal
        footer={false}
        title={user ? 'Update user' : 'Create user'}
        visible={this.state.visible}
        onCancel={this.close}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={schemaValidation}
          onSubmit={this._onSubmit}
          render={props => (
            <form className="form" onSubmit={props.handleSubmit}>
              <div className="field">
                <p className="label">Name</p>
                <Field
                  name="name"
                  render={({ field, form }) => (
                    <div>
                      <Input {...field} />
                      <p className="error-message">{form.errors.name}</p>
                    </div>
                  )}
                />
              </div>
              <div className="field">
                <p className="label">Email</p>
                <Field
                  name="email"
                  render={({ field, form }) => (
                    <div>
                      <Input {...field} />
                      <p className="error-message">{form.errors.email}</p>
                    </div>
                  )}
                />
              </div>
              <div className="field">
                <p className="label">Password</p>
                <Field
                  name="password"
                  render={({ field, form }) => (
                    <div>
                      <Input {...field} type="password" />
                      <p className="error-message">{form.errors.password}</p>
                    </div>
                  )}
                />
              </div>
              <div className="field">
                <p className="label">Role</p>
                <Field
                  name="role"
                  render={({ field, form }) => (
                    <div>
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
                      <p className="error-message">{form.errors.role}</p>
                    </div>
                  )}
                />
              </div>
              <Button
                onClick={props.handleSubmit}
                className="btn-edit-user"
                loading={usersStore.submitting === TYPES.CREATE_USER_REQUEST}
                type="primary"
              >
                {user ? 'Update' : 'Create'}
              </Button>
            </form>
          )}
        />
      </Modal>
    )
  }
}
