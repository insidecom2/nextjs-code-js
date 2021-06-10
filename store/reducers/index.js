import { combineReducers } from 'redux'
import auth from 'store/reducers/auth'
import category from 'store/reducers/category'
import categoryType from 'store/reducers/categoryType'
import style from 'store/reducers/style'
import size from 'store/reducers/size'
import material from 'store/reducers/material'
import printFinish from 'store/reducers/printFinish'
import printSide from 'store/reducers/printSide'
import products from 'store/reducers/products'
import menu from 'store/reducers/menu'
import media from 'store/reducers/media'
import contentType from 'store/reducers/contentType'
import content from 'store/reducers/content'
import shipping from 'store/reducers/shipping'
import promotion from 'store/reducers/promotion'
import setting from 'store/reducers/setting'

export default combineReducers({
  auth,
  category,
  categoryType,
  style,
  size,
  material,
  printFinish,
  printSide,
  products,
  menu,
  media,
  contentType,
  content,
  shipping,
  promotion,
  setting
})
