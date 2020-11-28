import { base, converterTypes } from '../../constants'
import { getWalletsSelector } from '../wallet'

describe('wallet Selector', () => {
  it('getWalletsSelector', () => {
    const walletEntities = [
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
    ]
    const converterEntities = {
      activeType: converterTypes.FROM,
      from: {
        amount: base.ZERO,
        currency: 'USD',
      },
      to: {
        amount: base.ZERO,
        currency: 'EUR',
      },
    }

    const selector = getWalletsSelector.resultFunc(
      walletEntities,
      converterEntities,
    )

    expect(selector).toEqual({
      activeWallets: [
        {
          currency: 'USD',
          balance: '123.00',
        },
        {
          currency: 'EUR',
          balance: '456.00',
        },
      ],
      inactiveWallet: [
        {
          currency: 'GBP',
          balance: '789.00',
        },
      ],
    })
  })
})
