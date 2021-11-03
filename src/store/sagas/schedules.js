import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from 'app/utils/saga-helper'
import { TYPES } from 'app/store/actions'
import Notification from 'app/utils/notification'
import { getSchedules, getUsersRate, joinSchedule, createSchedule,
  updateSchedule, deleteSchedule, rateSchedule, avgRateSchedule,
  getScheduleDetails } from 'app/api/schedules'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_SCHEDULES, sagaHelper({
      api: getSchedules
    })),
    takeLatest(TYPES.GET_USERS_RATE, sagaHelper({
      api: getUsersRate
    })),
    takeLatest(TYPES.RATE_SCHEDULE, sagaHelper({
      api: rateSchedule,
      successMessage: 'Rate thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.AVG_RATE_SCHEDULE, sagaHelper({
      api: avgRateSchedule
    })),
    takeLatest(TYPES.CREATE_SCHEDULE, sagaHelper({
      api: createSchedule,
      successMessage: 'Add schedule thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.UPDATE_SCHEDULE, sagaHelper({
      api: updateSchedule,
      successMessage: 'Update schedule thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.JOIN_SCHEDULE, sagaHelper({
      api: joinSchedule,
      successMessage: 'Bạn đã tham gia schedule',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.DELETE_SCHEDULE, sagaHelper({
      api: deleteSchedule
    })),
    takeLatest(TYPES.GET_SCHEDULE_DETAILS, sagaHelper({
      api: getScheduleDetails
    }))
  ])
}
