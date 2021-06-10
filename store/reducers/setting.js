import API from 'api/Http'
import * as EndPoints from 'api/EndPoints'
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE } from 'utils/constants'
import { message } from 'antd'

const FETCH_SETTING_LIST_REQUEST = 'ManageSetting/FETCH_SETTING_LIST_REQUEST'
const FETCH_SETTING_LIST_SUCCESS = 'ManageSetting/FETCH_SETTING_LIST_SUCCESS'
const FETCH_SETTING_LIST_FAILURE = 'ManageSetting/FETCH_SETTING_LIST_FAILURE'

const UPDATE_SETTING_REQUEST = 'ManageSetting/UPDATE_SETTING_REQUEST'
const UPDATE_SETTING_SUCCESS = 'ManageSetting/UPDATE_SETTING_SUCCESS'
const UPDATE_SETTING_FAILURE = 'ManageSetting/UPDATE_SETTING_FAILURE'

// Initialize State
const initialState = {
  isLoading: false,
  SettingList: [],
  Setting: {},
  error: {}
}

// Default Reducer
const setting = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SETTING_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_SETTING_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        SettingTypeList: action.payload
      }
    case FETCH_SETTING_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case UPDATE_SETTING_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_SETTING_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_SETTING_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}

export default setting

// Action Creators
export const getSettingList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SETTING_LIST_REQUEST
      })

      const response = await API.get(EndPoints.SETTING)

      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: FETCH_SETTING_LIST_SUCCESS,
          payload: response.data
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_SETTING_LIST_FAILURE
      })
    }
  }
}

export const updateSetting = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SETTING_REQUEST
      })

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const response = await API.patch(EndPoints.SETTING, data, config)
      if (response.status === HTTP_STATUS_CODE.OK) {
        dispatch({
          type: UPDATE_SETTING_SUCCESS,
          payload: response.data
        })
        message.success(RESPONSE_MESSAGE.SUCCESS)
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SETTING_FAILURE
      })
      message.success(RESPONSE_MESSAGE.FAILURE)
    }
  }
}
