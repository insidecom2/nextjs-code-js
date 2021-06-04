import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { message } from 'antd'
import Cookies from 'js-cookie'
import { HTTP_STATUS_CODE } from 'utils/constants'

const LOGIN_REQUEST = 'Auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'Auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'Auth/LOGIN_FAILURE'

const LOGOUT_REQUEST = 'Auth/LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'Auth/LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'Auth/LOGOUT_FAILURE'

const FETCH_CURRENT_USER_REQUEST = 'Auth/FETCH_CURRENT_USER_REQUEST'
const FETCH_CURRENT_USER_SUCCESS = 'Auth/FETCH_CURRENT_USER_SUCCESS'
const FETCH_CURRENT_USER_FAILURE = 'Auth/FETCH_CURRENT_USER_FAILURE'

const STORE_USER = 'Auth/STORE_USER'
const REMOVE_USER = 'Auth/REMOVE_USER'

// Initialize State
const initialState = {
  isAuthenticate: false,
  user: {},
  isLoginLoading: false,
  isLoading: false,
  error: {},
  token: ''
}

// Default Reducer
const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoginLoading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginLoading: false,
        isAuthenticate: true,
        token: action.payload
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoginLoading: false
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoginLoading: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoginLoading: false,
        isAuthenticate: false,
        token: ''
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoginLoading: false
      }
    case FETCH_CURRENT_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      }
    case FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case STORE_USER:
      return {
        ...state,
        user: action.payload
      }
    case REMOVE_USER:
      return {
        ...state,
        isAuthenticate: false,
        token: '',
        user: {}
      }
    default:
      return state
  }
}

export default auth

// Action Creators
export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CURRENT_USER_REQUEST
      })

      const response = await API.get(EndPoints.USER)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_CURRENT_USER_SUCCESS,
          payload: response.data.data[0]
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_CURRENT_USER_FAILURE
      })
    }
  }
}

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST
      })

      const response = await API.post(EndPoints.AUTH + `/login`, data)
      const token = response.data.access_token

      dispatch({
        type: LOGIN_SUCCESS,
        payload: token
      })

      Cookies.set('token', token)
      // Cookies.set('token', token, { sameSite: 'strict', secure: true })
    } catch (err) {
      message.error('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ตรงกัน!')
      dispatch({
        type: LOGIN_FAILURE
      })
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGOUT_REQUEST
      })

      dispatch({
        type: LOGOUT_SUCCESS
      })

      dispatch({
        type: REMOVE_USER,
        payload: {}
      })

      Cookies.remove('token')
    } catch (err) {
      dispatch({
        type: LOGOUT_FAILURE
      })
    }
  }
}

export const removeStoreUser = () => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_USER,
      payload: {}
    })
  }
}
