// @flow

import { createSelector } from 'reselect'

import helpers from './helpers'

const storeKey = 'notification'

export const getShowSelector: Function = createSelector(
  helpers.getStoreKey({ name: storeKey, key: 'show' }),
  helpers.getIdentifier,
)

export const getTypeSelector: Function = createSelector(
  helpers.getStoreKey({ name: storeKey, key: 'type' }),
  helpers.getIdentifier,
)

export const getMessageSelector: Function = createSelector(
  helpers.getStoreKey({ name: storeKey, key: 'message' }),
  helpers.getIdentifier,
)
