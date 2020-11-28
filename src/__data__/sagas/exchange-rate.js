// @flow

import { put, call, select, delay, takeLatest } from 'redux-saga/effects'

import { converter } from '../selectors'
import { actionTypes, routes, messages, base, notification } from '../constants'

import { notificationToggle } from './notification'
import priceRation from './price-ratio'
import { updateAmount } from './converter'
import { fetchApi } from './utils'

function* getExchangeRate(): Generator<Object, void, any> {
  const { activeType, from, to } = yield select(converter.getEntitiesSelector)
  yield put({
    type: actionTypes.GET_EXCHANGE_RATE_START,
  })

  try {
    const { data, error } = yield call(
      fetchApi,
      `${routes.api}?base=${from.currency}&symbols=${to.currency}`,
    )
    if (error) {
      yield put({
        type: actionTypes.GET_EXCHANGE_RATE_FAIL,
        error: {
          message: error,
        },
      })
      return yield call(notificationToggle, {
        type: notification.types.error,
        message: error,
      })
    }
    const { rates } = data
    if (Number.isNaN(rates[to.currency])) {
      yield put({
        type: actionTypes.GET_EXCHANGE_RATE_FAIL,
        error: {
          message: messages.INVALID_RESPONSE,
        },
      })
      return yield call(notificationToggle, {
        type: notification.types.error,
        message: messages.INVALID_RESPONSE,
      })
    }
    const rate = rates[to.currency]
    yield put({
      type: actionTypes.GET_EXCHANGE_RATE_SUCCESS,
      payload: { rate },
    })
    yield call(priceRation, rate)
    yield call(updateAmount, activeType)
    yield delay(base.DELAY_REFETCH_RATE)
    return yield put({
      type: actionTypes.REFETCH_EXCHANGE_RATE,
    })
  } catch (error) {
    yield put({
      type: actionTypes.GET_EXCHANGE_RATE_FAIL,
      error: {
        message: messages.ERROR_RESPONSE,
      },
    })
    return yield call(notificationToggle, {
      type: notification.types.error,
      message: messages.ERROR_RESPONSE,
    })
  }
}

function* saga(): Generator<Function, void, any> {
  yield takeLatest(actionTypes.REFETCH_EXCHANGE_RATE, getExchangeRate)
}

export default saga
