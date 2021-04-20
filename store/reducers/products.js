import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_PRODUCTS_LIST_REQUEST = 'Products/FETCH_PRODUCTS_LIST_REQUEST'
const FETCH_PRODUCTS_LIST_SUCCESS = 'Products/FETCH_PRODUCTS_LIST_SUCCESS'
const FETCH_PRODUCTS_LIST_FAILURE = 'Products/FETCH_PRODUCTS_LIST_FAILURE'

const CREATE_PRODUCTS_REQUEST = 'Products/CREATE_PRODUCTS_REQUEST'
const CREATE_PRODUCTS_SUCCESS = 'Products/CREATE_PRODUCTS_SUCCESS'
const CREATE_PRODUCTS_FAILURE = 'Products/CREATE_PRODUCTS_FAILURE'

const DELETE_PRODUCTS_REQUEST = 'Products/DELETE_PRODUCTS_REQUEST'
const DELETE_PRODUCTS_SUCCESS = 'Products/DELETE_PRODUCTS_SUCCESS'
const DELETE_PRODUCTS_FAILURE = 'v/DELETE_PRODUCTS_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  productsList: [],
  error: {}
}

// Default Reducer
const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productsList: action.payload
      }
    case FETCH_PRODUCTS_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default products

// Action Creators
export const getProductsList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRODUCTS_LIST_REQUEST
      })

      const response = await API.get(EndPoints.PRODUCTS)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_PRODUCTS_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_PRODUCTS_LIST_FAILURE
      })
    }
  }
}

export const createProducts = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PRODUCTS_REQUEST
      })

      const response = await API.post(EndPoints.PRODUCTS, data)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_PRODUCTS_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_PRODUCTS_FAILURE
      })
    }
  }
}

export const deleteProducts = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PRODUCTS_REQUEST
      })

      const response = await API.delete(EndPoints.PRODUCTS + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_PRODUCTS_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_PRODUCTS_FAILURE
      })
    }
  }
}
