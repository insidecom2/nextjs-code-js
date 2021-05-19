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

const UPDATE_PRODUCTS_REQUEST = 'Products/UPDATE_PRODUCTS_REQUEST'
const UPDATE_PRODUCTS_SUCCESS = 'Products/UPDATE_PRODUCTS_SUCCESS'
const UPDATE_PRODUCTS_FAILURE = 'Products/UPDATE_PRODUCTS_FAILURE'

const UPDATE_PRODUCT_IMAGE_REQUEST = 'Products/UPDATE_PRODUCT_IMAGE_REQUEST'
const UPDATE_PRODUCT_IMAGE_SUCCESS = 'Products/UPDATE_PRODUCT_IMAGE_SUCCESS'
const UPDATE_PRODUCT_IMAGE_FAILURE = 'Products/UPDATE_PRODUCT_IMAGE_FAILURE'

const DELETE_PRODUCT_IMAGE_REQUEST = 'Products/DELETE_PRODUCT_IMAGE_REQUEST'
const DELETE_PRODUCT_IMAGE_SUCCESS = 'Products/DELETE_PRODUCT_IMAGE_SUCCESS'
const DELETE_PRODUCT_IMAGE_FAILURE = 'Products/DELETE_PRODUCT_IMAGE_FAILURE'

const DELETE_PRODUCTS_REQUEST = 'Products/DELETE_PRODUCTS_REQUEST'
const DELETE_PRODUCTS_SUCCESS = 'Products/DELETE_PRODUCTS_SUCCESS'
const DELETE_PRODUCTS_FAILURE = 'Products/DELETE_PRODUCTS_FAILURE'

const DELETE_PRODUCTS_QUANTITY_REQUEST =
  'Products/DELETE_PRODUCT_QUANTITY_REQUEST'
const DELETE_PRODUCTS_QUANTITY_SUCCESS =
  'Products/DELETE_PRODUCT_QUANTITY_SUCCESS'
const DELETE_PRODUCTS_QUANTITY_FAILURE =
  'Products/DELETE_PRODUCTS_QUANTITY_FAILURE'
// Initialize State
const initialState = {
  isLoading: false,
  productsList: [],
  productImageUpdate: {},
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
        productsList: action.payload,
        productImageUpdate: {}
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
    case UPDATE_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_PRODUCT_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_PRODUCT_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productImageUpdate: action.payload
      }
    case UPDATE_PRODUCT_IMAGE_FAILURE:
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
    case DELETE_PRODUCT_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_PRODUCT_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_PRODUCT_IMAGE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_PRODUCTS_QUANTITY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_PRODUCTS_QUANTITY_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_PRODUCTS_QUANTITY_FAILURE:
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

  // console.log(data)
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PRODUCTS_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.PRODUCTS, 
        data,
        config
      )

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
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_PRODUCTS_FAILURE
      })
    }
  }
}

export const updateActiveProducts = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PRODUCTS_REQUEST
      })
      const formData = { is_active: data }

      const response = await API.put(
        EndPoints.PRODUCTS + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_PRODUCTS_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCTS_FAILURE
      })
      message.error(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const updateProducts = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PRODUCTS_REQUEST
      })

      const config = {
        headers: { 'content-type': 'application/json' }
      }

      const response = await API.put(
        EndPoints.PRODUCTS + `/${data.id}`,
        data,
        config
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_PRODUCTS_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCTS_FAILURE
      })
      message.error(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const updateProductImage = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PRODUCT_IMAGE_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(
        EndPoints.PRODUCTS + '/uploading',
        data,
        config
      )
      if (response.status === HTTP_STATUS_CODE.CREATED) {
        dispatch({
          type: UPDATE_PRODUCT_IMAGE_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCT_IMAGE_FAILURE
      })
      message.error(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const updateQuantityPrice = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PRODUCTS_REQUEST
      })

      const response = await API.put(
        EndPoints.PRODUCTS + `/quantity/${id}`,
        data
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_PRODUCTS_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCTS_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const deleteQuantityPrice = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PRODUCTS_QUANTITY_REQUEST
      })

      const response = await API.delete(
        EndPoints.PRODUCTS + '/quantity/' + `${id}`
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_PRODUCTS_QUANTITY_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_PRODUCTS_QUANTITY_FAILURE
      })
    }
  }
}

export const deleteProductImage = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PRODUCT_IMAGE_REQUEST
      })

      await API.delete(EndPoints.PRODUCTS + `/uploading/${id}`)
      dispatch({
        type: DELETE_PRODUCTS_SUCCESS
      })
      message.success(RESPONSE_MESSAGE.DELETED)
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_PRODUCTS_FAILURE
      })
    }
  }
}
