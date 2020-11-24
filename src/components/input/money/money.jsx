// @flow

import * as React from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import makeStyles from '@material-ui/styles/makeStyles'

import { CustomCurrencyInput } from './components'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

type Props = {
  id: string,
  name: string,
  value: string | number,
  defaultValue: string | number,
  handleChange: Function,
}

const Money = ({
  id,
  name,
  value,
  handleChange,
  ...props
}: Props): React.Node => {
  const { useCallback } = React

  const styles = useStyles()
  const onChange = useCallback((event) => {
    const {
      target: { value: inputValue },
    } = event
    handleChange(inputValue)
  }, [])
  const onBlur = useCallback((event) => {
    const {
      target: { value: inputValue },
    } = event
    if (inputValue === '') {
      handleChange(props.defaultValue)
    }
  }, [])

  return (
    <FormControl className={styles.root}>
      <Input
        {...props}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputComponent={CustomCurrencyInput}
      />
    </FormControl>
  )
}

export default Money
