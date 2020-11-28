import { put, delay, call } from 'redux-saga/effects'

import { actionTypes } from '../../constants'
import {
  notificationShow,
  notificationHide,
  notificationToggle,
} from '../notification'

describe('notification Saga', () => {
  it('notificationShow', () => {
    const payload = { type: 'error', message: 'hello' }
    const saga = notificationShow(payload)

    const action = {
      type: actionTypes.SHOW_NOTIFICATION,
      payload,
    }

    expect(saga.next().value).toEqual(put(action))
    expect(saga.next().done).toBe(true)
  })

  it('notificationHide', () => {
    const saga = notificationHide()

    const action = {
      type: actionTypes.HIDE_NOTIFICATION,
    }

    expect(saga.next().value).toEqual(put(action))
    expect(saga.next().done).toBe(true)
  })

  it('notificationToggle', () => {
    const payload = { type: 'success', message: 'hello' }
    const saga = notificationToggle(payload)

    expect(saga.next().value).toEqual(
      call(notificationShow, { type: 'success', message: 'hello' }),
    )
    expect(saga.next().value).toEqual(delay(2000))
    expect(saga.next().value).toEqual(call(notificationHide))
    expect(saga.next().done).toBe(true)
  })
})
