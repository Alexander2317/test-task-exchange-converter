import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import converter from './converter'
import exchangeRate from './exchange-rate'
import priceRatio from './price-ratio'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    converter,
    exchangeRate,
    priceRatio,
  })

export default createRootReducer
