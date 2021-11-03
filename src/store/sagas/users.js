import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from 'app/utils/saga-helper'
import Notification from 'app/utils/notification'
import { TYPES } from 'app/store/actions'

import { getUsers, createUser, updateUser, deleteUser, getProfile, updateProfile, changePassword } from 'app/api/users'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_USERS, sagaHelper({
      api: getUsers
    })),
    takeLatest(TYPES.CREATE_USER, sagaHelper({
      api: createUser,
      successMessage: 'Add user thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.UPDATE_USER, sagaHelper({
      api: updateUser,
      successMessage: 'Update user thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.DELETE_USER, sagaHelper({
      api: deleteUser
    })),
    takeLatest(TYPES.GET_PROFILE, sagaHelper({
      api: getProfile
    })),
    takeLatest(TYPES.UPDATE_PROFILE, sagaHelper({
      api: updateProfile,
      successMessage: 'Update profile thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.CHANGE_PASSWORD, sagaHelper({
      api: changePassword,
      successMessage: 'Đổi mật khẩu thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    }))
  ])
}
