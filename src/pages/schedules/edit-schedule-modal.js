import React, { Component } from 'react'
import { Modal, Input, Button, Select, DatePicker } from 'antd'
import { Formik, Field } from 'formik'
import moment from 'moment'
import * as yup from 'yup'
import { TYPES } from 'app/store/actions'

const schemaValidation = yup.object().shape({
  speakerName: yup.string().required(),
  timeStart: yup.date().required(),
  timeFinish: yup.date().required(),
  topicId: yup.number().required()
})

export default class EditScheduleModal extends Component {
  state = {
    visible: false,
    schedule: null,
    endOpen: false
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  }

  open = (schedule) => {
    this.setState({
      visible: true,
      schedule
    })
  }

  close = () => {
    this.setState({
      visible: false
    })
  }

  _onSubmit = (values) => {
    const { createSchedule, updateSchedule, getSchedules } = this.props
    const { schedule } = this.state
    values = {
      ...values,
      timeStart: moment(values.timeStart).format('YYYY-MM-DD HH:mm:ss'),
      timeFinish: moment(values.timeFinish).format('YYYY-MM-DD HH:mm:ss')
    }
    if (schedule) {
      updateSchedule(values, (action) => {
        if (action === TYPES.UPDATE_SCHEDULE_SUCCESS) {
          this.close()
          getSchedules()
        }
      })
    } else {
      createSchedule(values, (action) => {
        if (action === TYPES.CREATE_SCHEDULE_SUCCESS) {
          this.close()
          getSchedules()
        }
      })
    }
  }

  render() {
    const { topicsStore, schedulesStore } = this.props
    const { endOpen, schedule } = this.state

    const initialValues = {
      ...schedule,
      topicId: schedule?.topic.id
    } || {}

    return (
      <Modal
        footer={false}
        title={schedule ? 'Update schedule' : 'Create schedule'}
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
              <div className="field-schedule">
                <p className="label">Speaker</p>
                <Field
                  name="speakerName"
                  render={({ field, form }) => (
                    <div>
                      <Input {...field} />
                      <p className="error-message">{form.errors.speakerName}</p>
                    </div>
                  )}
                />
              </div>
              <div className="field-schedule">
                <p className="label">Thời gian bắt đầu</p>
                <Field
                  name="timeStart"
                  render={({ field, form }) => (
                      <div>
                        <DatePicker
                          value={field.value && moment(field.value)}
                          showTime
                          onChange={(value) => {
                            field.onChange({ target: { value, name: field.name } })
                          }}
                          onBlur={(value) => {
                            field.onBlur({ target: { value, name: field.name } })
                          }}
                          placeholder="Start"
                          onOpenChange={this.handleStartOpenChange}
                        />
                      <p className="error-message">{form.errors.timeStart}</p>
                      </div>
                  )}
                />
              </div>
              <div className="field-schedule">
                <p className="label">Thời gian kết thúc</p>
                <Field
                  name="timeFinish"
                  render={({ field, form }) => (
                    <div>
                      <DatePicker
                        value={field.value && moment(field.value)}
                        showTime
                        placeholder="End"
                        onChange={(value) => {
                          field.onChange({ target: { value, name: field.name } })
                        }}
                        onBlur={(value) => {
                          field.onBlur({ target: { value, name: field.name } })
                        }}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                      />
                      <p className="error-message">{form.errors.timeFinish}</p>
                    </div>
                  )}
                />
              </div>
              <div className="field-schedule">
                <p className="label">Topics</p>
                <Field
                  name="topicId"
                  render={({ field, form }) => (
                      <div>
                        <Select
                          value={field.value}
                          onChange={(value) => {
                            field.onChange({ target: { value, name: field.name } })
                          }}
                          onBlur={(value) => {
                            field.onBlur({ target: { value, name: field.name } })
                          }}
                        >
                          {topicsStore.topics.map(item => (
                            <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                          ))}
                        </Select>
                        <p className="error-message">{form.errors.topicId}</p>
                      </div>
                  )}
                />
              </div>
              <Button
                onClick={props.handleSubmit}
                className="button-login"
                loading={schedulesStore.submitting === TYPES.CREATE_TOPIC_REQUEST}
                type="primary"
              >
                {schedule ? 'Update' : 'Create'}
              </Button>
            </form>
          )}
        />
      </Modal>
    )
  }
}
