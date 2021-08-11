import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_foilingTechnic_LIST_REQUEST = 'foilingTechnic/FETCH_foilingTechnic_LIST_REQUEST'
const FETCH_foilingTechnic_LIST_SUCCESS = 'foilingTechnic/FETCH_foilingTechnic_LIST_SUCCESS'
const FETCH_foilingTechnic_LIST_FAILURE = 'foilingTechnic/FETCH_foilingTechnic_LIST_FAILURE'

const FETCH_foilingTechnic_ID_REQUEST = 'foilingTechnic/FETCH_foilingTechnic_ID_REQUEST'
const FETCH_foilingTechnic_ID_SUCCESS = 'foilingTechnic/FETCH_foilingTechnic_ID_SUCCESS'
const FETCH_foilingTechnic_ID_FAILURE = 'foilingTechnic/FETCH_foilingTechnic_ID_FAILURE'

const CREATE_foilingTechnic_REQUEST = 'foilingTechnic/CREATE_foilingTechnic_REQUEST'
const CREATE_foilingTechnic_SUCCESS = 'foilingTechnic/CREATE_foilingTechnic_SUCCESS'
const CREATE_foilingTechnic_FAILURE = 'foilingTechnic/CREATE_foilingTechnic_FAILURE'

const ACTIVE_foilingTechnic_REQUEST = 'foilingTechnic/ACTIVE_foilingTechnic_REQUEST'
const ACTIVE_foilingTechnic_SUCCESS = 'foilingTechnic/ACTIVE_foilingTechnic_SUCCESS'
const ACTIVE_foilingTechnic_FAILURE = 'foilingTechnic/ACTIVE_foilingTechnic_FAILURE'

const DELETE_foilingTechnic_REQUEST = 'foilingTechnic/DELETE_foilingTechnic_REQUEST'
const DELETE_foilingTechnic_SUCCESS = 'foilingTechnic/DELETE_foilingTechnic_SUCCESS'
const DELETE_foilingTechnic_FAILURE = 'foilingTechnic/DELETE_foilingTechnic_FAILURE'

const UPDATE_foilingTechnic_REQUEST = 'foilingTechnic/UPDATE_foilingTechnic_REQUEST'
const UPDATE_foilingTechnic_SUCCESS = 'foilingTechnic/UPDATE_foilingTechnic_SUCCESS'
const UPDATE_foilingTechnic_FAILURE = 'foilingTechnic/UPDATE_foilingTechnic_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  foilingTechnicList: [],
  error: {}
}

// Default Reducer
const foilingTechnic = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_foilingTechnic_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_foilingTechnic_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_foilingTechnic_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_foilingTechnic_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_foilingTechnic_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        foilingTechnic: action.payload
      }
    case FETCH_foilingTechnic_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case ACTIVE_foilingTechnic_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case ACTIVE_foilingTechnic_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case ACTIVE_foilingTechnic_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_foilingTechnic_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_foilingTechnic_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        foilingTechnicList: action.payload
      }
    case FETCH_foilingTechnic_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_foilingTechnic_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_foilingTechnic_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_foilingTechnic_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_foilingTechnic_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_foilingTechnic_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_foilingTechnic_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default foilingTechnic

// Action Creators
export const getfoilingTechnicList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_foilingTechnic_LIST_REQUEST
      })

      const response = await API.get(EndPoints.FOILINGTECHNIC)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_foilingTechnic_LIST_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_foilingTechnic_LIST_FAILURE
      })
    }
  }
}

export const createfoilingTechnic = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_foilingTechnic_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.FOILINGTECHNIC, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_foilingTechnic_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_foilingTechnic_FAILURE
      })
    }
  }
}

export const deletefoilingTechnic = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_foilingTechnic_REQUEST
      })

      const response = await API.delete(EndPoints.FOILINGTECHNIC + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_foilingTechnic_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_foilingTechnic_FAILURE
      })
    }
  }
}

export const updateActivefoilingTechnic = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTIVE_foilingTechnic_REQUEST
      })
      const formData = { is_active: data }

      const response = await API.put(
        EndPoints.FOILINGTECHNIC + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: ACTIVE_foilingTechnic_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: ACTIVE_foilingTechnic_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const getfoilingTechnicById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_foilingTechnic_ID_REQUEST
      })

      const response = await API.get(EndPoints.FOILINGTECHNIC + '/' + id)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_foilingTechnic_ID_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_foilingTechnic_ID_FAILURE
      })
    }
  }
}

export const updatefoilingTechnic = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_foilingTechnic_REQUEST
      })
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const response = await API.put(
        EndPoints.FOILINGTECHNIC + '/' + id,
        data,
        config
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_foilingTechnic_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_foilingTechnic_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}
