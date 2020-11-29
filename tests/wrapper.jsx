import * as React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const MaterialUIWrapper = ({ children }) => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export { MaterialUIWrapper }
