import { all } from 'redux-saga/effects'

import converter from './converter'
import exchangeRate from './exchange-rate'

function* rootSaga() {
  yield all([converter(), exchangeRate()])
}

export default rootSaga
