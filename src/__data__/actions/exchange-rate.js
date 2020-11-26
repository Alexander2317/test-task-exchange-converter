// @flow

import type { Action } from '../../types/common-types'
import { actionTypes } from '../constants'

export const getRate = (type: string = ''): Action => ({
  type: actionTypes.REFETCH_EXCHANGE_RATE,
  payload: { type },
})
