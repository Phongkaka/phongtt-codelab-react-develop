import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from 'app/utils/saga-helper'
import Notification from 'app/utils/notification'
import { TYPES } from 'app/store/actions'

import { getCategories, updateCategory, createCategory, deleteCategory, getAllCategories } from 'app/api/category'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_CATEGORIES, sagaHelper({
      api: getCategories
    })),
    takeLatest(TYPES.CREATE_CATEGORY, sagaHelper({
      api: createCategory,
      successMessage: 'Add category thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.UPDATE_CATEGORY, sagaHelper({
      api: updateCategory,
      successMessage: 'Update category thành công',
      errorHanler: async (errors) => {
        errors = await errors.json()
        Notification.error(errors.message)
      }
    })),
    takeLatest(TYPES.DELETE_CATEGORY, sagaHelper({
      api: deleteCategory
    })),
    takeLatest(TYPES.GET_ALL_CATEGORIES, sagaHelper({
      api: getAllCategories
    }))
  ])
}
