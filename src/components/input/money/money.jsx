// @flow

import * as React from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import makeStyles from '@material-ui/styles/makeStyles'

import { constants } from '../../../__data__'

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
  const styles = useStyles()
  const onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    let formattedValue = event.target.value.trim()
    const regExp = /^\d+(\.\d{0,2})?$/g
    if (!formattedValue) {
      return handleChange(constants.base.ZERO)
    }

    if (Number.isNaN(Number(formattedValue))) {
      return false
    }

    if (!regExp.test(formattedValue)) {
      return false
    }

    if (
      formattedValue.length === 2 &&
      formattedValue[1] !== constants.base.DECIMAL_SEPARATOR &&
      formattedValue[0] === constants.base.ZERO
    ) {
      formattedValue = formattedValue[1]
    }

    return handleChange(formattedValue)
  }

  return (
    <FormControl className={styles.root}>
      <Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </FormControl>
  )
}

export default Money
