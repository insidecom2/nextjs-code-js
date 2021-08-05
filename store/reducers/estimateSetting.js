import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_EstimateSetting_LIST_REQUEST = 'EstimateSetting/FETCH_EstimateSetting_LIST_REQUEST'
const FETCH_EstimateSetting_LIST_SUCCESS = 'EstimateSetting/FETCH_EstimateSetting_LIST_SUCCESS'
const FETCH_EstimateSetting_LIST_FAILURE = 'EstimateSetting/FETCH_EstimateSetting_LIST_FAILURE'

const FETCH_EstimateSetting_REQUEST = 'EstimateSetting/FETCH_EstimateSetting_REQUEST'
const FETCH_EstimateSetting_SUCCESS = 'EstimateSetting/FETCH_EstimateSetting_SUCCESS'
const FETCH_EstimateSetting_FAILURE = 'EstimateSetting/FETCH_EstimateSetting_FAILURE'

const CREATE_EstimateSetting_REQUEST = 'EstimateSetting/CREATE_EstimateSetting_REQUEST'
const CREATE_EstimateSetting_SUCCESS = 'EstimateSetting/CREATE_EstimateSetting_SUCCESS'
const CREATE_EstimateSetting_FAILURE = 'EstimateSetting/CREATE_EstimateSetting_FAILURE'

const DELETE_EstimateSetting_REQUEST = 'EstimateSetting/DELETE_EstimateSetting_REQUEST'
const DELETE_EstimateSetting_SUCCESS = 'EstimateSetting/DELETE_EstimateSetting_SUCCESS'
const DELETE_EstimateSetting_FAILURE = 'EstimateSetting/DELETE_EstimateSetting_FAILURE'

const UPDATE_EstimateSetting_REQUEST = 'EstimateSetting/UPDATE_EstimateSetting_REQUEST'
const UPDATE_EstimateSetting_SUCCESS = 'EstimateSetting/UPDATE_EstimateSetting_SUCCESS'
const UPDATE_EstimateSetting_FAILURE = 'EstimateSetting/UPDATE_EstimateSetting_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  EstimateSettingList: [],
  EstimateSetting: {},
  error: {}
}

// Default Reducer
const estimateSetting = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EstimateSetting_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_EstimateSetting_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        EstimateSettingList: action.payload
      }
    case FETCH_EstimateSetting_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_EstimateSetting_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_EstimateSetting_SUCCESS:
      return {
        ...state,
        isLoading: false,
        EstimateSetting: action.payload
      }
    case FETCH_EstimateSetting_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_EstimateSetting_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_EstimateSetting_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_EstimateSetting_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_EstimateSetting_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_EstimateSetting_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_EstimateSetting_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_EstimateSetting_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_EstimateSetting_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_EstimateSetting_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default estimateSetting

// Action Creators
export const getEstimateSettingList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EstimateSetting_LIST_REQUEST
      })

      const response = await API.get(EndPoints.ESTIMATESETTING)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_EstimateSetting_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_EstimateSetting_LIST_FAILURE
      })
    }
  }
}

export const getEstimateSettingListById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EstimateSetting_REQUEST
      })

      const response = await API.get(EndPoints.ESTIMATESETTING + `/${id}`)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_EstimateSetting_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_EstimateSetting_FAILURE
      })
    }
  }
}

export const createEstimateSetting = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_EstimateSetting_REQUEST
      })

      const config = {
        headers: { 'content-type': 'application/json' }
      }

      const response = await API.post(EndPoints.ESTIMATESETTING, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_EstimateSetting_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_EstimateSetting_FAILURE
      })
    }
  }
}

export const updateEstimateSetting = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EstimateSetting_REQUEST
      })
      
      const config = {
        headers: { 'content-type': 'application/json' }
      }

      const response = await API.patch(EndPoints.ESTIMATESETTING + `/${id}`, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_EstimateSetting_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_EstimateSetting_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const updateActiveEstimateSetting = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EstimateSetting_REQUEST
      })
      let formData = { is_active: data }

      const response = await API.patch(
        EndPoints.ESTIMATESETTING + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_EstimateSetting_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_EstimateSetting_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const deleteEstimateSetting = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_EstimateSetting_REQUEST
      })

      const response = await API.delete(EndPoints.ESTIMATESETTING + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_EstimateSetting_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_EstimateSetting_FAILURE
      })
    }
  }
}
