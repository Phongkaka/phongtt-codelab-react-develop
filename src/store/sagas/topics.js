import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from 'app/utils/saga-helper'
import Notification from 'app/utils/notification'
import { TYPES } from 'app/store/actions'

import { getTopics, createTopic, updateTopic,
  deleteTopic, approveTopic, getAllTopics } from 'app/api/topics'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_TOPICS, sagaHelper({
      api: getTopics
    })),
    takeLatest(TYPES.GET_ALL_TOPICS, sagaHelper({
      api: getAllTopics
    })),
    takeLatest(TYPES.CREATE_TOPIC, sagaHelper({
      api: createTopic,
      successMessage: 'Tạo topic thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.UPDATE_TOPIC, sagaHelper({
      api: updateTopic,
      successMessage: 'Update topic thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.DELETE_TOPIC, sagaHelper({
      api: deleteTopic
    })),
    takeLatest(TYPES.APPROVE_TOPIC, sagaHelper({
      api: approveTopic
    }))
  ])
}
