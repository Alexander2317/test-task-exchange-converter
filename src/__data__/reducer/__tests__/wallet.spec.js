import { actionTypes } from '../../constants'
import wallet from '../wallet'

const initialState = {
  loading: false,
  entities: [
    {
      currency: 'USD',
      balance: '123.00',
    },
    {
      currency: 'EUR',
      balance: '456.00',
    },
    {
      currency: 'GBP',
      balance: '789.00',
    },
  ],
  error: '',
}

describe('wallet Reducer', () => {
  it('should return initialState', () => {
    const action = {
      type: 'test',
      payload: {},
    }

    const reducer = wallet(initialState, action)
    expect(reducer).toStrictEqual(initialState)
  })

  it('action type TRANSFER_PAYMENT_START', () => {
    const action = {
      type: actionTypes.TRANSFER_PAYMENT_START,
    }

    const reducer = wallet(initialState, action)
    expect(reducer).toStrictEqual({
      loading: true,
      entities: initialState.entities,
      error: '',
    })
  })

  it('action type TRANSFER_PAYMENT_SUCCESS', () => {
    const action = {
      type: actionTypes.TRANSFER_PAYMENT_SUCCESS,
      payload: {
        entities: [
          {
            currency: 'USD',
            balance: '122.00',
          },
          {
            currency: 'EUR',
            balance: '457.00',
          },
          {
            currency: 'GBP',
            balance: '789.00',
          },
        ],
      },
    }

    const reducer = wallet(initialState, action)
    expect(reducer).toStrictEqual({
      loading: false,
      entities: action.payload.entities,
      error: '',
    })
  })

  it('action type TRANSFER_PAYMENT_FAIL', () => {
    const action = {
      type: actionTypes.TRANSFER_PAYMENT_FAIL,
      error: {
        message: 'sorry',
      },
    }

    const reducer = wallet(initialState, action)
    expect(reducer).toStrictEqual({
      loading: false,
      entities: initialState.entities,
      error: action.error.message,
    })
  })
})
