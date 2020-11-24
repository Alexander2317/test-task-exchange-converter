// @flow

import type { Action } from '../../types/common-types'
import { actionTypes } from '../constants'

type ChangeAmountProps = {
  type: string,
  value: string,
}

export const changeAmount = ({ type, value }: ChangeAmountProps): Action => ({
  type: actionTypes.CHANGE_AMOUNT_START,
  payload: { type, value },
})

export const changeCurrency = ({ type, value }: ChangeAmountProps): Action => ({
  type: actionTypes.CHANGE_CURRENCY_START,
  payload: { type, value },
})
