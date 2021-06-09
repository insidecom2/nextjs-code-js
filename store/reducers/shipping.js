import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_SHIPPING_LIST_REQUEST = 'ManageShipping/FETCH_SHIPPING_LIST_REQUEST'
const FETCH_SHIPPING_LIST_SUCCESS = 'ManageShipping/FETCH_SHIPPING_LIST_SUCCESS'
const FETCH_SHIPPING_LIST_FAILURE = 'ManageShipping/FETCH_SHIPPING_LIST_FAILURE'

const DELETE_SHIPPING_REQUEST = 'ManageShipping/DELETE_SHIPPING_REQUEST'
const DELETE_SHIPPING_SUCCESS = 'ManageShipping/DELETE_SHIPPING_SUCCESS'
const DELETE_SHIPPING_FAILURE = 'ManageShipping/DELETE_SHIPPING_FAILURE'

const UPDATE_SHIPPING_REQUEST = 'ManageShipping/UPDATE_SHIPPING_REQUEST'
const UPDATE_SHIPPING_SUCCESS = 'ManageShipping/UPDATE_SHIPPING_SUCCESS'
const UPDATE_SHIPPING_FAILURE = 'ManageShipping/UPDATE_SHIPPING_FAILURE'

const CREATE_SHIPPING_REQUEST = 'ManageShipping/CREATE_SHIPPING_REQUEST'
const CREATE_SHIPPING_SUCCESS = 'ManageShipping/CREATE_SHIPPING_SUCCESS'
const CREATE_SHIPPING_FAILURE = 'ManageShipping/CREATE_SHIPPING_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  ShippingList: [],
  Shipping: {},
  error: {}
}

// Default Reducer
const Shipping = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHIPPING_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_SHIPPING_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ShippingTypeList: action.payload
      }
    case FETCH_SHIPPING_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_SHIPPING_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_SHIPPING_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_SHIPPING_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_SHIPPING_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_SHIPPING_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_SHIPPING_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default Shipping

// Action Creators
export const getShippingList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SHIPPING_LIST_REQUEST
      })

      const response = await API.get(EndPoints.SHIPPING)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_SHIPPING_LIST_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_SHIPPING_LIST_FAILURE
      })
    }
  }
}

export const updateActiveShipping = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SHIPPING_REQUEST
      })
      const formData = { is_active: data }

      const response = await API.patch(
        EndPoints.SHIPPING + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_SHIPPING_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SHIPPING_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const deleteShipping = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_SHIPPING_REQUEST
      })

      const response = await API.delete(EndPoints.SHIPPING + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_SHIPPING_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_SHIPPING_FAILURE
      })
    }
  }
}

export const updateShipping = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SHIPPING_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.patch(
        EndPoints.SHIPPING + '/' + id,
        data,
        config
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_SHIPPING_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SHIPPING_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const createShipping = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_SHIPPING_REQUEST
      })
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.SHIPPING, data, config)

      if (response.status === HTTP_STATUS_CODE.CREATED) {
        dispatch({
          type: CREATE_SHIPPING_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_SHIPPING_FAILURE
      })
    }
  }
}
