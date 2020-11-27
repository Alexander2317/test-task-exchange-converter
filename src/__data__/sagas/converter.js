// @flow

import { put, select, call, takeEvery } from 'redux-saga/effects'
import BigNumber from 'bignumber.js'

import { bignumberConfig, currencies } from '../../config'
import { converter, priceRation } from '../selectors'
import { actionTypes, converterTypes } from '../constants'

import { getFirstNonRepeatingElement } from './utils'

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
  const { to: toRatio } = yield select(priceRation.getEntitiesSelector)

  if (from.amount === value || to.amount === value) {
    return yield put({
      type: actionTypes.AMOUNT_IS_THE_SAME,
    })
  }

  if (type === converterTypes.FROM) {
    const countToAmount = new BigNumber(value)
      .multipliedBy(toRatio)
      .toFixed(bignumberConfig.base.DECIMAL_PLACES)

    return yield put({
      type: actionTypes.CHANGE_AMOUNT_SUCCESS,
      payload: {
        activeType: type,
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
    .dividedBy(toRatio)
    .toFixed(bignumberConfig.base.DECIMAL_PLACES)

  return yield put({
    type: actionTypes.CHANGE_AMOUNT_SUCCESS,
    payload: {
      activeType: type,
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

export function* updateAmout(): Generator<Object, any, any> {
  const { activeType, from, to } = yield select(converter.getEntitiesSelector)
  if (from.amount === to.amount) {
    return yield put({
      type: actionTypes.AMOUNT_IS_THE_SAME,
    })
  }

  if (activeType === converterTypes.FROM) {
    return yield call(changeAmount, {
      payload: { type: activeType, value: from.amount },
    })
  }

  return yield call(changeAmount, {
    payload: { type: activeType, value: to.amount },
  })
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
  if (type === converterTypes.FROM) {
    let formattedCurrencies = {}
    if (value === to.currency) {
      formattedCurrencies = {
        activeType: type,
        from: {
          ...from,
          currency: value,
        },
        to: {
          ...to,
          currency: getFirstNonRepeatingElement({
            elements: currencies.list,
            element: value,
          }),
        },
      }
    } else {
      formattedCurrencies = {
        activeType: type,
        from: {
          ...from,
          currency: value,
        },
        to,
      }
    }

    return yield put({
      type: actionTypes.CHANGE_CURRENCY_SUCCESS,
      payload: {
        ...formattedCurrencies,
      },
    })
  }

  let formattedCurrencies = {}
  if (value === from.currency) {
    formattedCurrencies = {
      activeType: type,
      from: {
        ...from,
        currency: getFirstNonRepeatingElement({
          elements: currencies.list,
          element: value,
        }),
      },
      to: {
        ...to,
        currency: value,
      },
    }
  } else {
    formattedCurrencies = {
      activeType: type,
      from,
      to: {
        ...to,
        currency: value,
      },
    }
  }

  return yield put({
    type: actionTypes.CHANGE_CURRENCY_SUCCESS,
    payload: {
      ...formattedCurrencies,
    },
  })
}

function* saga(): Generator<Function, void, any> {
  yield takeEvery(actionTypes.CHANGE_AMOUNT_START, changeAmount)
  yield takeEvery(actionTypes.CHANGE_CURRENCY_START, changeCurrency)
}

export default saga
