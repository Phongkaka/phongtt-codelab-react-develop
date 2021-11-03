import { all } from 'redux-saga/effects'

import topics from './topics'
import users from './users'
import category from './category'
import schedules from './schedules'

export default function* sagas() {
  yield all([
    topics(),
    users(),
    category(),
    schedules()
  ])
}
