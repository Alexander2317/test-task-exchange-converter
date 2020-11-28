import { actionTypes } from '../../constants'
import { getRate } from '../exchange-rate'

describe('exchangeRate Actions', () => {
  it('getRate', () => {
    expect(getRate()).toStrictEqual({ type: actionTypes.REFETCH_EXCHANGE_RATE })
  })
})
