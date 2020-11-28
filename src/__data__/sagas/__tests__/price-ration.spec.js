import { put } from 'redux-saga/effects'

import { actionTypes } from '../../constants'
import priceRatio from '../price-ratio'

describe('priceRatio Saga', () => {
  it('should count ratio', () => {
    const saga = priceRatio(0.5)

    const action = {
      type: actionTypes.COUNT_PRICE_RATIO,
      payload: {
        from: '2.00',
        to: '0.50',
      },
    }
    expect(saga.next().value).toEqual(put(action))
    expect(saga.next().done).toBe(true)
  })
})
