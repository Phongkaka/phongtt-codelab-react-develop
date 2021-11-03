import NProgress from 'nprogress'
import { push } from 'connected-react-router'
import { put } from 'redux-saga/effects'

import Storage from 'app/utils/storage'
import Notification from 'app/utils/notification'
import ERROR_MESSAGES from 'app/constants/error-messages'

let request = 0

export default function sagaHelper({ api, successMessage, errorMessage, progress, errorHanler }) {
  return function* ({ type, data, callback }) {
    const successType = `${type}_SUCCESS`
    const failureType = `${type}_FAILURE`

    try {
      if (progress && !NProgress.isStarted()) NProgress.start()
      request += 1

      yield put({ type: `${type}_REQUEST`, payload: data })

      const result = yield api(data)

      yield put({ type: successType, data: result, payload: data })

      if (successMessage) Notification.success(successMessage)

      if (callback) callback(successType, result)
    } catch (e) {
      yield put({ type: failureType, error: errorMessage || e })

      if (errorHanler) {
        errorHanler(e)
      } else {
        Notification.error(errorMessage || e)
      }

      if (callback) callback(failureType, errorMessage || e)
    } finally {
      if (request === 1) NProgress.done()
      request -= 1
    }
  }
}
