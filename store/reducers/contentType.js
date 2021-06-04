import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_CONTENT_TYPE_LIST_REQUEST =
  'ContentType/FETCH_CONTENT_TYPE_LIST_REQUEST'
const FETCH_CONTENT_TYPE_LIST_SUCCESS =
  'ContentType/FETCH_CONTENT_TYPE_LIST_SUCCESS'
const FETCH_CONTENT_TYPE_LIST_FAILURE =
  'ContentType/FETCH_CONTENT_TYPE_LIST_FAILURE'

const DELETE_CONTENT_TYPE_REQUEST = 'ContentType/DELETE_CONTENT_TYPE_REQUEST'
const DELETE_CONTENT_TYPE_SUCCESS = 'ContentType/DELETE_CONTENT_TYPE_SUCCESS'
const DELETE_CONTENT_TYPE_FAILURE = 'ContentType/DELETE_CONTENT_TYPE_FAILURE'

const UPDATE_CONTENT_TYPE_REQUEST = 'ContentType/UPDATE_CONTENT_TYPE_REQUEST'
const UPDATE_CONTENT_TYPE_SUCCESS = 'ContentType/UPDATE_CONTENT_TYPE_SUCCESS'
const UPDATE_CONTENT_TYPE_FAILURE = 'ContentType/UPDATE_CONTENT_TYPE_FAILURE'

const CREATE_CONTENT_TYPE_REQUEST = 'ContentType/CREATE_CONTENT_TYPE_REQUEST'
const CREATE_CONTENT_TYPE_SUCCESS = 'ContentType/CREATE_CONTENT_TYPE_SUCCESS'
const CREATE_CONTENT_TYPE_FAILURE = 'ContentType/CREATE_CONTENT_TYPE_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  ContentTypeList: [],
  ContentType: {},
  error: {}
}

// Default Reducer
const contentType = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENT_TYPE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_CONTENT_TYPE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ContentTypeList: action.payload
      }
    case FETCH_CONTENT_TYPE_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_CONTENT_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_CONTENT_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_CONTENT_TYPE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_CONTENT_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_CONTENT_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_CONTENT_TYPE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default contentType

// Action Creators
export const getContentTypeList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CONTENT_TYPE_LIST_REQUEST
      })

      const response = await API.get(EndPoints.CONTENT_TYPE)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_CONTENT_TYPE_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_CONTENT_TYPE_LIST_FAILURE
      })
    }
  }
}

export const updateActiveContentType = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_CONTENT_TYPE_REQUEST
      })
      const formData = { is_active: data }

      const response = await API.put(
        EndPoints.CONTENT_TYPE + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_CONTENT_TYPE_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_CONTENT_TYPE_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const deleteContentType = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_CONTENT_TYPE_REQUEST
      })

      const response = await API.delete(EndPoints.CONTENT_TYPE + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_CONTENT_TYPE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_CONTENT_TYPE_FAILURE
      })
    }
  }
}

export const updateContentType = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_CONTENT_TYPE_REQUEST
      })

      const response = await API.put(EndPoints.CONTENT_TYPE + '/' + id, data)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_CONTENT_TYPE_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_CONTENT_TYPE_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const createContentType = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_CONTENT_TYPE_REQUEST
      })

      const response = await API.post(EndPoints.CONTENT_TYPE, data)

      if (response.status === HTTP_STATUS_CODE.CREATED) {
        dispatch({
          type: CREATE_CONTENT_TYPE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_CONTENT_TYPE_FAILURE
      })
    }
  }
}
