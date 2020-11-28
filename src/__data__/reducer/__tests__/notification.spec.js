import { actionTypes } from '../../constants'
import notification from '../notification'

const initialState = {
  show: false,
  type: '',
  message: '',
}

describe('notification Reducer', () => {
  it('should return initialState', () => {
    const action = {
      type: 'test',
      payload: {},
    }

    const reducer = notification(initialState, action)
    expect(reducer).toStrictEqual(initialState)
  })

  it('action type SHOW_NOTIFICATION', () => {
    const action = {
      type: actionTypes.SHOW_NOTIFICATION,
      payload: {
        type: 'success',
        message: 'ok',
      },
    }

    const reducer = notification(initialState, action)
    expect(reducer).toStrictEqual({
      show: true,
      ...action.payload,
    })
  })

  it('action type HIDE_NOTIFICATION', () => {
    const action = {
      type: actionTypes.HIDE_NOTIFICATION,
    }

    const reducer = notification(initialState, action)
    expect(reducer).toStrictEqual({
      show: false,
      type: '',
      message: '',
    })
  })
})
