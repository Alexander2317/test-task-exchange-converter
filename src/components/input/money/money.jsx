// @flow

import * as React from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import makeStyles from '@material-ui/styles/makeStyles'
import BigNumber from 'bignumber.js'

import { bignumberConfig } from '../../../config'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

type Props = {
  id: string,
  name: string,
  value: string | number,
  handleChange: Function,
}

const Money = ({ id, name, value, handleChange }: Props): React.Node => {
  const { useCallback } = React
  const styles = useStyles()
  const onChange = useCallback((event) => {
    let formattedValue = event.target.value.trim()
    const regExp = /^\d+(\.\d{0,2})?$/g
    if (!formattedValue) {
      return handleChange('0.00')
    }

    if (Number.isNaN(Number(formattedValue))) {
      return false
    }

    if (!regExp.test(formattedValue)) {
      return false
    }

    if (
      formattedValue.length === 2 &&
      formattedValue[1] !== '.' &&
      formattedValue[0] === '0'
    ) {
      formattedValue = formattedValue[1]
    }

    return handleChange(formattedValue)
  }, [])
  const onBlur = (event) => {
    const formattedValue = new BigNumber(event.target.value).toFormat(
      bignumberConfig.base.DECIMAL_PLACES,
    )
    handleChange(formattedValue)
  }

  return (
    <FormControl className={styles.root}>
      <Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </FormControl>
  )
}

export default Money
