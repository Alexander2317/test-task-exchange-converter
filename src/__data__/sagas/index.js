import { all } from 'redux-saga/effects'

import converter from './converter'

function* rootSaga() {
  yield all([converter()])
}

export default rootSaga
