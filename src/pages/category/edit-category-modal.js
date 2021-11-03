import React, { Component } from 'react'
import { Modal, Input, Button } from 'antd'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

import { TYPES } from 'app/store/actions'

const schemaValidation = yup.object().shape({
  name: yup.string().required()
})

export default class EditCategoryModal extends Component {
  state = {
    visible: false,
    category: null
  }

  open = (category) => {
    this.setState({
      visible: true,
      category
    })
  }

  close = () => {
    this.setState({
      visible: false
    })
  }

  _onSubmit = (values) => {
    const { createCategory, updateCategory, getCategories } = this.props
    const { category } = this.state

    if (category) {
      updateCategory(values, (action) => {
        if (action === TYPES.UPDATE_CATEGORY_SUCCESS) {
          this.close()
          getCategories()
        }
      })
    } else {
      createCategory(values, (action) => {
        if (action === TYPES.CREATE_CATEGORY_SUCCESS) {
          this.close()
          getCategories()
        }
      })
    }
  }

  render() {
    const { categoriesStore } = this.props
    const { category } = this.state

    const initialValues = {
      ...category
    } || {}

    return (
      <Modal
        footer={false}
        title={category ? 'Update category' : 'Create category'}
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
              <Button
                onClick={props.handleSubmit}
                className="button-login"
                loading={categoriesStore.submitting === TYPES.CREATE_CATEGORY_REQUEST}
                type="primary"
              >
                {category ? 'Update' : 'Create'}
              </Button>
            </form>
          )}
        />
      </Modal>
    )
  }
}
