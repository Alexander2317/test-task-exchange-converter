// @flow

import { createSelector } from 'reselect'

import helpers from './helpers'

const storeKey = 'exchangeRate'

export const getLoadingSelector: Function = createSelector(
  helpers.getStoreKey({ name: storeKey, key: 'loading' }),
  helpers.getIdentifier,
)
export const getEntitiesSelector: Function = createSelector(
  helpers.getStoreKey({ name: storeKey, key: 'entities' }),
  helpers.getIdentifier,
)
