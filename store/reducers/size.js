import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_SIZE_LIST_REQUEST = 'Size/FETCH_SIZE_LIST_REQUEST'
const FETCH_SIZE_LIST_SUCCESS = 'Size/FETCH_SIZE_LIST_SUCCESS'
const FETCH_SIZE_LIST_FAILURE = 'Size/FETCH_SIZE_LIST_FAILURE'

const GET_SIZE_TYPE_REQUEST = 'Size/GET_SIZE_TYPE_REQUEST'
const GET_SIZE_TYPE_SUCCESS = 'Size/GET_SIZE_TYPE_SUCCESS'
const GET_SIZE_TYPE_FAILURE = 'Size/GET_SIZE_TYPE_FAILURE'

const CREATE_SIZE_REQUEST = 'Size/CREATE_SIZE_REQUEST'
const CREATE_SIZE_SUCCESS = 'Size/CREATE_SIZE_SUCCESS'
const CREATE_SIZE_FAILURE = 'Size/CREATE_SIZE_FAILURE'

const DELETE_SIZE_REQUEST = 'Size/DELETE_SIZE_REQUEST'
const DELETE_SIZE_SUCCESS = 'Size/DELETE_SIZE_SUCCESS'
const DELETE_SIZE_FAILURE = 'Size/DELETE_SIZE_FAILURE'

const UPDATE_SIZE_ACTIVE_REQUEST = 'Size/UPDATE_SIZE_ACTIVE_REQUEST'
const UPDATE_SIZE_ACTIVE_SUCCESS = 'Size/UPDATE_SIZE_ACTIVE_SUCCESS'
const UPDATE_SIZE_ACTIVE_FAILURE = 'Size/UPDATE_SIZE_ACTIVE_FAILURE'

const UPDATE_SIZE_REQUEST = 'Size/UPDATE_SIZE_REQUEST'
const UPDATE_SIZE_SUCCESS = 'Size/UPDATE_SIZE_SUCCESS'
const UPDATE_SIZE_FAILURE = 'Size/UPDATE_SIZE_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  sizeList: [],
  error: {}
}

// Default Reducer
const size = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SIZE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_SIZE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_SIZE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case UPDATE_SIZE_ACTIVE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_SIZE_ACTIVE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_SIZE_ACTIVE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case GET_SIZE_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_SIZE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryType: action.payload
      }
    case GET_SIZE_TYPE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case FETCH_SIZE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_SIZE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sizeList: action.payload
      }
    case FETCH_SIZE_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_SIZE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_SIZE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_SIZE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_SIZE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_SIZE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_SIZE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default size

// Action Creators
export const getSizeList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SIZE_LIST_REQUEST
      })

      const response = await API.get(EndPoints.SIZE)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_SIZE_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_SIZE_LIST_FAILURE
      })
    }
  }
}

export const getSizeTypeListById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_SIZE_TYPE_REQUEST
      })

      const response = await API.get(EndPoints.SIZE + '/' + id)
      // console.log(EndPoints.SIZE + '/' + id)
      if (response.status === HTTP_STATUS_CODE.OK) {

        dispatch({
          type: GET_SIZE_TYPE_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: GET_SIZE_TYPE_FAILURE
      })
    }
  }
}

export const createSize = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_SIZE_REQUEST
      })

      const response = await API.post(EndPoints.SIZE, data)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_SIZE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_SIZE_FAILURE
      })
    }
  }
}

export const deleteSize = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_SIZE_REQUEST
      })

      const response = await API.delete(EndPoints.SIZE + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_SIZE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_SIZE_FAILURE
      })
    }
  }
}

export const isActiveSizeType = (id, data) => {
  
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SIZE_ACTIVE_REQUEST
      })
      let formData = { is_active: data }
      console.log(formData)
      const response = await API.put(
        EndPoints.SIZE + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_SIZE_ACTIVE_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SIZE_ACTIVE_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const updateSize = (id, data) => {
  
  return async (dispatch) => {
    
    try {
      dispatch({
        type: UPDATE_SIZE_REQUEST
      })

      const response = await API.put(
        EndPoints.SIZE + '/' + id,
        data
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_SIZE_TYPE_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SIZE_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}