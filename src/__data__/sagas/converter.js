// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import { converter } from '../selectors'
import { actionTypes } from '../constants'

function* changeAmount(action): Generator<Object, void, any> {
  const {
    payload: { type, value },
  } = action
  const { from, to } = yield select(converter.getEntitiesSelector)
  let newEntities = {}
  if (type === 'from') {
    newEntities = {
      from: {
        ...from,
        amount: value,
      },
      to,
    }
  } else {
    newEntities = {
      from,
      to: {
        ...to,
        amount: value,
      },
    }
  }

  yield put({
    type: actionTypes.CHANGE_AMOUNT_SUCCESS,
    payload: { entities: newEntities },
  })
}

function* changeCurrency(action): Generator<Object, void, any> {
  const {
    payload: { type, value },
  } = action
  const { from, to } = yield select(converter.getEntitiesSelector)
  let newEntities = {}
  if (type === 'from') {
    newEntities = {
      from: {
        ...from,
        currency: value,
      },
      to,
    }
  } else {
    newEntities = {
      from,
      to: {
        ...to,
        currency: value,
      },
    }
  }

  yield put({
    type: actionTypes.CHANGE_CURRENCY_SUCCESS,
    payload: { entities: newEntities },
  })
}

function* saga(): Generator<Function, void, any> {
  yield takeEvery(actionTypes.CHANGE_AMOUNT_START, changeAmount)
  yield takeEvery(actionTypes.CHANGE_CURRENCY_START, changeCurrency)
}

export default saga
