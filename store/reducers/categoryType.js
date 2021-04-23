import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_CATEGORY_TYPE_LIST_REQUEST =
  'CategoryType/FETCH_CATEGORY_TYPE_LIST_REQUEST'
const FETCH_CATEGORY_TYPE_LIST_SUCCESS =
  'CategoryType/FETCH_CATEGORY_TYPE_LIST_SUCCESS'
const FETCH_CATEGORY_TYPE_LIST_FAILURE =
  'CategoryType/FETCH_CATEGORY_TYPE_LIST_FAILURE'

const CREATE_CATEGORY_TYPE_REQUEST = 'CategoryType/CREATE_CATEGORY_TYPE_REQUEST'
const CREATE_CATEGORY_TYPE_SUCCESS = 'CategoryType/CREATE_CATEGORY_TYPE_SUCCESS'
const CREATE_CATEGORY_TYPE_FAILURE = 'CategoryType/CREATE_CATEGORY_TYPE_FAILURE'

const UPDATE_CATEGORY_TYPE_REQUEST = 'CategoryType/UPDATE_CATEGORY_TYPE_REQUEST'
const UPDATE_CATEGORY_TYPE_SUCCESS = 'CategoryType/UPDATE_CATEGORY_TYPE_SUCCESS'
const UPDATE_CATEGORY_TYPE_FAILURE = 'CategoryType/UPDATE_CATEGORY_TYPE_FAILURE'

const GET_CATEGORY_TYPE_REQUEST = 'CategoryType/GET_CATEGORY_TYPE_REQUEST'
const GET_CATEGORY_TYPE_SUCCESS = 'CategoryType/GET_CATEGORY_TYPE_SUCCESS'
const GET_CATEGORY_TYPE_FAILURE = 'CategoryType/GET_CATEGORY_TYPE_FAILURE'

const DELETE_CATEGORY_TYPE_REQUEST = 'CategoryType/DELETE_CATEGORY_TYPE_REQUEST'
const DELETE_CATEGORY_TYPE_SUCCESS = 'CategoryType/DELETE_CATEGORY_TYPE_SUCCESS'
const DELETE_CATEGORY_TYPE_FAILURE = 'CategoryType/DELETE_CATEGORY_TYPE_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  categoryTypeList: [],
  categoryType: {},
  error: {}
}

// Default Reducer
const categoryType = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_TYPE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_CATEGORY_TYPE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryTypeList: action.payload
      }
    case FETCH_CATEGORY_TYPE_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_CATEGORY_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_CATEGORY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_CATEGORY_TYPE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_CATEGORY_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_CATEGORY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_CATEGORY_TYPE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case GET_CATEGORY_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_CATEGORY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryType: action.payload
      }
    case GET_CATEGORY_TYPE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_CATEGORY_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_CATEGORY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_CATEGORY_TYPE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default categoryType

// Action Creators
export const getCategoryTypeList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CATEGORY_TYPE_LIST_REQUEST
      })

      const response = await API.get(EndPoints.CATEGORY_TYPE)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_CATEGORY_TYPE_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_CATEGORY_TYPE_LIST_FAILURE
      })
    }
  }
}

export const createCategoryType = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_CATEGORY_TYPE_REQUEST
      })

      const response = await API.post(EndPoints.CATEGORY_TYPE, data)

      if (response.status === HTTP_STATUS_CODE.CREATED) {
        dispatch({
          type: CREATE_CATEGORY_TYPE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_CATEGORY_TYPE_FAILURE
      })
    }
  }
}

export const getCategoryTypeListById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_CATEGORY_TYPE_REQUEST
      })

      const response = await API.get(EndPoints.CATEGORY_TYPE + '/' + id)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: GET_CATEGORY_TYPE_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: GET_CATEGORY_TYPE_FAILURE
      })
    }
  }
}

export const updateCategoryType = (id, data) => {

  // console.log(data.img)
  return async (dispatch) => {
    // console.log('img', data.image.file)
    try {
      dispatch({
        type: UPDATE_CATEGORY_TYPE_REQUEST
      })
      // let formData = new FormData()
      // formData.append('image', data.image)
      // formData.append('name', data.name)
      // formData.append('category', data.category)
          

      console.log(formData.append)
      const response = await API.put(
        EndPoints.CATEGORY_TYPE + '/' + id,
        {
          'name': data.name,
          'category': data.category
        }
        ,  
        {'image': data.img}
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_CATEGORY_TYPE_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_CATEGORY_TYPE_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const isActiveCategoryType = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_CATEGORY_TYPE_REQUEST
      })
      let formData = { is_active: data }

      const response = await API.put(
        EndPoints.CATEGORY_TYPE + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_CATEGORY_TYPE_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_CATEGORY_TYPE_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}

export const deleteCategoryType = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_CATEGORY_TYPE_REQUEST
      })

      const response = await API.delete(EndPoints.CATEGORY_TYPE + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_CATEGORY_TYPE_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.DELETED)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_CATEGORY_TYPE_FAILURE
      })
    }
  }
}
