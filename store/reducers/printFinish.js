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

const CREATE_PRINT_FINISH_REQUEST = 'PrintFinish/CREATE_PRINT_FINISH_REQUEST'
const CREATE_PRINT_FINISH_SUCCESS = 'PrintFinish/CREATE_PRINT_FINISH_SUCCESS'
const CREATE_PRINT_FINISH_FAILURE = 'PrintFinish/CREATE_PRINT_FINISH_FAILURE'

const DELETE_PRINT_FINISH_REQUEST = 'PrintFinish/DELETE_PRINT_FINISH_REQUEST'
const DELETE_PRINT_FINISH_SUCCESS = 'PrintFinish/DELETE_PRINT_FINISH_SUCCESS'
const DELETE_PRINT_FINISH_FAILURE = 'PrintFinish/DELETE_PRINT_FINISH_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  printFinishList: [],
  error: {}
}

// Default Reducer
const printFinish = (state = initialState, action) => {
  switch (action.type) {
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
