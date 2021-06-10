import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_BANNER_LIST_REQUEST = 'Managebanner/FETCH_BANNER_LIST_REQUEST'
const FETCH_BANNER_LIST_SUCCESS = 'Managebanner/FETCH_BANNER_LIST_SUCCESS'
const FETCH_BANNER_LIST_FAILURE = 'Managebanner/FETCH_BANNER_LIST_FAILURE'

const DELETE_BANNER_REQUEST = 'Managebanner/DELETE_BANNER_REQUEST'
const DELETE_BANNER_SUCCESS = 'Managebanner/DELETE_BANNER_SUCCESS'
const DELETE_BANNER_FAILURE = 'Managebanner/DELETE_BANNER_FAILURE'

const UPDATE_BANNER_REQUEST = 'Managebanner/UPDATE_BANNER_REQUEST'
const UPDATE_BANNER_SUCCESS = 'Managebanner/UPDATE_BANNER_SUCCESS'
const UPDATE_BANNER_FAILURE = 'Managebanner/UPDATE_BANNER_FAILURE'

const CREATE_BANNER_REQUEST = 'Managebanner/CREATE_BANNER_REQUEST'
const CREATE_BANNER_SUCCESS = 'Managebanner/CREATE_BANNER_SUCCESS'
const CREATE_BANNER_FAILURE = 'Managebanner/CREATE_BANNER_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  bannerList: [],
  banner: {},
  error: {}
}

// Default Reducer
const banner = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BANNER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_BANNER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bannerTypeList: action.payload
      }
    case FETCH_BANNER_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_BANNER_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_BANNER_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_BANNER_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_BANNER_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_BANNER_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default banner

// Action Creators
export const getbannerList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_BANNER_LIST_REQUEST
      })

      const response = await API.get(EndPoints.BANNER)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_BANNER_LIST_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_BANNER_LIST_FAILURE
      })
    }
  }
}

export const deletebanner = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_BANNER_REQUEST
      })

      const response = await API.delete(EndPoints.BANNER + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_BANNER_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_BANNER_FAILURE
      })
    }
  }
}

export const updatebanner = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_BANNER_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.patch(
        EndPoints.BANNER + '/' + id,
        data,
        config
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_BANNER_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_BANNER_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const createbanner = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_BANNER_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.BANNER, data, config)

      if (response.status === HTTP_STATUS_CODE.CREATED) {
        dispatch({
          type: CREATE_BANNER_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_BANNER_FAILURE
      })
    }
  }
}
