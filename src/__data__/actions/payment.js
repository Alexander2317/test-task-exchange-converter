// @flow

import type { Action } from '../../types/common'
import { actionTypes } from '../constants'

export const transfer = (): Action => ({
  type: actionTypes.TRANSFER_PAYMENT_START,
})
