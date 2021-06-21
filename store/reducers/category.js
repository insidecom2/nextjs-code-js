import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_CATEGORY_LIST_REQUEST = 'Category/FETCH_CATEGORY_LIST_REQUEST'
const FETCH_CATEGORY_LIST_SUCCESS = 'Category/FETCH_CATEGORY_LIST_SUCCESS'
const FETCH_CATEGORY_LIST_FAILURE = 'Category/FETCH_CATEGORY_LIST_FAILURE'

const FETCH_CATEGORY_REQUEST = 'Category/FETCH_CATEGORY_REQUEST'
const FETCH_CATEGORY_SUCCESS = 'Category/FETCH_CATEGORY_SUCCESS'
const FETCH_CATEGORY_FAILURE = 'Category/FETCH_CATEGORY_FAILURE'

const CREATE_CATEGORY_REQUEST = 'Category/CREATE_CATEGORY_REQUEST'
const CREATE_CATEGORY_SUCCESS = 'Category/CREATE_CATEGORY_SUCCESS'
const CREATE_CATEGORY_FAILURE = 'Category/CREATE_CATEGORY_FAILURE'

const DELETE_CATEGORY_REQUEST = 'Category/DELETE_CATEGORY_REQUEST'
const DELETE_CATEGORY_SUCCESS = 'Category/DELETE_CATEGORY_SUCCESS'
const DELETE_CATEGORY_FAILURE = 'Category/DELETE_CATEGORY_FAILURE'

const UPDATE_CATEGORY_REQUEST = 'Category/UPDATE_CATEGORY_REQUEST'
const UPDATE_CATEGORY_SUCCESS = 'Category/UPDATE_CATEGORY_SUCCESS'
const UPDATE_CATEGORY_FAILURE = 'Category/UPDATE_CATEGORY_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  categoryList: [],
  category: {},
  error: {}
}

// Default Reducer
const category = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryList: action.payload
      }
    case FETCH_CATEGORY_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        category: action.payload
      }
    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default category

// Action Creators
export const getCategoryList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CATEGORY_LIST_REQUEST
      })

      const response = await API.get(EndPoints.CATEGORY)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_CATEGORY_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_CATEGORY_LIST_FAILURE
      })
    }
  }
}

export const getCategoryListById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CATEGORY_REQUEST
      })

      const response = await API.get(EndPoints.CATEGORY + `/${id}`)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_CATEGORY_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_CATEGORY_FAILURE
      })
    }
  }
}

export const createCategory = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_CATEGORY_REQUEST
      })

      const config = {
        headers: { 'content-type': 'application/json' }
      }

      const response = await API.post(EndPoints.CATEGORY, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_CATEGORY_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_CATEGORY_FAILURE
      })
    }
  }
}

export const updateCategory = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_CATEGORY_REQUEST
      })
      
      const config = {
        headers: { 'content-type': 'application/json' }
      }

      const response = await API.put(EndPoints.CATEGORY + `/${id}`, data, config)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_CATEGORY_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_CATEGORY_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const updateActiveCategory = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_CATEGORY_REQUEST
      })
      let formData = { is_active: data }

      const response = await API.put(
        EndPoints.CATEGORY + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_CATEGORY_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_CATEGORY_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_CATEGORY_REQUEST
      })

      const response = await API.delete(EndPoints.CATEGORY + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_CATEGORY_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_CATEGORY_FAILURE
      })
    }
  }
}
