import { actionTypes } from '../../constants'
import exchangeRate from '../exchange-rate'

const initialState = {
  loading: false,
  entities: {
    rate: 0,
  },
  error: '',
}

describe('exchangeRate Reducer', () => {
  it('should return initialState', () => {
    const action = {
      type: 'test',
      payload: {},
    }

    const reducer = exchangeRate(initialState, action)
    expect(reducer).toStrictEqual(initialState)
  })

  it('action type GET_EXCHANGE_RATE_START', () => {
    const action = {
      type: actionTypes.GET_EXCHANGE_RATE_START,
    }

    const reducer = exchangeRate(initialState, action)
    expect(reducer).toStrictEqual({
      loading: true,
      entities: {
        rate: 0,
      },
      error: '',
    })
  })

  it('action type GET_EXCHANGE_RATE_SUCCESS', () => {
    const action = {
      type: actionTypes.GET_EXCHANGE_RATE_SUCCESS,
      payload: {
        rate: 0.8,
      },
    }

    const reducer = exchangeRate(initialState, action)
    expect(reducer).toStrictEqual({
      loading: false,
      entities: {
        rate: action.payload.rate,
      },
      error: '',
    })
  })

  it('action type GET_EXCHANGE_RATE_FAIL', () => {
    const action = {
      type: actionTypes.GET_EXCHANGE_RATE_FAIL,
      error: {
        message: 'ooops',
      },
    }

    const reducer = exchangeRate(initialState, action)
    expect(reducer).toStrictEqual({
      loading: false,
      entities: {
        rate: 0,
      },
      error: 'ooops',
    })
  })
})
