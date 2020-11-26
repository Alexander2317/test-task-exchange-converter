// @flow

import { put, select, call, takeEvery } from 'redux-saga/effects'
import BigNumber from 'bignumber.js'

import { bignumberConfig } from '../../config'
import { converter, priceRation } from '../selectors'
import { actionTypes } from '../constants'

type ActionChangeAmount = {
  payload: {
    type: string,
    value: string | number,
  },
}

export function* changeAmount(
  action: ActionChangeAmount,
): Generator<Object, void, any> {
  const {
    payload: { type, value },
  } = action
  const { from, to } = yield select(converter.getEntitiesSelector)
  const { from: fromRatio, to: toRatio } = yield select(
    priceRation.getEntitiesSelector,
  )

  if (type === 'from') {
    const countToAmount = new BigNumber(value)
      .multipliedBy(toRatio)
      .toFixed(bignumberConfig.base.DECIMAL_PLACES)

    return yield put({
      type: actionTypes.CHANGE_AMOUNT_SUCCESS,
      payload: {
        from: {
          ...from,
          amount: value,
        },
        to: {
          ...to,
          amount: countToAmount,
        },
      },
    })
  }
  const countFromAmount = new BigNumber(value)
    .multipliedBy(fromRatio)
    .toFixed(bignumberConfig.base.DECIMAL_PLACES)

  return yield put({
    type: actionTypes.CHANGE_AMOUNT_SUCCESS,
    payload: {
      from: {
        ...from,
        amount: countFromAmount,
      },
      to: {
        ...to,
        amount: value,
      },
    },
  })
}

export function* updateAmout(type: string): Generator<Object, any, any> {
  const { from, to } = yield select(converter.getEntitiesSelector)
  if (from.amount === to.amount) {
    return null
  }

  if (type === 'from') {
    return yield call(changeAmount, { payload: { type, value: from.amount } })
  }

  return yield call(changeAmount, { payload: { type, value: to.amount } })
}

type ActionChangeCurrency = {
  payload: {
    type: string,
    value: string,
  },
}

export function* changeCurrency(
  action: ActionChangeCurrency,
): Generator<Object, void, any> {
  const {
    payload: { type, value },
  } = action
  const { from, to } = yield select(converter.getEntitiesSelector)
  if (type === 'from') {
    return yield put({
      type: actionTypes.CHANGE_CURRENCY_SUCCESS,
      payload: {
        from: {
          ...from,
          currency: value,
        },
        to,
      },
    })
  }

  return yield put({
    type: actionTypes.CHANGE_CURRENCY_SUCCESS,
    payload: {
      from,
      to: {
        ...to,
        currency: value,
      },
    },
  })
}

function* saga(): Generator<Function, void, any> {
  yield takeEvery(actionTypes.CHANGE_AMOUNT_START, changeAmount)
  yield takeEvery(actionTypes.CHANGE_CURRENCY_START, changeCurrency)
}

export default saga
