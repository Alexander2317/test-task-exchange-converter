// @flow

export type Action = {
  type: string,
  payload?: any,
}

export type Currency = 'USD' | 'EUR' | 'GBP'

export type ConverterDataParams = {
  amount: number | string,
  currency: Currency,
}

export type PriceRation = {
  from: string,
  to: string,
}
