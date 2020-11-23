// @flow

import * as React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import makeStyles from '@material-ui/styles/makeStyles'

import { Alert } from '../../components'
import { currencySymbols } from '../../config'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: '95%',
  },
  input: {
    width: '100%',
  },
  select: {
    '& .MuiSelect-root': {
      paddingLeft: theme.spacing(1),
    },
  },
  button: {
    width: '100%',
  },
}))

const currencies = [
  {
    value: 'USD',
    label: 'USD',
  },
  {
    value: 'EUR',
    label: 'EUR',
  },
  {
    value: 'GBP',
    label: 'GBP',
  },
]

const Home = (): React.Node => {
  const styles = useStyles()
  const [currency, setCurrency] = React.useState({
    from: 'EUR',
    to: 'EUR',
  })
  const [amount, setValues] = React.useState({
    from: 0,
    to: 0,
  })

  const handleChangeInput = (prop: string) => (event) => {
    setValues({ ...amount, [prop]: event.target.value })
  }

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
              <FormControl className={styles.input}>
                <Input
                  id="amount-from"
                  value={amount.from}
                  onChange={handleChangeInput('from')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="currency-from"
                select
                value={currency.from}
                onChange={handleChangeSelect('from')}
                className={styles.select}
              >
                {currencies.map((option) => (
                  <MenuItem
                    key={`currency-from-${option.value}`}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
              <FormControl className={styles.input}>
                <Input
                  id="amount-to"
                  value={amount.to}
                  onChange={handleChangeInput('to')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="currency-to"
                select
                value={currency.to}
                onChange={handleChangeSelect('to')}
                className={styles.select}
              >
                {currencies.map((option) => (
                  <MenuItem
                    key={`currency-to-${option.value}`}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
