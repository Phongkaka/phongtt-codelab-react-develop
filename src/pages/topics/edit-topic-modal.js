import React, { Component } from 'react'
import { Modal, Input, Button, Select } from 'antd'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

import { TYPES } from 'app/store/actions'

const { Option } = Select

const schemaValidation = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  // categories: yup.number().required(),
  type: yup.number().required()
})

export default class EditTopicModal extends Component {
  state = {
    visible: false,
    topic: null
  }

  open = (topic) => {
    this.setState({
      visible: true,
      topic
    })
  }

  close = () => {
    this.setState({
      visible: false
    })
  }

  _onSubmit = (values) => {
    const { createTopic, updateTopic, getTopics, currentTab } = this.props
    const { topic } = this.state
    values = {
      ...values,
      categories: values.categories.map(item => ({ id: item }))
    }
    if (topic) {
      updateTopic(values, (action) => {
        if (action === TYPES.UPDATE_TOPIC_SUCCESS) {
          this.close()
          if (currentTab === '1') {
            getTopics({
              status: 0
            })
          } else {
            getTopics({
              status: 1
            })
          }
        }
      })
    } else {
      createTopic(values, (action) => {
        if (action === TYPES.CREATE_TOPIC_SUCCESS) {
          this.close()
          if (currentTab === '1') {
            getTopics({
              status: 0
            })
          } else {
            getTopics({
              status: 1
            })
          }
        }
      })
    }
  }

  render() {
    const { topicsStore, categoriesStore } = this.props

    const { topic } = this.state

    const initialValues = {
      ...topic,
      categories: topic?.categories.map(item => item.id)
    } || {}

    return (
      <Modal
        footer={false}
        title={topic ? 'Update topic' : 'Create topic'}
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
                <p className="label">Tiêu đề</p>
                <Field
                  name="title"
                  render={({ field, form }) => (
                    <div>
                      <Input {...field} />
                      <p className="error-message">{form.errors.title}</p>
                    </div>
                  )}
                />
              </div>
              <div className="field">
                <p className="label">Mô tả</p>
                <Field
                  name="description"
                  render={({ field, form }) => (
                    <div>
                      <textarea placeholder="Mô tả topic" {...field} />
                      <p className="error-message">{form.errors.description}</p>
                    </div>
                  )}
                />
              </div>
              <div className="field">
                <p className="label">Trạng thái đăng ký</p>
                <Field
                  name="type"
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
                        <Option value={0}>Joinner</Option>
                        <Option value={1}>Speaker</Option>
                      </Select>
                      <p className="error-message">{form.errors.type}</p>
                    </div>
                  )}
                />
              </div>
              <Field
                name="categories"
                render={({ field }) => (
                    <div>
                      <Select
                        mode="multiple"
                        value={field.value}
                        onChange={(value) => {
                          field.onChange({ target: { value, name: field.name } })
                        }}
                        onBlur={(value) => {
                          field.onBlur({ target: { value, name: field.name } })
                        }}
                      >
                        {categoriesStore.categories.map(item => (
                          <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        ))}
                      </Select>
                    </div>
                )}
              />
              <Button
                onClick={props.handleSubmit}
                className="button-login"
                loading={topicsStore.submitting === TYPES.CREATE_TOPIC_REQUEST}
                type="primary"
              >
                {topic ? 'Update' : 'Create'}
              </Button>
            </form>
          )}
        />
      </Modal>
    )
  }
}
