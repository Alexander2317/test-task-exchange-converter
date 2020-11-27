import { all } from 'redux-saga/effects'

import converter from './converter'
import exchangeRate from './exchange-rate'
import payment from './payment'

function* rootSaga() {
  yield all([converter(), exchangeRate(), payment()])
}

export default rootSaga
