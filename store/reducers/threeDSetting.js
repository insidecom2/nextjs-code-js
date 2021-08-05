import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_ThreeDSetting_LIST_REQUEST = 'ThreeDSetting/FETCH_ThreeDSetting_LIST_REQUEST'
const FETCH_ThreeDSetting_LIST_SUCCESS = 'ThreeDSetting/FETCH_ThreeDSetting_LIST_SUCCESS'
const FETCH_ThreeDSetting_LIST_FAILURE = 'ThreeDSetting/FETCH_ThreeDSetting_LIST_FAILURE'

const FETCH_ThreeDSetting_REQUEST = 'ThreeDSetting/FETCH_ThreeDSetting_REQUEST'
const FETCH_ThreeDSetting_SUCCESS = 'ThreeDSetting/FETCH_ThreeDSetting_SUCCESS'
const FETCH_ThreeDSetting_FAILURE = 'ThreeDSetting/FETCH_ThreeDSetting_FAILURE'

const CREATE_ThreeDSetting_REQUEST = 'ThreeDSetting/CREATE_ThreeDSetting_REQUEST'
const CREATE_ThreeDSetting_SUCCESS = 'ThreeDSetting/CREATE_ThreeDSetting_SUCCESS'
const CREATE_ThreeDSetting_FAILURE = 'ThreeDSetting/CREATE_ThreeDSetting_FAILURE'

const DELETE_ThreeDSetting_REQUEST = 'ThreeDSetting/DELETE_ThreeDSetting_REQUEST'
const DELETE_ThreeDSetting_SUCCESS = 'ThreeDSetting/DELETE_ThreeDSetting_SUCCESS'
const DELETE_ThreeDSetting_FAILURE = 'ThreeDSetting/DELETE_ThreeDSetting_FAILURE'

const UPDATE_ThreeDSetting_REQUEST = 'ThreeDSetting/UPDATE_ThreeDSetting_REQUEST'
const UPDATE_ThreeDSetting_SUCCESS = 'ThreeDSetting/UPDATE_ThreeDSetting_SUCCESS'
const UPDATE_ThreeDSetting_FAILURE = 'ThreeDSetting/UPDATE_ThreeDSetting_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  ThreeDSettingList: [],
  ThreeDSetting: {},
  error: {}
}

// Default Reducer
const threeDSetting = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ThreeDSetting_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_ThreeDSetting_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ThreeDSettingList: action.payload
      }
    case FETCH_ThreeDSetting_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_ThreeDSetting_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_ThreeDSetting_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ThreeDSetting: action.payload
      }
    case FETCH_ThreeDSetting_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_ThreeDSetting_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_ThreeDSetting_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_ThreeDSetting_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_ThreeDSetting_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_ThreeDSetting_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_ThreeDSetting_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_ThreeDSetting_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_ThreeDSetting_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_ThreeDSetting_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default threeDSetting

// Action Creators
export const getThreeDSettingList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_ThreeDSetting_LIST_REQUEST
      })

      const response = await API.get(EndPoints.THREEDSETTING)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_ThreeDSetting_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_ThreeDSetting_LIST_FAILURE
      })
    }
  }
}

export const getThreeDSettingListById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_ThreeDSetting_REQUEST
      })

      const response = await API.get(EndPoints.THREEDSETTING + `/${id}`)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_ThreeDSetting_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_ThreeDSetting_FAILURE
      })
    }
  }
}

export const createThreeDSetting = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_ThreeDSetting_REQUEST
      })

      const config = {
        headers: { 'content-type': 'application/json' }
      }

      const response = await API.post(EndPoints.THREEDSETTING, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_ThreeDSetting_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_ThreeDSetting_FAILURE
      })
    }
  }
}

export const updateThreeDSetting = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ThreeDSetting_REQUEST
      })
      
      const config = {
        headers: { 'content-type': 'application/json' }
      }

      const response = await API.patch(EndPoints.THREEDSETTING + `/${id}`, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_ThreeDSetting_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_ThreeDSetting_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const updateActiveThreeDSetting = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ThreeDSetting_REQUEST
      })
      let formData = { is_active: data }

      const response = await API.patch(
        EndPoints.THREEDSETTING + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_ThreeDSetting_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_ThreeDSetting_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const deleteThreeDSetting = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_ThreeDSetting_REQUEST
      })

      const response = await API.delete(EndPoints.THREEDSETTING + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_ThreeDSetting_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_ThreeDSetting_FAILURE
      })
    }
  }
}
