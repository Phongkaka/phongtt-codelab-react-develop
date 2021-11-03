import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import topics from './topics'
import users from './users'
import categories from './category'
import schedules from './schedules'

const appReducer = history => combineReducers({
  router: connectRouter(history),
  topics,
  users,
  categories,
  schedules
})

export default history => (state, action) => {
  if (
    action.type === '@@router/LOCATION_CHANGE'
    && action.payload.location.pathname === '/login'
    && action.payload.action === 'PUSH'
  ) {
    state = undefined
  }

  return appReducer(history)(state, action)
}
