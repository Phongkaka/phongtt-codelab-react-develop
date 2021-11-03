import React, { Component } from 'react'
import { Button, Icon, Rate, message, Pagination, Table } from 'antd'
import { Container, FitHeightContainer, Page } from 'app/components'
import moment from 'moment'
import { Images } from 'app/theme'
import { connect } from 'react-redux'
import { actions, TYPES } from 'app/store/actions'

import './style.scss'
import styled from 'styled-components'

const Star = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  padding-top: 10px;
  background-image: url(${Images.STAR_FULL});
  background-repeat: no-repeat;
  font-size: 50px;
  font-weight: bold;
  color: #fff;
`

const displayDateFormat = 'HH:mm DD/MM/YYYY'
const convertDateFormat = 'YYYY-MM-DD HH:mm:ss'
const PAGE_SIZE = 4

@connect(state => ({
  schedulesStore: state.schedules
}), {
  getScheduleDetails: actions.getScheduleDetails,
  rateSchedule: actions.rateSchedule,
  joinSchedule: actions.joinSchedule,
  getUsersRate: actions.getUsersRate,
  avgRateSchedule: actions.avgRateSchedule
})

class SchedulesDetails extends Component {
  componentDidMount() {
    const { getScheduleDetails, avgRateSchedule, getUsersRate } = this.props
    getScheduleDetails({
      id: this.props.match.params.id
    })
    avgRateSchedule({
      schedule_id: this.props.match.params.id
    })
    getUsersRate({
      scheduleId: this.props.match.params.id,
      page: 1,
      pageSize: PAGE_SIZE
    })
  }

  _onPageChange = (page) => {
    this.props.getUsersRate({
      scheduleId: this.props.match.params.id,
      page,
      pageSize: PAGE_SIZE
    })
  }

  _onRateScheduleChange = (rate) => {
    const { rateSchedule, getScheduleDetails, schedulesStore } = this.props
    const timeNow = moment()
    const timeFinish = schedulesStore.currentSchedule?.timeFinish
    const timeCompare = moment(moment(timeNow).diff(moment(timeFinish)))

    if (timeCompare > 0) {
      rateSchedule({
        id: this.props.match.params.id,
        rate: rate * 2
      }, (action) => {
        if (action === TYPES.RATE_SCHEDULE_SUCCESS) {
          getScheduleDetails({
            id: this.props.match.params.id
          })
        }
      })
    } else {
      message.error('chưa kết thúc seminar')
    }
  }

  _onJoinSchedule = () => {
    const request = {
      scheduleId: this.props.match.params.id
    }
    const { joinSchedule, getScheduleDetails } = this.props
    joinSchedule(request, (action) => {
      if (action === TYPES.JOIN_SCHEDULE_SUCCESS) {
        getScheduleDetails({
          id: this.props.match.params.id
        })
      }
    })
  }

  render() {
    const { schedulesStore } = this.props

    const avgRateNumber = schedulesStore.avgRate?.rateAvg
    const roundAvgRate = Math.round(avgRateNumber * 10) / 10
    const toStringAvgRate = roundAvgRate.toString()

    const columns = [{
      title: 'email',
      dataIndex: 'user',
      key: 'user',
      align: 'center',
      render: (row, record) => (
        <>
          <span>{record.user.email}</span>
        </>
      )
    }, {
      title: 'rate',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
      render: (row, record) => (
        <>
          <Rate
            disabled
            allowHalf
            value={record.rate / 2}
          />
        </>
      )
    }]

    return (
      <Page className="page page-schedules-details">
        <FitHeightContainer hasHeader>
          <Container>
            <div className="schedules-details">
              <div className="left-vote">
                <h1>Đánh giá</h1>
                <span className="count-rate">
                  đã có
                  <i>{schedulesStore.avgRate?.rateCount}</i>
                  người đánh giá
                </span>
                <Star className="avg-vote">
                  <span className="rate-avg">{toStringAvgRate}</span>
                </Star>
                <Rate
                  allowHalf
                  defaultValue={0}
                  onChange={this._onRateScheduleChange}
                />

              </div>
              <div className="content-schedule">
                <h1>{schedulesStore.currentSchedule?.speakerName}</h1>
                <span className="same-text">
                  <i>Time start:</i>
                  {moment(schedulesStore.currentSchedule?.timeStart, convertDateFormat).format(displayDateFormat)}
                </span>
                <span className="same-text">
                  <i>Time finish:</i>
                  {moment(schedulesStore.currentSchedule?.timeFinish, convertDateFormat).format(displayDateFormat)}
                </span>
                <span className="same-text">
                  {schedulesStore.currentSchedule?.topic?.title}
                </span>
              </div>
              <div className="group-joiner">
                <span className="text-joiner">Joiner schedule</span>
                <Button
                  type="primary"
                  onClick={this._onJoinSchedule}
                >
                  <Icon type="up-square" theme="twoTone" />
                </Button>
              </div>
            </div>
            <Table
              pagination={false}
              rowKey={(row, index) => index}
              columns={columns}
              dataSource={schedulesStore.usersRate.content}
            />
            <Pagination
              defaultCurrent={1}
              pageSize={PAGE_SIZE}
              total={schedulesStore.usersRate.totalElements}
              onChange={this._onPageChange}
            />
          </Container>
        </FitHeightContainer>
      </Page>
    )
  }
}

export default SchedulesDetails
