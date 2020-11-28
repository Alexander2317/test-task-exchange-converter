import { actionTypes } from '../../constants'
import { transfer } from '../payment'

describe('payment Actions', () => {
  it('transfer', () => {
    expect(transfer()).toStrictEqual({ type: actionTypes.TRANSFER_PAYMENT_START })
  })
})
