// @flow

import { put, takeEvery, select, call } from 'redux-saga/effects'
import BigNumber from 'bignumber.js'

import { bignumberConfig } from '../../config'
import {
  actionTypes,
  messages,
  notification as notificationConstants,
} from '../constants'
import { converter, wallet } from '../selectors'

import notification from './notification'

function* transferPayment(): Generator<Object, void, any> {
  const { from, to } = yield select(converter.getEntitiesSelector)
  const { activeWallets, inactiveWallet } = yield select(
    wallet.getWalletsSelector,
  )
  const [fromWallet, toWallet] = activeWallets

  if (Number(fromWallet.balance) < Number(from.amount)) {
    yield put({
      type: actionTypes.TRANSFER_PAYMENT_FAIL,
      error: {
        message: messages.NOT_ENOUGH_MONEY,
      },
    })
    return yield call(notification, {
      type: notificationConstants.types.error,
      message: messages.NOT_ENOUGH_MONEY,
    })
  }
  try {
    const countFrom = new BigNumber(fromWallet.balance)
      .minus(from.amount)
      .toFixed(bignumberConfig.base.DECIMAL_PLACES)

    const countTo = new BigNumber(toWallet.balance)
      .plus(to.amount)
      .toFixed(bignumberConfig.base.DECIMAL_PLACES)

    yield put({
      type: actionTypes.TRANSFER_PAYMENT_SUCCESS,
      payload: {
        entities: [
          ...inactiveWallet,
          {
            ...fromWallet,
            balance: countFrom,
          },
          {
            ...toWallet,
            balance: countTo,
          },
        ],
      },
    })
    yield put({
      type: actionTypes.CLEAR_AMOUNT,
    })
    return yield call(notification, {
      type: notificationConstants.types.success,
      message: messages.SUCCESS_RESPONSE,
    })
  } catch (error) {
    yield put({
      type: actionTypes.TRANSFER_PAYMENT_FAIL,
      error: {
        message: messages.UNEXPECTED_ERROR,
      },
    })
    return yield call(notification, {
      type: notificationConstants.types.error,
      message: messages.UNEXPECTED_ERROR,
    })
  }
}

function* saga(): Generator<Function, void, any> {
  yield takeEvery(actionTypes.TRANSFER_PAYMENT_START, transferPayment)
}

export default saga
