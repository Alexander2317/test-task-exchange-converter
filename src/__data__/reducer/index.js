import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import converter from './converter'
import exchangeRate from './exchange-rate'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    converter,
    exchangeRate,
  })

export default createRootReducer
