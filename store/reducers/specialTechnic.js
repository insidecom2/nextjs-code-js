import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_specialTechnic_LIST_REQUEST = 'specialTechnic/FETCH_specialTechnic_LIST_REQUEST'
const FETCH_specialTechnic_LIST_SUCCESS = 'specialTechnic/FETCH_specialTechnic_LIST_SUCCESS'
const FETCH_specialTechnic_LIST_FAILURE = 'specialTechnic/FETCH_specialTechnic_LIST_FAILURE'

const FETCH_specialTechnic_ID_REQUEST = 'specialTechnic/FETCH_specialTechnic_ID_REQUEST'
const FETCH_specialTechnic_ID_SUCCESS = 'specialTechnic/FETCH_specialTechnic_ID_SUCCESS'
const FETCH_specialTechnic_ID_FAILURE = 'specialTechnic/FETCH_specialTechnic_ID_FAILURE'

const CREATE_specialTechnic_REQUEST = 'specialTechnic/CREATE_specialTechnic_REQUEST'
const CREATE_specialTechnic_SUCCESS = 'specialTechnic/CREATE_specialTechnic_SUCCESS'
const CREATE_specialTechnic_FAILURE = 'specialTechnic/CREATE_specialTechnic_FAILURE'

const ACTIVE_specialTechnic_REQUEST = 'specialTechnic/ACTIVE_specialTechnic_REQUEST'
const ACTIVE_specialTechnic_SUCCESS = 'specialTechnic/ACTIVE_specialTechnic_SUCCESS'
const ACTIVE_specialTechnic_FAILURE = 'specialTechnic/ACTIVE_specialTechnic_FAILURE'

const DELETE_specialTechnic_REQUEST = 'specialTechnic/DELETE_specialTechnic_REQUEST'
const DELETE_specialTechnic_SUCCESS = 'specialTechnic/DELETE_specialTechnic_SUCCESS'
const DELETE_specialTechnic_FAILURE = 'specialTechnic/DELETE_specialTechnic_FAILURE'

const UPDATE_specialTechnic_REQUEST = 'specialTechnic/UPDATE_specialTechnic_REQUEST'
const UPDATE_specialTechnic_SUCCESS = 'specialTechnic/UPDATE_specialTechnic_SUCCESS'
const UPDATE_specialTechnic_FAILURE = 'specialTechnic/UPDATE_specialTechnic_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  specialTechnicList: [],
  error: {}
}

// Default Reducer
const specialTechnic = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_specialTechnic_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_specialTechnic_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_specialTechnic_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_specialTechnic_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_specialTechnic_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        specialTechnic: action.payload
      }
    case FETCH_specialTechnic_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case ACTIVE_specialTechnic_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case ACTIVE_specialTechnic_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case ACTIVE_specialTechnic_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_specialTechnic_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_specialTechnic_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        specialTechnicList: action.payload
      }
    case FETCH_specialTechnic_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_specialTechnic_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_specialTechnic_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_specialTechnic_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_specialTechnic_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_specialTechnic_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_specialTechnic_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default specialTechnic

// Action Creators
export const getspecialTechnicList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_specialTechnic_LIST_REQUEST
      })

      const response = await API.get(EndPoints.SPECIALTECHNIC)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_specialTechnic_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_specialTechnic_LIST_FAILURE
      })
    }
  }
}

export const createspecialTechnic = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_specialTechnic_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.SPECIALTECHNIC, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_specialTechnic_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_specialTechnic_FAILURE
      })
    }
  }
}

export const deletespecialTechnic = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_specialTechnic_REQUEST
      })

      const response = await API.delete(EndPoints.SPECIALTECHNIC + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_specialTechnic_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_specialTechnic_FAILURE
      })
    }
  }
}

export const updateActivespecialTechnic = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTIVE_specialTechnic_REQUEST
      })
      const formData = { is_active: data }

      const response = await API.put(
        EndPoints.SPECIALTECHNIC + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: ACTIVE_specialTechnic_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: ACTIVE_specialTechnic_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const getspecialTechnicById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_specialTechnic_ID_REQUEST
      })

      const response = await API.get(EndPoints.SPECIALTECHNIC + '/' + id)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_specialTechnic_ID_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_specialTechnic_ID_FAILURE
      })
    }
  }
}

export const updatespecialTechnic = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_specialTechnic_REQUEST
      })
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const response = await API.put(
        EndPoints.SPECIALTECHNIC + '/' + id,
        data,
        config
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_specialTechnic_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_specialTechnic_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}
