import { actionTypes } from '../../constants'
import converter from '../converter'

const initialState = {
  entities: {
    activeType: 'from',
    from: {
      amount: '0',
      currency: 'USD',
    },
    to: {
      amount: '0',
      currency: 'EUR',
    },
  },
}

describe('converter Reducer', () => {
  it('should return initialState', () => {
    const action = {
      type: 'test',
      payload: {},
    }

    const reducer = converter(initialState, action)
    expect(reducer).toStrictEqual(initialState)
  })

  it('action type CHANGE_AMOUNT_SUCCESS', () => {
    const action = {
      type: actionTypes.CHANGE_AMOUNT_SUCCESS,
      payload: {
        activeType: 'to',
        from: {
          amount: '123',
          currency: 'USD',
        },
        to: {
          amount: '456',
          currency: 'EUR',
        },
      },
    }

    const reducer = converter(initialState, action)
    expect(reducer).toStrictEqual({
      entities: {
        ...action.payload,
      },
    })
  })

  it('action type CLEAR_AMOUNT', () => {
    const action = {
      type: actionTypes.CLEAR_AMOUNT,
    }

    const reducer = converter(initialState, action)
    expect(reducer).toStrictEqual({ ...initialState })
  })

  it('action type CHANGE_CURRENCY_SUCCESS', () => {
    const action = {
      type: actionTypes.CHANGE_CURRENCY_SUCCESS,
      payload: {
        activeType: 'from',
        from: {
          amount: '123',
          currency: 'EUR',
        },
        to: {
          amount: '456',
          currency: 'USD',
        },
      },
    }

    const reducer = converter(initialState, action)
    expect(reducer).toStrictEqual({
      entities: {
        ...action.payload,
      },
    })
  })
})
