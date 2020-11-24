// @flow

import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSelect-root': {
      paddingLeft: theme.spacing(1),
    },
  },
}))

type Props = {
  id: string,
  value: string,
  onChange: Function,
  options: Array<{ value: string, label: string }>,
}

const Select = ({ id, value, onChange, options }: Props): React.Node => {
  const styles = useStyles()
  return (
    <TextField
      id={id}
      select
      value={value}
      onChange={onChange}
      className={styles.root}
    >
      {options.map((option) => (
        <MenuItem key={`${id}-${option.value}`} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Select
