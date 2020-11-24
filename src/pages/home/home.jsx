// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/styles/makeStyles'

import type { ConverterDataParams } from '../../types/common-types'
import { Alert, Select, CustomInput } from '../../components'
import { currencySymbols, currencies } from '../../config'
import { selectors, actions } from '../../__data__'

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
  changeAmountAction: Function,
  changeCurrencyAction: Function,
}

const Home = (props: Props): React.Node => {
  const { useCallback } = React
  const { converterEntities, changeAmountAction, changeCurrencyAction } = props
  const styles = useStyles()
  const currencySymbolFrom = currencySymbols[converterEntities.from.currency]
  const currencySymbolTo = currencySymbols[converterEntities.to.currency]

  const handleChangeInput = (type) =>
    useCallback(
      (value) => {
        changeAmountAction({ type, value })
      },
      [type],
    )

  const handleChangeSelect = (type: string) =>
    useCallback(
      (event) => {
        const {
          target: { value },
        } = event
        changeCurrencyAction({ type, value })
      },
      [type],
    )

  return (
    <Box className={styles.root} my={2} mx="auto">
      <Typography variant="h3" align="center">
        Exchange
      </Typography>
      <Box my={2}>
        <Typography variant="body2">Balance</Typography>
        <Typography variant="h4">18 000 {currencySymbolFrom}</Typography>
        <Typography variant="h4">18 000 {currencySymbolTo}</Typography>

        <Box my={2}>
          <Grid container>
            <Grid item xs={10}>
              <CustomInput.Money
                id="amount-from"
                name="amount-from"
                value={converterEntities.from.amount}
                defaultValue={0}
                handleChange={handleChangeInput('from')}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                id="currency-from"
                value={converterEntities.from.currency}
                onChange={handleChangeSelect('from')}
                options={currencies}
              />
            </Grid>
          </Grid>
        </Box>
        <Box my={1}>
          <Typography variant="caption">
            1 {currencySymbolFrom} = 0.5 {currencySymbolTo}
          </Typography>
        </Box>

        <Box my={2}>
          <Grid container>
            <Grid item xs={10}>
              <CustomInput.Money
                id="amount-to"
                name="amount-to"
                value={converterEntities.to.amount}
                defaultValue={0}
                handleChange={handleChangeInput('to')}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                id="currency-to"
                value={converterEntities.to.currency}
                onChange={handleChangeSelect('to')}
                options={currencies}
              />
            </Grid>
          </Grid>
        </Box>

        <Box my={1}>
          <Typography variant="caption">
            1 {currencySymbolTo} = 0.5 {currencySymbolFrom}
          </Typography>
        </Box>
      </Box>
      <Button className={styles.button} variant="outlined">
        Exchange
      </Button>

      <Alert open text="hello" />
    </Box>
  )
}

const mapStateToProps = (state) => ({
  converterEntities: selectors.converter.getEntitiesSelector(state),
})

const mapDispatchToProps = {
  changeAmountAction: actions.converter.changeAmount,
  changeCurrencyAction: actions.converter.changeCurrency,
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home): React.AbstractComponent<Props>)
