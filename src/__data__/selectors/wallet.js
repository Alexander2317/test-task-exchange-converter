// @flow

import { createSelector } from 'reselect'

import type { Wallet } from '../../types/common'

import helpers from './helpers'
import { getEntitiesSelector as converterEntities } from './converter'

const storeKey = 'wallet'

export const getEntitiesSelector: Function = createSelector(
  helpers.getStoreKey({ name: storeKey, key: 'entities' }),
  helpers.getIdentifier,
)

export const getLoadingSelector: Function = createSelector(
  helpers.getStoreKey({ name: storeKey, key: 'loading' }),
  helpers.getIdentifier,
)

type GetWallet = {
  wallets: Array<Wallet>,
  activeCurrency: string,
}

const getWallet = ({ wallets, activeCurrency }: GetWallet) =>
  wallets.find(({ currency }) => currency === activeCurrency)

export const getWalletsSelector: Function = createSelector(
  getEntitiesSelector,
  converterEntities,
  (wallets, converter) => {
    const { from, to } = converter
    const walletFrom = getWallet({
      wallets,
      activeCurrency: from.currency,
    })
    const walletTo = getWallet({ wallets, activeCurrency: to.currency })
    const inactiveWallet = wallets
      .filter(({ currency }) => currency !== from.currency)
      .filter(({ currency }) => currency !== to.currency)

    return {
      inactiveWallet,
      activeWallets: [walletFrom, walletTo],
    }
  },
)
