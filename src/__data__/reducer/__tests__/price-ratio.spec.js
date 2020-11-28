import { actionTypes } from '../../constants'
import priceRation from '../price-ratio'

const initialState = {
  entities: {
    from: '',
    to: '',
  },
}

describe('priceRation Reducer', () => {
  it('should return initialState', () => {
    const action = {
      type: 'test',
      payload: {},
    }

    const reducer = priceRation(initialState, action)
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

    const reducer = priceRation(initialState, action)
    expect(reducer).toStrictEqual({
      entities: {
        ...action.payload,
      },
    })
  })
})
