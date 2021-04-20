import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_STYLE_LIST_REQUEST = 'Style/FETCH_STYLE_LIST_REQUEST'
const FETCH_STYLE_LIST_SUCCESS = 'Style/FETCH_STYLE_LIST_SUCCESS'
const FETCH_STYLE_LIST_FAILURE = 'Style/FETCH_STYLE_LIST_FAILURE'

const CREATE_STYLE_REQUEST = 'Style/CREATE_STYLE_REQUEST'
const CREATE_STYLE_SUCCESS = 'Style/CREATE_STYLE_SUCCESS'
const CREATE_STYLE_FAILURE = 'Style/CREATE_STYLE_FAILURE'

const DELETE_STYLE_REQUEST = 'Style/DELETE_STYLE_REQUEST'
const DELETE_STYLE_SUCCESS = 'Style/DELETE_STYLE_SUCCESS'
const DELETE_STYLE_FAILURE = 'Style/DELETE_STYLE_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  styleList: [],
  error: {}
}

// Default Reducer
const style = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STYLE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_STYLE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        styleList: action.payload
      }
    case FETCH_STYLE_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_STYLE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_STYLE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_STYLE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_STYLE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_STYLE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_STYLE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default style

// Action Creators
export const getStyleList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_STYLE_LIST_REQUEST
      })

      const response = await API.get(EndPoints.STYLE)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_STYLE_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_STYLE_LIST_FAILURE
      })
    }
  }
}

export const createStyle = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_STYLE_REQUEST
      })

      const response = await API.post(EndPoints.STYLE, data)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_STYLE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_STYLE_FAILURE
      })
    }
  }
}

export const deleteStyle = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_STYLE_REQUEST
      })

      const response = await API.delete(EndPoints.STYLE + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_STYLE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_STYLE_FAILURE
      })
    }
  }
}