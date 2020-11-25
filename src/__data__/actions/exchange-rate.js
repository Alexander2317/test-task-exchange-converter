// @flow

import type { Action } from '../../types/common-types'
import { actionTypes } from '../constants'

export const getRate = (): Action => ({
  type: actionTypes.REFETCH_EXCHANGE_RATE,
})
