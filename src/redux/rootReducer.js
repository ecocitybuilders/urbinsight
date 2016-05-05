import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import auth from './modules/auth'
import survey from './modules/survey'
import audit from './modules/audit'

export default combineReducers({
  counter,
  auth,
  router,
  survey,
  audit
})
