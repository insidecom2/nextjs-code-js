import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_PRINT_SIDE_LIST_REQUEST =
  'PrintSide/FETCH_PRINT_SIDE_LIST_REQUEST'
const FETCH_PRINT_SIDE_LIST_SUCCESS =
  'PrintSide/FETCH_PRINT_SIDE_LIST_SUCCESS'
const FETCH_PRINT_SIDE_LIST_FAILURE =
  'PrintSide/FETCH_PRINT_SIDE_LIST_FAILURE'

const FETCH_PRINT_SIDE_ID_REQUEST =
  'PrintSide/FETCH_PRINT_SIDE_ID_REQUEST'
const FETCH_PRINT_SIDE_ID_SUCCESS =
  'PrintSide/FETCH_PRINT_SIDE_ID_SUCCESS'
const FETCH_PRINT_SIDE_ID_FAILURE =
  'PrintSide/FETCH_PRINT_SIDE_ID_FAILURE'

const CREATE_PRINT_SIDE_REQUEST = 'PrintSide/CREATE_PRINT_SIDE_REQUEST'
const CREATE_PRINT_SIDE_SUCCESS = 'PrintSide/CREATE_PRINT_SIDE_SUCCESS'
const CREATE_PRINT_SIDE_FAILURE = 'PrintSide/CREATE_PRINT_SIDE_FAILURE'

const DELETE_PRINT_SIDE_REQUEST = 'PrintSide/DELETE_PRINT_SIDE_REQUEST'
const DELETE_PRINT_SIDE_SUCCESS = 'PrintSide/DELETE_PRINT_SIDE_SUCCESS'
const DELETE_PRINT_SIDE_FAILURE = 'PrintSide/DELETE_PRINT_SIDE_FAILURE'

const ACTIVE_PRINT_SIDE_REQUEST = 'PrintSide/ACTIVE_PRINT_SIDE_REQUEST'
const ACTIVE_PRINT_SIDE_SUCCESS = 'PrintSide/ACTIVE_PRINT_SIDE_SUCCESS'
const ACTIVE_PRINT_SIDE_FAILURE = 'PrintSide/ACTIVE_PRINT_SIDE_FAILURE'

const UPDATE_PRINT_SIDE_REQUEST = 'PrintSide/UPDATE_PRINT_SIDE_REQUEST'
const UPDATE_PRINT_SIDE_SUCCESS = 'PrintSide/UPDATE_PRINT_SIDE_SUCCESS'
const UPDATE_PRINT_SIDE_FAILURE = 'PrintSide/UPDATE_PRINT_SIDE_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  printSideList: [],
  error: {}
}

// Default Reducer
const printSide = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRINT_SIDE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_PRINT_SIDE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_PRINT_SIDE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_PRINT_SIDE_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRINT_SIDE_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryType: action.payload
      }
    case FETCH_PRINT_SIDE_ID_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case ACTIVE_PRINT_SIDE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case ACTIVE_PRINT_SIDE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case ACTIVE_PRINT_SIDE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_PRINT_SIDE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRINT_SIDE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        printSideList: action.payload
      }
    case FETCH_PRINT_SIDE_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_PRINT_SIDE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_PRINT_SIDE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_PRINT_SIDE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_PRINT_SIDE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_PRINT_SIDE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_PRINT_SIDE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default printSide

// Action Creators
export const getPrintSideList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRINT_SIDE_LIST_REQUEST
      })

      const response = await API.get(EndPoints.PRINT_SIDE)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_PRINT_SIDE_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_PRINT_SIDE_LIST_FAILURE
      })
    }
  }
}

export const createPrintSide = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PRINT_SIDE_REQUEST
      })

      const response = await API.post(EndPoints.PRINT_SIDE, data)

      if (
        response.status === HTTP_STATUS_CODE.OK ||
        response.status === HTTP_STATUS_CODE.CREATED
      ) {
        dispatch({
          type: CREATE_PRINT_SIDE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_PRINT_SIDE_FAILURE
      })
    }
  }
}

export const deletePrintSide = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PRINT_SIDE_REQUEST
      })

      const response = await API.delete(EndPoints.PRINT_SIDE + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_PRINT_SIDE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_PRINT_SIDE_FAILURE
      })
    }
  }
}

export const isActivePrintSide = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTIVE_PRINT_SIDE_REQUEST
      })
      const formData = { is_active: data }
  
      const response = await API.put(
        EndPoints.PRINT_SIDE + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: ACTIVE_PRINT_SIDE_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: ACTIVE_PRINT_SIDE_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const getPrintSideById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRINT_SIDE_ID_REQUEST 
      })

      const response = await API.get(EndPoints.PRINT_SIDE + '/' + id)
      // console.log(EndPoints.SIZE + '/' + id)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_PRINT_SIDE_ID_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_PRINT_SIDE_ID_FAILURE
      })
    }
  }
}

export const updatePrintSide = (id, data) => {
  // console.log(data.image)
  return async (dispatch) => {
    // console.log('img', data.image.file)
    try {
      dispatch({
        type: UPDATE_PRINT_SIDE_REQUEST
      })
      const formData = new FormData()
      formData.set('name', data.name)
      formData.set('code', data.name)
      formData.append('image', data.image)
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const response = await API.put(
        EndPoints.PRINT_SIDE + '/' + id,
        formData,
        config
      )
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_PRINT_SIDE_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PRINT_SIDE_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}
