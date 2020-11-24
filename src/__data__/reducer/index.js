import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import converter from './converter'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    converter,
  })

export default createRootReducer
