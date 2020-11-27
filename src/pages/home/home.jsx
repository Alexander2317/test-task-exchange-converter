// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/styles/makeStyles'

import type {
  ConverterDataParams,
  PriceRation,
  Wallet,
} from '../../types/common-types'
import { Alert, Select, CustomInput } from '../../components'
import { currencySymbols, currencies } from '../../config'
import { selectors, actions, constants } from '../../__data__'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    width: '95%',
  },
  button: {
    width: '100%',
  },
})

type Props = {
  converterEntities: {
    from: ConverterDataParams,
    to: ConverterDataParams,
  },
  priceRationEntities: PriceRation,
  changeAmountAction: Function,
  changeCurrencyAction: Function,
  getRateAction: Function,
  wallets: {
    activeWallets: Array<Wallet>,
    inactiveWallet: Array<Wallet>,
  },
  transferPaymentAction: Function,
  showNotification: boolean,
  typeNotification: string,
  messageNotification: string,
}

const Home = (props: Props): React.Node => {
  const { useCallback, useEffect } = React
  const {
    converterEntities,
    priceRationEntities,
    changeAmountAction,
    changeCurrencyAction,
    getRateAction,
    wallets: { activeWallets },
    transferPaymentAction,
    showNotification,
    typeNotification,
    messageNotification,
  } = props
  const styles = useStyles()
  const currencySymbolFrom = currencySymbols[converterEntities.from.currency]
  const currencySymbolTo = currencySymbols[converterEntities.to.currency]

  const checkDisabledButton =
    Number(converterEntities.from.amount) === Number(constants.base.ZERO) &&
    Number(converterEntities.to.amount) === Number(constants.base.ZERO)

  useEffect(() => {
    getRateAction(constants.converterTypes.FROM)
  }, [])

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
  const handleClick = useCallback(() => {
    transferPaymentAction()
  }, [])

  return (
    <Box className={styles.root} my={2} mx="auto">
      <Typography variant="h3" align="center">
        Exchange
      </Typography>
      <Box my={2}>
        <Typography variant="body2">Balance</Typography>
        {activeWallets.map((item) => (
          <Typography key={`wallet-${item.currency}`} variant="h4">
            {item.balance} {currencySymbols[item.currency]}
          </Typography>
        ))}

        <Box my={2}>
          <Grid container>
            <Grid item xs={10}>
              <CustomInput.Money
                id="amount-from"
                name="amount-from"
                value={converterEntities.from.amount}
                handleChange={handleChangeInputFrom}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                id="currency-from"
                value={converterEntities.from.currency}
                onChange={handleChangeSelect('from')}
                options={currencies.options}
              />
            </Grid>
          </Grid>
        </Box>
        <Box my={1}>
          <Typography variant="caption">
            1 {currencySymbolFrom} = {priceRationEntities.to} {currencySymbolTo}
          </Typography>
        </Box>

        <Box my={2}>
          <Grid container>
            <Grid item xs={10}>
              <CustomInput.Money
                id="amount-to"
                name="amount-to"
                value={converterEntities.to.amount}
                handleChange={handleChangeInputTo}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                id="currency-to"
                value={converterEntities.to.currency}
                onChange={handleChangeSelect('to')}
                options={currencies.options}
              />
            </Grid>
          </Grid>
        </Box>

        <Box my={1}>
          <Typography variant="caption">
            1 {currencySymbolTo} = {priceRationEntities.from}{' '}
            {currencySymbolFrom}
          </Typography>
        </Box>
      </Box>
      <Button
        className={styles.button}
        variant="outlined"
        disabled={checkDisabledButton}
        onClick={handleClick}
      >
        transfer payment
      </Button>

      {showNotification && (
        <Alert
          open={showNotification}
          type={typeNotification}
          text={messageNotification}
        />
      )}
    </Box>
  )
}

const mapStateToProps = (state) => ({
  converterEntities: selectors.converter.getEntitiesSelector(state),
  priceRationEntities: selectors.priceRation.getEntitiesSelector(state),
  wallets: selectors.wallet.getWalletsSelector(state),
  showNotification: selectors.notification.getShowSelector(state),
  typeNotification: selectors.notification.getTypeSelector(state),
  messageNotification: selectors.notification.getMessageSelector(state),
})

const mapDispatchToProps = {
  changeAmountAction: actions.converter.changeAmount,
  changeCurrencyAction: actions.converter.changeCurrency,
  getRateAction: actions.exchangeRate.getRate,
  transferPaymentAction: actions.payment.transfer,
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home): React.AbstractComponent<Props>)
