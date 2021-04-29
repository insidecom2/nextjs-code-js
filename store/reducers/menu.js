const SET_MENU = 'Menu/SET_MENU'


// Initialize State
const initialState = {
  selectedMenu: '1'
}

// Default Reducer
const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU:
      return {
        ...state,
        selectedMenu: action.payload 
      }
    default:
      return state
  }
}

export default auth

// Action Creators

export const setMenu = (menu) => {
  return async (dispatch) => {
    dispatch({
      type: SET_MENU,
      payload: menu
    })
  }
}