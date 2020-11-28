import { actionTypes } from '../../constants'
import { changeAmount, changeCurrency } from '../converter'

describe('converter Actions', () => {
  it('changeAmount', () => {
    const data = {
      type: 'from',
      value: '12.3',
    }

    expect(changeAmount(data)).toStrictEqual({
      type: actionTypes.CHANGE_AMOUNT_START,
      payload: data,
    })
  })

  it('changeCurrency', () => {
    const data = {
      type: 'to',
      value: 'USD',
    }

    expect(changeCurrency(data)).toStrictEqual({
      type: actionTypes.CHANGE_CURRENCY_START,
      payload: data,
    })
  })
})
