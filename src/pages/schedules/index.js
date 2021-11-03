import React, { Component } from 'react'
import { Table, Button, Popconfirm, Pagination, Icon, Divider } from 'antd'
import { Container, FitHeightContainer, Page } from 'app/components'
import moment from 'moment'

import './style.scss'

import { connect } from 'react-redux'
import { actions } from 'app/store/actions'
import Storage from 'app/utils/storage'

import EditScheduleModal from './edit-schedule-modal'


const PAGE_SIZE = 5
const displayDateFormat = 'HH:mm DD/MM/YYYY'
const convertDateFormat = 'YYYY-MM-DD HH:mm:ss'

@connect(state => ({
  schedulesStore: state.schedules,
  topicsStore: state.topics
}), {
  getSchedules: actions.getSchedules,
  createSchedule: actions.createSchedule,
  updateSchedule: actions.updateSchedule,
  deleteSchedule: actions.deleteSchedule,
  getAllTopics: actions.getAllTopics
})

class Schedules extends Component {
  constructor(props) {
    super(props)
    this._isAdmin = Storage.get('IS_ADMIN')
  }

  componentDidMount() {
    const { getSchedules, getAllTopics } = this.props
    getSchedules({
      page: 1,
      pageSize: PAGE_SIZE
    })
    getAllTopics({
      status: 1
    })
  }

  _onPageChange = (page) => {
    this.props.getSchedules({
      page,
      pageSize: PAGE_SIZE
    })
  }

  _onDeleteSchedule = (schedule) => {
    this.props.deleteSchedule(schedule)
    this.props.getSchedules({
      page: 1,
      pageSize: PAGE_SIZE
    })
  }

  render() {
    const { schedulesStore, createSchedule, updateSchedule, getSchedules, topicsStore } = this.props
    const isAdmin = this._isAdmin
    const columns = [{
      title: 'Name Speaker',
      dataIndex: 'speakerName',
      key: 'speakerName',
      align: 'center'
    }, {
      title: 'topic',
      dataIndex: 'topicId',
      key: 'topicId',
      align: 'center',
      render: (row, record) => (
        <div>{record.topic?.title}</div>
      )
    }, {
    }, {
      title: 'time start',
      dataIndex: 'timeStart',
      key: 'timeStart',
      align: 'center',
      render: (row, record) => (
        <div>{moment(record.timeStart, convertDateFormat).format(displayDateFormat)}</div>
      )
    }, {
    }, {
      title: 'time finish',
      dataIndex: 'timeFinish',
      key: 'timeFinish',
      render: (row, record) => (
        <div>{moment(record.timeFinish, convertDateFormat).format(displayDateFormat)}</div>
      )
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (row, record) => (
        <div>
          {isAdmin ? (
            <>
            <Button
              onClick={() => this.props.history.push(`/schedules-details/${record.id}`)
              }
            >
              <Icon type="eye" theme="twoTone" twoToneColor="green" />
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={() => this._editScheduleModal.open(record)}
            >
              <Icon type="edit" theme="twoTone" />
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title="Bạn có chắc xóa schedule này?"
              onConfirm={() => this._onDeleteSchedule(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                onClick={this._}
              >
                <Icon type="delete" theme="twoTone" twoToneColor="red" />
              </Button>
            </Popconfirm>
            </>
          ) : (
            <>
            <Button
              onClick={() => this.props.history.push(`/schedules-details/${record.id}`)
              }
            >
              <Icon type="eye" theme="twoTone" twoToneColor="green" />
            </Button>
            </>
          )}
        </div>
      )
    }]

    return (
      <Page className="page page-schedule">
        <FitHeightContainer hasHeader>
          <Container>
            {isAdmin ? (
              <>
              <button
                className="btn-animation add-btn"
                onClick={() => this._editScheduleModal.open()}
              >
                Add schedule
              </button>
              </>
            ) : (
              <>
                <h1>Schedules</h1>
              </>
            )}
            <Table
              pagination={false}
              rowKey={(row, index) => index}
              columns={columns}
              dataSource={schedulesStore.schedules.content}
            />
            <Pagination
              defaultCurrent={1}
              pageSize={PAGE_SIZE}
              total={schedulesStore.schedules.totalElements}
              onChange={this._onPageChange}
            />
            <EditScheduleModal
              getSchedules={getSchedules}
              schedulesStore={schedulesStore}
              createSchedule={createSchedule}
              updateSchedule={updateSchedule}
              topicsStore={topicsStore}
              ref={(ref) => { this._editScheduleModal = ref }}
            />
          </Container>
        </FitHeightContainer>
      </Page>
    )
  }
}

export default Schedules
