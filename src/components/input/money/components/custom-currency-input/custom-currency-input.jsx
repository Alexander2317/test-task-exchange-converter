// @flow

import * as React from 'react'
import NumberFormat from 'react-number-format'

import { constants } from '../../../../../__data__'

type Props = {
  name: string,
  onChange: Function,
  inputRef: Function,
}

const CustomCurrencyInput = ({
  inputRef,
  onChange,
  ...props
}: Props): React.Node => {
  const { useCallback } = React
  const handleChange = useCallback((values) => {
    onChange({
      target: {
        name: props.name,
        value: values.value,
      },
    })
  }, [])

  return (
    <NumberFormat
      {...props}
      getInputRef={inputRef}
      onValueChange={handleChange}
      allowNegative={false}
      decimalSeparator={constants.base.DECIMAL_SEPARATOR}
      decimalScale={constants.base.DECIMAL_LIMIT}
    />
  )
}

export default CustomCurrencyInput
