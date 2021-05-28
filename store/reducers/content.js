import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_CONTENT_LIST_REQUEST = 'ManageContent/FETCH_CONTENT_LIST_REQUEST'
const FETCH_CONTENT_LIST_SUCCESS = 'ManageContent/FETCH_CONTENT_LIST_SUCCESS'
const FETCH_CONTENT_LIST_FAILURE = 'ManageContent/FETCH_CONTENT_LIST_FAILURE'

const DELETE_CONTENT_REQUEST = 'ManageContent/DELETE_CONTENT_REQUEST'
const DELETE_CONTENT_SUCCESS = 'ManageContent/DELETE_CONTENT_SUCCESS'
const DELETE_CONTENT_FAILURE = 'ManageContent/DELETE_CONTENT_FAILURE'

const UPDATE_CONTENT_REQUEST = 'ManageContent/UPDATE_CONTENT_REQUEST'
const UPDATE_CONTENT_SUCCESS = 'ManageContent/UPDATE_CONTENT_SUCCESS'
const UPDATE_CONTENT_FAILURE = 'ManageContent/UPDATE_CONTENT_FAILURE'

const CREATE_CONTENT_REQUEST = 'ManageContent/CREATE_CONTENT_REQUEST'
const CREATE_CONTENT_SUCCESS = 'ManageContent/CREATE_CONTENT_SUCCESS'
const CREATE_CONTENT_FAILURE = 'ManageContent/CREATE_CONTENT_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  ContentList: [],
  Content: {},
  error: {}
}

// Default Reducer
const content = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_CONTENT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ContentTypeList: action.payload
      }
    case FETCH_CONTENT_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_CONTENT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_CONTENT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default content

// Action Creators
export const getContentList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CONTENT_LIST_REQUEST
      })

      const response = await API.get(EndPoints.CONTENT)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_CONTENT_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_CONTENT_LIST_FAILURE
      })
    }
  }
}

export const deleteContent = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_CONTENT_REQUEST
      })

      const response = await API.delete(EndPoints.CONTENT + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_CONTENT_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_CONTENT_FAILURE
      })
    }
  }
}

export const createContent = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_CONTENT_REQUEST
      })
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.post(EndPoints.CONTENT, data, config)

      if (response.status === HTTP_STATUS_CODE.CREATED) {
        dispatch({
          type: CREATE_CONTENT_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_CONTENT_FAILURE
      })
    }
  }
}

export const updateActiveContent = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_CONTENT_REQUEST
      })
      const formData = { is_active: data }

      const response = await API.put(
        EndPoints.CONTENT + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_CONTENT_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_CONTENT_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const updateContent = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_CONTENT_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.put(EndPoints.CONTENT + '/' + id, data, config)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_CONTENT_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_CONTENT_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}
