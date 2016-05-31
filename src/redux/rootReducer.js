import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import auth from './modules/auth'
import survey from './modules/survey'
import audit from './modules/audit'
import layer from './modules/layer'

export default combineReducers({
  counter,
  auth,
  router,
  survey,
  audit,
  layer
})
