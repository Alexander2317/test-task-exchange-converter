// @flow

import type { Action } from '../../types/common'
import { actionTypes } from '../constants'

export const getRate = (): Action => ({
  type: actionTypes.REFETCH_EXCHANGE_RATE,
})
