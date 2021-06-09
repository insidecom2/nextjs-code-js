import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_PROMOTION_LIST_REQUEST =
  'ManagePromotion/FETCH_PROMOTION_LIST_REQUEST'
const FETCH_PROMOTION_LIST_SUCCESS =
  'ManagePromotion/FETCH_PROMOTION_LIST_SUCCESS'
const FETCH_PROMOTION_LIST_FAILURE =
  'ManagePromotion/FETCH_PROMOTION_LIST_FAILURE'

const DELETE_PROMOTION_REQUEST = 'ManagePromotion/DELETE_PROMOTION_REQUEST'
const DELETE_PROMOTION_SUCCESS = 'ManagePromotion/DELETE_PROMOTION_SUCCESS'
const DELETE_PROMOTION_FAILURE = 'ManagePromotion/DELETE_PROMOTION_FAILURE'

const UPDATE_PROMOTION_REQUEST = 'ManagePromotion/UPDATE_PROMOTION_REQUEST'
const UPDATE_PROMOTION_SUCCESS = 'ManagePromotion/UPDATE_PROMOTION_SUCCESS'
const UPDATE_PROMOTION_FAILURE = 'ManagePromotion/UPDATE_PROMOTION_FAILURE'

const CREATE_PROMOTION_REQUEST = 'ManagePromotion/CREATE_PROMOTION_REQUEST'
const CREATE_PROMOTION_SUCCESS = 'ManagePromotion/CREATE_PROMOTION_SUCCESS'
const CREATE_PROMOTION_FAILURE = 'ManagePromotion/CREATE_PROMOTION_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  PromotionList: [],
  Promotion: {},
  error: {}
}

// Default Reducer
const promotion = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROMOTION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PROMOTION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        PromotionTypeList: action.payload
      }
    case FETCH_PROMOTION_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_PROMOTION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_PROMOTION_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_PROMOTION_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_PROMOTION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_PROMOTION_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_PROMOTION_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default promotion

// Action Creators
export const getPromotionList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PROMOTION_LIST_REQUEST
      })

      const response = await API.get(EndPoints.PROMOTION)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_PROMOTION_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_PROMOTION_LIST_FAILURE
      })
    }
  }
}

export const updateActivePromotion = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PROMOTION_REQUEST
      })
      const formData = { is_active: data }

      const response = await API.patch(
        EndPoints.PROMOTION + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_PROMOTION_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PROMOTION_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const deletePromotion = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PROMOTION_REQUEST
      })

      const response = await API.delete(EndPoints.PROMOTION + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_PROMOTION_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_PROMOTION_FAILURE
      })
    }
  }
}

export const updatePromotion = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PROMOTION_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.patch(
        EndPoints.PROMOTION + '/' + id,
        data,
        config
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_PROMOTION_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PROMOTION_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const createPromotion = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PROMOTION_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.PROMOTION, data, config)

      if (response.status === HTTP_STATUS_CODE.CREATED) {
        dispatch({
          type: CREATE_PROMOTION_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_PROMOTION_FAILURE
      })
    }
  }
}
