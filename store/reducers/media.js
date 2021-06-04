import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_MEDIA_REQUEST = 'Products/FETCH_MEDIA_REQUEST'
const FETCH_MEDIA_SUCCESS = 'Products/FETCH_MEDIA_SUCCESS'
const FETCH_MEDIA_FAILURE = 'Products/FETCH_MEDIA_FAILURE'

const CREATE_MEDIA_REQUEST = 'Products/CREATE_MEDIA_REQUEST'
const CREATE_MEDIA_SUCCESS = 'Products/CREATE_MEDIA_SUCCESS'
const CREATE_MEDIA_FAILURE = 'Products/CREATE_MEDIA_FAILURE'

const DELETE_MEDIA_REQUEST = 'Products/DELETE_MEDIA_REQUEST'
const DELETE_MEDIA_SUCCESS = 'Products/DELETE_MEDIA_SUCCESS'
const DELETE_MEDIA_FAILURE = 'Products/DELETE_MEDIA_FAILURE'

const UPDATE_MEDIA_REQUEST = 'Products/UPDATE_MEDIA_REQUEST'
const UPDATE_MEDIA_SUCCESS = 'Products/UPDATE_MEDIA_SUCCESS'
const UPDATE_MEDIA_FAILURE = 'Products/UPDATE_MEDIA_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  mediaList: [],
  error: {}
}

// Default Reducer
const media = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MEDIA_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_MEDIA_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_MEDIA_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case FETCH_MEDIA_REQUEST:
      return {
        ...state,
        error: action,
        isLoading: true
      }
    case FETCH_MEDIA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: action,
        mediaList: action.payload
      }
    case FETCH_MEDIA_FAILURE:
      return {
        ...state,
        error: action,
        isLoading: false,
        productsList: []
      }
    case CREATE_MEDIA_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_MEDIA_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_MEDIA_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case DELETE_MEDIA_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_MEDIA_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_MEDIA_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default media

// Action Creators
export const getMedia = (year,month) => {
  
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_MEDIA_REQUEST
      })

      const response = await API.get(EndPoints.MEDIA 
      ,
      {
        params:{
          year:year,
          month:month
        }
      }
      )
  
      if (response.status === HTTP_STATUS_CODE.OK) {
        // console.log("ok"+response.data)
        dispatch({
          type: FETCH_MEDIA_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
     
      message.error(RESPONSE_MESSAGE.DATANOTFOUND)
      dispatch({
        type: FETCH_MEDIA_FAILURE
      })
    }
  }
}

export const deleteMedia = (name) => {

    
    return async (dispatch) => {
      try {
        dispatch({
          type: DELETE_MEDIA_REQUEST
        })
  
        const response = await API.post(EndPoints.MEDIA + `/upload-delete`,{ path: name})
   
        if (response.status === HTTP_STATUS_CODE.CREATED) {
          dispatch({
            type: DELETE_MEDIA_SUCCESS
          })
          message.success(RESPONSE_MESSAGE.DELETED)
        }
      } catch (err) {
        message.error(RESPONSE_MESSAGE.FAILURE)
        dispatch({
          type: DELETE_MEDIA_FAILURE
        })
      }
    }
  }

  export const createMedia = (data) => {
    return async (dispatch) => {
      try {
        dispatch({
          type: CREATE_MEDIA_REQUEST
        })

        const config = {
          headers: { 'content-type': 'multipart/form-data' }
        }
  
        const response = await API.post(EndPoints.MEDIA + '/upload', 
          data,
          config
          )
          
        if (response.status === HTTP_STATUS_CODE.CREATED) {
          
          dispatch({
            type: CREATE_MEDIA_SUCCESS
          })
          message.success(RESPONSE_MESSAGE.SUCCESS)
        }

      } catch (err) {
        message.error(RESPONSE_MESSAGE.FAILURE)
        dispatch({
          type: CREATE_MEDIA_FAILURE
        })
      }
    }
  }



