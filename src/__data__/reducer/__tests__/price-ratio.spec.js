import { actionTypes } from '../../constants'
import priceRatio from '../price-ratio'

const initialState = {
  entities: {
    from: '',
    to: '',
  },
}

describe('priceRatio Reducer', () => {
  it('should return initialState', () => {
    const action = {
      type: 'test',
      payload: {},
    }

    const reducer = priceRatio(initialState, action)
    expect(reducer).toStrictEqual(initialState)
  })

  it('action type COUNT_PRICE_RATIO', () => {
    const action = {
      type: actionTypes.COUNT_PRICE_RATIO,
      payload: {
        from: '123',
        to: '456',
      },
    }

    const reducer = priceRatio(initialState, action)
    expect(reducer).toStrictEqual({
      entities: {
        ...action.payload,
      },
    })
  })
})
