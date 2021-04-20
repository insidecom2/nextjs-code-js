import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_SIZE_LIST_REQUEST = 'Size/FETCH_SIZE_LIST_REQUEST'
const FETCH_SIZE_LIST_SUCCESS = 'Size/FETCH_SIZE_LIST_SUCCESS'
const FETCH_SIZE_LIST_FAILURE = 'Size/FETCH_SIZE_LIST_FAILURE'

const CREATE_SIZE_REQUEST = 'Size/CREATE_SIZE_REQUEST'
const CREATE_SIZE_SUCCESS = 'Size/CREATE_SIZE_SUCCESS'
const CREATE_SIZE_FAILURE = 'Size/CREATE_SIZE_FAILURE'

const DELETE_SIZE_REQUEST = 'Size/DELETE_SIZE_REQUEST'
const DELETE_SIZE_SUCCESS = 'Size/DELETE_SIZE_SUCCESS'
const DELETE_SIZE_FAILURE = 'Size/DELETE_SIZE_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  sizeList: [],
  error: {}
}

// Default Reducer
const size = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SIZE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_SIZE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sizeList: action.payload
      }
    case FETCH_SIZE_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_SIZE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_SIZE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_SIZE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_SIZE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_SIZE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_SIZE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default size

// Action Creators
export const getSizeList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SIZE_LIST_REQUEST
      })

      const response = await API.get(EndPoints.SIZE)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_SIZE_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_SIZE_LIST_FAILURE
      })
    }
  }
}

export const createSize = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_SIZE_REQUEST
      })

      const response = await API.post(EndPoints.SIZE, data)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_SIZE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_SIZE_FAILURE
      })
    }
  }
}

export const deleteSize = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_SIZE_REQUEST
      })

      const response = await API.delete(EndPoints.SIZE + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_SIZE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_SIZE_FAILURE
      })
    }
  }
}
