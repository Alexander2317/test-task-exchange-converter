// @flow

import * as React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/styles/makeStyles'

import { Alert, Select, CustomInput } from '../../components'
import { currencySymbols, currencies } from '../../config'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    width: '95%',
  },
  button: {
    width: '100%',
  },
})

const Home = (): React.Node => {
  const styles = useStyles()
  const [currency, setCurrency] = React.useState({
    from: 'EUR',
    to: 'EUR',
  })
  const [amountFrom, setAmountFrom] = React.useState(0)
  const [amountTo, setAmountTo] = React.useState(0)

  const handleChangeInputFrom = (value) => setAmountFrom(value)
  const handleChangeInputTo = (value) => setAmountTo(value)

  const handleChangeSelect = (prop: string) => (event) => {
    setCurrency({ ...currency, [prop]: event.target.value })
  }

  return (
    <Box className={styles.root} my={2} mx="auto">
      <Typography variant="h3" align="center">
        Exchange
      </Typography>
      <Box my={2}>
        <Typography variant="body2">Balance</Typography>
        <Typography variant="h4">18 000 {currencySymbols.usd}</Typography>
        <Typography variant="h4">18 000 {currencySymbols.gbp}</Typography>

        <Box my={2}>
          <Grid container>
            <Grid item xs={10}>
              <CustomInput.Money
                id="amount-from"
                name="amount-from"
                value={amountFrom}
                defaultValue={0}
                handleChange={handleChangeInputFrom}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                id="currency-from"
                value={currency.from}
                onChange={handleChangeSelect('from')}
                options={currencies}
              />
            </Grid>
          </Grid>
        </Box>
        <Box my={1}>
          <Typography variant="caption">
            1 {currencySymbols.eur} = 0.5 {currencySymbols.gbp}
          </Typography>
        </Box>

        <Box my={2}>
          <Grid container>
            <Grid item xs={10}>
              <CustomInput.Money
                id="amount-to"
                name="amount-to"
                value={amountTo}
                defaultValue={0}
                handleChange={handleChangeInputTo}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                id="currency-to"
                value={currency.to}
                onChange={handleChangeSelect('to')}
                options={currencies}
              />
            </Grid>
          </Grid>
        </Box>
        <Box my={1}>
          <Typography variant="caption">
            1 {currencySymbols.gbp} = 1.12 {currencySymbols.eur}
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

export default Home
