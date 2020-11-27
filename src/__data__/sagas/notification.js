// @flow

import { put, delay } from 'redux-saga/effects'

import { actionTypes, base } from '../constants'

type Props = {
  type: srting,
  message: string,
}

function* saga({ type, message }: Props): Generator<Object, void, any> {
  yield put({
    type: actionTypes.SHOW_NOTIFICATION,
    payload: { type, message },
  })
  yield delay(base.DELAY_SHOW_NOTIFICATION)
  yield put({
    type: actionTypes.HIDE_NOTIFICATION,
    payload: { type, message },
  })
}

export default saga
