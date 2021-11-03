import { TYPES } from 'app/store/actions'

const INIT_STATE = {
  submitting: null,
  categories: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_CATEGORIES_REQUEST:
    case TYPES.GET__ALL_CATEGORIES_REQUEST:
    case TYPES.CREATE_CATEGORY_REQUEST:
    case TYPES.UPDATE_CATEGORY_REQUEST:
    case TYPES.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_CATEGORIES_SUCCESS:
    case TYPES.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        submitting: null,
        categories: action.data
      }
    case TYPES.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.GET_CATEGORIES_FAILURE:
    case TYPES.GET_ALL_CATEGORIES_FAILURE:
    case TYPES.CREATE_CATEGORY_FAILURE:
    case TYPES.UPDATE_CATEGORY_FAILURE:
    case TYPES.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        submitting: null
      }
    default:
      return state
  }
}
