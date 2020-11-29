import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

const MaterialUIWrapper = ({ children }) => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export { MaterialUIWrapper }
