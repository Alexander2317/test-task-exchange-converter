// @flow

import { put } from 'redux-saga/effects'
import BigNumber from 'bignumber.js'

import { bignumberConfig } from '../../config'
import { actionTypes } from '../constants'

function* saga(rate: number): Generator<Object, void, any> {
  const to = new BigNumber(rate)
    .precision(bignumberConfig.base.PRECISION)
    .toFixed(bignumberConfig.base.DECIMAL_PLACES)

  const from = new BigNumber(1)
    .dividedBy(to)
    .toFixed(bignumberConfig.base.DECIMAL_PLACES)

  yield put({
    type: actionTypes.COUNT_PRICE_RATIO,
    payload: { from, to },
  })
}

export default saga
