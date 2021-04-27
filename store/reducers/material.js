import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_MATERIAL_LIST_REQUEST = 'Material/FETCH_MATERIAL_LIST_REQUEST'
const FETCH_MATERIAL_LIST_SUCCESS = 'Material/FETCH_MATERIAL_LIST_SUCCESS'
const FETCH_MATERIAL_LIST_FAILURE = 'Material/FETCH_MATERIAL_LIST_FAILURE'

const CREATE_MATERIAL_REQUEST = 'Material/CREATE_MATERIAL_REQUEST'
const CREATE_MATERIAL_SUCCESS = 'Material/CREATE_MATERIAL_SUCCESS'
const CREATE_MATERIAL_FAILURE = 'Material/CREATE_MATERIAL_FAILURE'

const ACTIVE_MATERIAL_REQUEST = 'Material/ACTIVE_MATERIAL_REQUEST'
const ACTIVE_MATERIAL_SUCCESS = 'Material/ACTIVE_MATERIAL_SUCCESS'
const ACTIVE_MATERIAL_FAILURE = 'Material/ACTIVE_MATERIAL_FAILURE'

const DELETE_MATERIAL_REQUEST = 'Material/DELETE_MATERIAL_REQUEST'
const DELETE_MATERIAL_SUCCESS = 'Material/DELETE_MATERIAL_SUCCESS'
const DELETE_MATERIAL_FAILURE = 'Material/DELETE_MATERIAL_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  materialList: [],
  error: {}
}

// Default Reducer
const material = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MATERIAL_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_MATERIAL_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        materialList: action.payload
      }
    case FETCH_MATERIAL_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case CREATE_MATERIAL_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_MATERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_MATERIAL_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_MATERIAL_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_MATERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_MATERIAL_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default material

// Action Creators
export const getMaterialList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_MATERIAL_LIST_REQUEST
      })

      const response = await API.get(EndPoints.MATERIAL)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_MATERIAL_LIST_SUCCESS,
          payload: response.data.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_MATERIAL_LIST_FAILURE
      })
    }
  }
}

export const createMaterial = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_MATERIAL_REQUEST
      })

      const response = await API.post(EndPoints.MATERIAL, data)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: CREATE_MATERIAL_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: CREATE_MATERIAL_FAILURE
      })
    }
  }
}

export const deleteMaterial = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_MATERIAL_REQUEST
      })

      const response = await API.delete(EndPoints.MATERIAL + `/${id}`)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: DELETE_MATERIAL_SUCCESS
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      message.error(RESPONSE_MESSAGE.FAILURE)
      dispatch({
        type: DELETE_MATERIAL_FAILURE
      })
    }
  }
}

export const isActiveMaterial = (id, data) => {
  
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTIVE_MATERIAL_REQUEST
      })
      let formData = { is_active: data }
      console.log(formData)
      const response = await API.put(
        EndPoints.MATERIAL + '/active/' + id,
        formData
      )

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: ACTIVE_MATERIAL_SUCCESS,
          payload: response.data.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: ACTIVE_MATERIAL_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}
