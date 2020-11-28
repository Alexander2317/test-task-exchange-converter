// @flow

import { put, delay, call } from 'redux-saga/effects'

import { actionTypes, base } from '../constants'

type Props = {
  type: string,
  message: string,
}

export function* notificationShow({
  type,
  message,
}: Props): Generator<Object, void, any> {
  yield put({
    type: actionTypes.SHOW_NOTIFICATION,
    payload: { type, message },
  })
}

export function* notificationHide(): Generator<Object, void, any> {
  yield put({
    type: actionTypes.HIDE_NOTIFICATION,
  })
}

export function* notificationToggle({
  type,
  message,
}: Props): Generator<Object, void, any> {
  yield call(notificationShow, { type, message })
  yield delay(base.DELAY_SHOW_NOTIFICATION)
  yield call(notificationHide)
}
