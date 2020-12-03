import { currencies } from '../../../config'
import { actionTypes, converterTypes, base } from '../../constants'
import converter from '../converter'

const initialState = {
  entities: {
    activeType: converterTypes.FROM,
    from: {
      amount: base.ZERO,
      currency: currencies.USD,
    },
    to: {
      amount: base.ZERO,
      currency: currencies.EUR,
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
        activeType: converterTypes.TO,
        from: {
          amount: '123',
          currency: currencies.USD,
        },
        to: {
          amount: '456',
          currency: currencies.EUR,
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
        activeType: converterTypes.FROM,
        from: {
          amount: '123',
          currency: currencies.EUR,
        },
        to: {
          amount: '456',
          currency: currencies.USD,
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
