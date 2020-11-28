// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import type { ConverterDataParams, PriceRation } from '../../../../types/common'
import { currencies, currencySymbols } from '../../../../config'
import { actions, constants, selectors } from '../../../../__data__'
import { RateRatio } from '../../../../components'

import { Control } from './components'

type Props = {
  converterEntities: {
    from: ConverterDataParams,
    to: ConverterDataParams,
  },
  priceRationEntities: PriceRation,
  changeAmountAction: Function,
  changeCurrencyAction: Function,
  getRateAction: Function,
  exchangeRateLoading: boolean,
}

const Converter = (props: Props): React.Node => {
  const { useCallback } = React
  const {
    converterEntities,
    priceRationEntities,
    changeAmountAction,
    changeCurrencyAction,
    getRateAction,
    exchangeRateLoading,
  } = props
  const currencySymbolFrom = currencySymbols[converterEntities.from.currency]
  const currencySymbolTo = currencySymbols[converterEntities.to.currency]

  const handleChangeInputFrom = useCallback((value) => {
    changeAmountAction({ type: constants.converterTypes.FROM, value })
  }, [])
  const handleChangeInputTo = useCallback((value) => {
    changeAmountAction({ type: constants.converterTypes.TO, value })
  }, [])

  const handleChangeSelect = (type: string) =>
    useCallback(
      (event) => {
        const {
          target: { value },
        } = event
        changeCurrencyAction({ type, value })
        getRateAction()
      },
      [type],
    )

  return (
    <>
      <Control
        inputId="amount-from"
        inputName="amount-from"
        inputValue={converterEntities.from.amount}
        inputHandleChange={handleChangeInputFrom}
        selectId="currency-from"
        selectName="currency-from"
        selectValue={converterEntities.from.currency}
        selectHandleChange={handleChangeSelect('from')}
        selectOptions={currencies.options}
      />
      <RateRatio
        loading={exchangeRateLoading}
        currencySymbolLeft={currencySymbolFrom}
        currencySymbolRight={currencySymbolTo}
        rate={priceRationEntities.to}
      />
      <Control
        inputId="amount-to"
        inputName="amount-to"
        inputValue={converterEntities.to.amount}
        inputHandleChange={handleChangeInputTo}
        selectId="currency-to"
        selectName="currency-to"
        selectValue={converterEntities.to.currency}
        selectHandleChange={handleChangeSelect('to')}
        selectOptions={currencies.options}
      />
      <RateRatio
        loading={exchangeRateLoading}
        currencySymbolLeft={currencySymbolTo}
        currencySymbolRight={currencySymbolFrom}
        rate={priceRationEntities.from}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  converterEntities: selectors.converter.getEntitiesSelector(state),
  priceRationEntities: selectors.priceRation.getEntitiesSelector(state),
  exchangeRateLoading: selectors.exchangeRate.getLoadingSelector(state),
})

const mapDispatchToProps = {
  changeAmountAction: actions.converter.changeAmount,
  changeCurrencyAction: actions.converter.changeCurrency,
  getRateAction: actions.exchangeRate.getRate,
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(Converter): React.AbstractComponent<{}>)
