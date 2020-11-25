// @flow

import { createSelector } from 'reselect'

import helpers from './helpers'

const storeKey = 'priceRatio'
export const getEntitiesSelector: Function = createSelector(
  helpers.getStoreKey({ name: storeKey, key: 'entities' }),
  helpers.getIdentifier,
)
