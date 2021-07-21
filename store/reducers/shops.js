import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_SHOPS_LIST_REQUEST = 'shops/FETCH_SHOPS_LIST_REQUEST'
const FETCH_SHOPS_LIST_SUCCESS = 'shops/FETCH_SHOPS_LIST_SUCCESS'
const FETCH_SHOPS_LIST_FAILURE = 'shops/FETCH_SHOPS_LIST_FAILURE'

const FETCH_SHOPS_ID_REQUEST = 'Material/FETCH_SHOPS_ID_REQUEST'
const FETCH_SHOPS_ID_SUCCESS = 'Material/FETCH_SHOPS_ID_SUCCESS'
const FETCH_SHOPS_ID_FAILURE = 'Material/FETCH_SHOPS_ID_FAILURE'

const CREATE_SHOPS_REQUEST = 'shops/CREATE_SHOPS_REQUEST'
const CREATE_SHOPS_SUCCESS = 'shops/CREATE_SHOPS_SUCCESS'
const CREATE_SHOPS_FAILURE = 'shops/CREATE_SHOPS_FAILURE'

const UPDATE_SHOPS_REQUEST = 'shops/UPDATE_SHOPS_REQUEST'
const UPDATE_SHOPS_SUCCESS = 'shops/UPDATE_SHOPS_SUCCESS'
const UPDATE_SHOPS_FAILURE = 'shops/UPDATE_SHOPS_FAILURE'

const DELETE_SHOPS_REQUEST = 'shops/DELETE_SHOPS_REQUEST'
const DELETE_SHOPS_SUCCESS = 'shops/DELETE_SHOPS_SUCCESS'
const DELETE_SHOPS_FAILURE = 'shops/DELETE_SHOPS_FAILURE'

const DELETE_SHOPS_QUANTITY_REQUEST = 'shops/DELETE_PRODUCT_QUANTITY_REQUEST'
const DELETE_SHOPS_QUANTITY_SUCCESS = 'shops/DELETE_PRODUCT_QUANTITY_SUCCESS'
const DELETE_SHOPS_QUANTITY_FAILURE = 'shops/DELETE_SHOPS_QUANTITY_FAILURE'
// Initialize State
const initialState = {
  isLoading: false,
  shopsList: [],
  shopsImageUpdate: {},
  error: {}
}

// Default Reducer
const shops = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOPS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_SHOPS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shopsList: action.payload,
        shopsImageUpdate: {}
      }
    case FETCH_SHOPS_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_SHOPS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_SHOPS_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_SHOPS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_SHOPS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_SHOPS_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_SHOPS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_SHOPS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_SHOPS_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_SHOPS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    default:
      return state
  }
}

export default shops

// Action Creators
export const getShopsList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SHOPS_LIST_REQUEST
      })

      const response = await API.get(EndPoints.SHOPS)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_SHOPS_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_SHOPS_LIST_FAILURE
      })
    }
  }
}

export const getShopsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SHOPS_ID_REQUEST
      })

      const response = await API.get(EndPoints.MATERIAL + '/' + id)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_SHOPS_ID_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_SHOPS_ID_FAILURE
      })
    }
  }
}

export const createShops = (data) => {
  //console.log(data)
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_SHOPS_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.SHOPS, data, config)

      if (response.status === HTTP_STATUS_CODE.CREATED) {
        dispatch({
          type: CREATE_SHOPS_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_SHOPS_FAILURE
      })
    }
  }
}

export const deleteShops = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_SHOPS_REQUEST
      })

      const response = await API.delete(EndPoints.SHOPS + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_SHOPS_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_SHOPS_FAILURE
      })
    }
  }
}

export const updateShops = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SHOPS_REQUEST
      })

      const config = {
        headers: { 'content-type': 'application/json' }
      }

      const response = await API.patch(EndPoints.SHOPS + `/${id}`, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_SHOPS_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SHOPS_FAILURE
      })
      message.error(RESPONSE_MESSAGE.FAILURE)
    }
  }
}
