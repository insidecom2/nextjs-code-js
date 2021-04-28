import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_PRINT_FINISH_LIST_REQUEST =
  'PrintFinish/FETCH_PRINT_FINISH_LIST_REQUEST'
const FETCH_PRINT_FINISH_LIST_SUCCESS =
  'PrintFinish/FETCH_PRINT_FINISH_LIST_SUCCESS'
const FETCH_PRINT_FINISH_LIST_FAILURE =
  'PrintFinish/FETCH_PRINT_FINISH_LIST_FAILURE'

const FETCH_PRINT_FINISH_ID_REQUEST =
  'PrintFinish/FETCH_PRINT_ID_LIST_REQUEST'
const FETCH_PRINT_FINISH_ID_SUCCESS =
  'PrintFinish/FETCH_PRINT_ID_LIST_SUCCESS'
const FETCH_PRINT_FINISH_ID_FAILURE =
  'PrintFinish/FETCH_PRINT_ID_LIST_FAILURE'

const CREATE_PRINT_FINISH_REQUEST = 'PrintFinish/CREATE_PRINT_FINISH_REQUEST'
const CREATE_PRINT_FINISH_SUCCESS = 'PrintFinish/CREATE_PRINT_FINISH_SUCCESS'
const CREATE_PRINT_FINISH_FAILURE = 'PrintFinish/CREATE_PRINT_FINISH_FAILURE'

const DELETE_PRINT_FINISH_REQUEST = 'PrintFinish/DELETE_PRINT_FINISH_REQUEST'
const DELETE_PRINT_FINISH_SUCCESS = 'PrintFinish/DELETE_PRINT_FINISH_SUCCESS'
const DELETE_PRINT_FINISH_FAILURE = 'PrintFinish/DELETE_PRINT_FINISH_FAILURE'

const ACTIVE_PRINT_FINISH_REQUEST = 'PrintFinish/ACTIVE_PRINT_FINISH_REQUEST'
const ACTIVE_PRINT_FINISH_SUCCESS = 'PrintFinish/ACTIVE_PRINT_FINISH_SUCCESS'
const ACTIVE_PRINT_FINISH_FAILURE = 'PrintFinish/ACTIVE_PRINT_FINISH_FAILURE'

const UPDATE_PRINT_FINISH_REQUEST = 'PrintFinish/UPDATE_PRINT_FINISH_REQUEST'
const UPDATE_PRINT_FINISH_SUCCESS = 'PrintFinish/UPDATE_PRINT_FINISH_SUCCESS'
const UPDATE_PRINT_FINISH_FAILURE = 'PrintFinish/UPDATE_PRINT_FINISH_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  printFinishList: [],
  error: {}
}

// Default Reducer
const printFinish = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRINT_FINISH_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_PRINT_FINISH_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_PRINT_FINISH_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_PRINT_FINISH_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRINT_FINISH_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryType: action.payload
      }
    case FETCH_PRINT_FINISH_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case ACTIVE_PRINT_FINISH_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case ACTIVE_PRINT_FINISH_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case ACTIVE_PRINT_FINISH_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_PRINT_FINISH_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRINT_FINISH_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        printFinishList: action.payload
      }
    case FETCH_PRINT_FINISH_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_PRINT_FINISH_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_PRINT_FINISH_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_PRINT_FINISH_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_PRINT_FINISH_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_PRINT_FINISH_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_PRINT_FINISH_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default printFinish

// Action Creators
export const getPrintFinishList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRINT_FINISH_LIST_REQUEST
      })

      const response = await API.get(EndPoints.PRINT_FINISH)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_PRINT_FINISH_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_PRINT_FINISH_LIST_FAILURE
      })
    }
  }
}

export const createPrintFinish = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PRINT_FINISH_REQUEST
      })

      const response = await API.post(EndPoints.PRINT_FINISH, data)

      if (
        response.status === HTTP_STATUS_CODE.OK ||
        response.status === HTTP_STATUS_CODE.CREATED
      ) {
        dispatch({
          type: CREATE_PRINT_FINISH_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_PRINT_FINISH_FAILURE
      })
    }
  }
}

export const deletePrintFinish = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PRINT_FINISH_REQUEST
      })

      const response = await API.delete(EndPoints.PRINT_FINISH + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_PRINT_FINISH_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_PRINT_FINISH_FAILURE
      })
    }
  }
}

export const getPrintFinishById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRINT_FINISH_ID_REQUEST
      })

      const response = await API.get(EndPoints.PRINT_FINISH + '/' + id)
     
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_PRINT_FINISH_ID_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_PRINT_FINISH_ID_FAILURE
      })
    }
  }
}


export const updateActivePrintFinish = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTIVE_PRINT_FINISH_REQUEST
      })
      const formData = { is_active: data }
      const response = await API.put(
        EndPoints.PRINT_FINISH + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: ACTIVE_PRINT_FINISH_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: ACTIVE_PRINT_FINISH_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const updatePrintFinish = (id, data) => {

  return async (dispatch) => {

    try {
      dispatch({
        type: UPDATE_PRINT_FINISH_REQUEST
      })
      const formData = new FormData()
      formData.set('name', data.name)
      formData.set('code', data.name)
      formData.append('image', data.image)
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const response = await API.put(
        EndPoints.PRINT_FINISH + '/' + id,
        formData,
        config
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
     
        dispatch({
          type: UPDATE_PRINT_FINISH_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PRINT_FINISH_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}
