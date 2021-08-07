import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_PAYMENT_LIST_REQUEST = 'ManagePayment/FETCH_PAYMENT_LIST_REQUEST'
const FETCH_PAYMENT_LIST_SUCCESS = 'ManagePayment/FETCH_PAYMENT_LIST_SUCCESS'
const FETCH_PAYMENT_LIST_FAILURE = 'ManagePayment/FETCH_PAYMENT_LIST_FAILURE'

const DELETE_PAYMENT_REQUEST = 'ManagePayment/DELETE_PAYMENT_REQUEST'
const DELETE_PAYMENT_SUCCESS = 'ManagePayment/DELETE_PAYMENT_SUCCESS'
const DELETE_PAYMENT_FAILURE = 'ManagePayment/DELETE_PAYMENT_FAILURE'

const UPDATE_PAYMENT_REQUEST = 'ManagePayment/UPDATE_PAYMENT_REQUEST'
const UPDATE_PAYMENT_SUCCESS = 'ManagePayment/UPDATE_PAYMENT_SUCCESS'
const UPDATE_PAYMENT_FAILURE = 'ManagePayment/UPDATE_PAYMENT_FAILURE'

const CREATE_PAYMENT_REQUEST = 'ManagePayment/CREATE_PAYMENT_REQUEST'
const CREATE_PAYMENT_SUCCESS = 'ManagePayment/CREATE_PAYMENT_SUCCESS'
const CREATE_PAYMENT_FAILURE = 'ManagePayment/CREATE_PAYMENT_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  PaymentList: [],
  payment: {},
  error: {}
}

// Default Reducer
const payment = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PAYMENT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        PaymentList: action.payload
      }
    case FETCH_PAYMENT_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default payment

// Action Creators
export const getPaymentList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PAYMENT_LIST_REQUEST
      })

      const response = await API.get(EndPoints.PAYMENT)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_PAYMENT_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_PAYMENT_LIST_FAILURE
      })
    }
  }
}

export const updateActivePayment = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PAYMENT_REQUEST
      })
      const formData = { is_active: data }

      const response = await API.patch(
        EndPoints.PAYMENT + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_PAYMENT_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PAYMENT_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const deletePayment = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PAYMENT_REQUEST
      })

      const response = await API.delete(EndPoints.PAYMENT + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_PAYMENT_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_PAYMENT_FAILURE
      })
    }
  }
}

export const updatePayment = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PAYMENT_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.patch(
        EndPoints.PAYMENT + '/' + id,
        data,
        config
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_PAYMENT_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PAYMENT_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const createPayment = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PAYMENT_REQUEST
      })
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.PAYMENT, data, config)

      if (response.status === HTTP_STATUS_CODE.CREATED) {
        dispatch({
          type: CREATE_PAYMENT_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_PAYMENT_FAILURE
      })
    }
  }
}
