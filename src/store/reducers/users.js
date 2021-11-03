import { TYPES } from 'app/store/actions'

const INIT_STATE = {
  submitting: null,
  users: [],
  profile: null
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_USERS_REQUEST:
    case TYPES.CREATE_USER_REQUEST:
    case TYPES.UPDATE_USER_REQUEST:
    case TYPES.DELETE_USER_REQUEST:
    case TYPES.GET_PROFILE_REQUEST:
    case TYPES.UPDATE_PROFILE_REQUEST:
    case TYPES.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_USERS_SUCCESS:
      return {
        ...state,
        submitting: null,
        users: action.data
      }
    case TYPES.CREATE_USER_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.UPDATE_USER_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        submitting: null,
        users: action.payload
      }
    case TYPES.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.DELETE_USER_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        submitting: null,
        profile: action.data
      }
    case TYPES.GET_USERS_FAILURE:
    case TYPES.CREATE_USER_FAILURE:
    case TYPES.UPDATE_USER_FAILURE:
    case TYPES.DELETE_USER_FAILURE:
    case TYPES.GET_PROFILE_FAILURE:
    case TYPES.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        submitting: null
      }
    default:
      return state
  }
}
