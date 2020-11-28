// @flow

import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { CustomInput, Select } from '../../../../../../components'

type Props = {
  inputId: string,
  inputName: string,
  inputValue: string | number,
  inputHandleChange: Function,
  selectId: string,
  selectName: string,
  selectValue: string,
  selectHandleChange: Function,
  selectOptions: Array<{ value: string, label: string }>,
}

const Control = ({
  inputId,
  inputName,
  inputValue,
  inputHandleChange,
  selectId,
  selectName,
  selectValue,
  selectHandleChange,
  selectOptions,
}: Props): React.Node => (
  <Box my={2}>
    <Grid container>
      <Grid item xs={10}>
        <CustomInput.Money
          id={inputId}
          name={inputName}
          value={inputValue}
          handleChange={inputHandleChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Select
          id={selectId}
          name={selectName}
          value={selectValue}
          onChange={selectHandleChange}
          options={selectOptions}
        />
      </Grid>
    </Grid>
  </Box>
)

export default Control
