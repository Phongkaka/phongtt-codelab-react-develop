import { TYPES } from 'app/store/actions'

const INIT_STATE = {
  submitting: null,
  schedules: [],
  currentSchedule: null,
  avgRate: null,
  usersRate: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_SCHEDULES_REQUEST:
    case TYPES.GET_SCHEDULE_DETAILS_REQUEST:
    case TYPES.GET_USERS_RATE_REQUEST:
    case TYPES.RATE_SCHEDULE_REQUEST:
    case TYPES.AVG_RATE_SCHEDULE_REQUEST:
    case TYPES.CREATE_SCHEDULE_REQUEST:
    case TYPES.UPDATE_SCHEDULE_REQUEST:
    case TYPES.JOIN_SCHEDULE_REQUEST:
    case TYPES.DELETE_SCHEDULE_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_SCHEDULES_SUCCESS:
      return {
        ...state,
        submitting: null,
        schedules: action.data
      }
    case TYPES.AVG_RATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        submitting: null,
        avgRate: action.data
      }
    case TYPES.GET_SCHEDULE_DETAILS_SUCCESS:
      return {
        ...state,
        currentSchedule: action.data
      }
    case TYPES.GET_USERS_RATE_SUCCESS:
      return {
        ...state,
        usersRate: action.data
      }
    case TYPES.CREATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.UPDATE_SCHEDULE_SUCCESS:
    case TYPES.JOIN_SCHEDULE_SUCCESS:
    case TYPES.RATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.GET_SCHEDULES_FAILURE:
    case TYPES.GET_USERS_RATE_FAILURE:
    case TYPES.RATE_SCHEDULE_FAILURE:
    case TYPES.AVG_RATE_SCHEDULE_FAILURE:
    case TYPES.CREATE_SCHEDULE_FAILURE:
    case TYPES.UPDATE_SCHEDULE_FAILURE:
    case TYPES.JOIN_SCHEDULE_FAILURE:
    case TYPES.DELETE_SCHEDULE_FAILURE:
    case TYPES.GET_SCHEDULE_DETAILS_FAILURE:
      return {
        ...state,
        submitting: null
      }
    default:
      return state
  }
}
