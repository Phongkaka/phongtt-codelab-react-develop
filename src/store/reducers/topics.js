import { TYPES } from 'app/store/actions'

const INIT_STATE = {
  submitting: null,
  topics: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_TOPICS_REQUEST:
    case TYPES.GET_ALL_TOPICS_REQUEST:
    case TYPES.CREATE_TOPIC_REQUEST:
    case TYPES.UPDATE_TOPIC_REQUEST:
    case TYPES.DELETE_TOPIC_REQUEST:
    case TYPES.APPROVE_TOPIC_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_TOPICS_SUCCESS:
    case TYPES.GET_ALL_TOPICS_SUCCESS:
      return {
        ...state,
        submitting: null,
        topics: action.data
      }
    case TYPES.CREATE_TOPIC_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.UPDATE_TOPIC_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.DELETE_TOPIC_SUCCESS:
    case TYPES.APPROVE_TOPIC_SUCCESS:
      return {
        ...state,
        submitting: null,
        topics: {
          ...state,
          content: state.topics.content.filter(item => item.id !== action.payload.id)
        }
      }
    case TYPES.GET_TOPICS_FAILURE:
    case TYPES.GET_ALL_TOPICS_FAILURE:
    case TYPES.CREATE_TOPIC_FAILURE:
    case TYPES.UPDATE_TOPIC_FAILURE:
    case TYPES.DELETE_TOPIC_FAILURE:
    case TYPES.APPROVE_TOPIC_FAILURE:
      return {
        ...state,
        submitting: null
      }
    default:
      return state
  }
}
