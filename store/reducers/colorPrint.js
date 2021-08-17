import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_colorPrint_LIST_REQUEST = 'colorPrint/FETCH_colorPrint_LIST_REQUEST'
const FETCH_colorPrint_LIST_SUCCESS = 'colorPrint/FETCH_colorPrint_LIST_SUCCESS'
const FETCH_colorPrint_LIST_FAILURE = 'colorPrint/FETCH_colorPrint_LIST_FAILURE'

const FETCH_colorPrint_ID_REQUEST = 'colorPrint/FETCH_colorPrint_ID_REQUEST'
const FETCH_colorPrint_ID_SUCCESS = 'colorPrint/FETCH_colorPrint_ID_SUCCESS'
const FETCH_colorPrint_ID_FAILURE = 'colorPrint/FETCH_colorPrint_ID_FAILURE'

const CREATE_colorPrint_REQUEST = 'colorPrint/CREATE_colorPrint_REQUEST'
const CREATE_colorPrint_SUCCESS = 'colorPrint/CREATE_colorPrint_SUCCESS'
const CREATE_colorPrint_FAILURE = 'colorPrint/CREATE_colorPrint_FAILURE'

const ACTIVE_colorPrint_REQUEST = 'colorPrint/ACTIVE_colorPrint_REQUEST'
const ACTIVE_colorPrint_SUCCESS = 'colorPrint/ACTIVE_colorPrint_SUCCESS'
const ACTIVE_colorPrint_FAILURE = 'colorPrint/ACTIVE_colorPrint_FAILURE'

const DELETE_colorPrint_REQUEST = 'colorPrint/DELETE_colorPrint_REQUEST'
const DELETE_colorPrint_SUCCESS = 'colorPrint/DELETE_colorPrint_SUCCESS'
const DELETE_colorPrint_FAILURE = 'colorPrint/DELETE_colorPrint_FAILURE'

const UPDATE_colorPrint_REQUEST = 'colorPrint/UPDATE_colorPrint_REQUEST'
const UPDATE_colorPrint_SUCCESS = 'colorPrint/UPDATE_colorPrint_SUCCESS'
const UPDATE_colorPrint_FAILURE = 'colorPrint/UPDATE_colorPrint_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  colorPrintList: [],
  error: {}
}

// Default Reducer
const colorPrint = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_colorPrint_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_colorPrint_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_colorPrint_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_colorPrint_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_colorPrint_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        colorPrint: action.payload
      }
    case FETCH_colorPrint_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case ACTIVE_colorPrint_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case ACTIVE_colorPrint_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case ACTIVE_colorPrint_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_colorPrint_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_colorPrint_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        colorPrintList: action.payload
      }
    case FETCH_colorPrint_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_colorPrint_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_colorPrint_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_colorPrint_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_colorPrint_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_colorPrint_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_colorPrint_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default colorPrint

// Action Creators
export const getcolorPrintList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_colorPrint_LIST_REQUEST
      })

      const response = await API.get(EndPoints.COLORPRINT)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_colorPrint_LIST_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_colorPrint_LIST_FAILURE
      })
    }
  }
}

export const createcolorPrint = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_colorPrint_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.COLORPRINT, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_colorPrint_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_colorPrint_FAILURE
      })
    }
  }
}

export const deletecolorPrint = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_colorPrint_REQUEST
      })

      const response = await API.delete(EndPoints.COLORPRINT + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_colorPrint_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_colorPrint_FAILURE
      })
    }
  }
}

export const updateActivecolorPrint = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTIVE_colorPrint_REQUEST
      })
      const formData = { is_active: data }

      const response = await API.patch(
        EndPoints.COLORPRINT + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: ACTIVE_colorPrint_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: ACTIVE_colorPrint_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const getcolorPrintById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_colorPrint_ID_REQUEST
      })

      const response = await API.get(EndPoints.COLORPRINT + '/' + id)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_colorPrint_ID_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_colorPrint_ID_FAILURE
      })
    }
  }
}

export const updatecolorPrint = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_colorPrint_REQUEST
      })
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const response = await API.patch(
        EndPoints.COLORPRINT + '/' + id,
        data,
        config
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_colorPrint_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_colorPrint_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}
