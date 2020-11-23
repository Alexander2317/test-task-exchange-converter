// @flow

import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'connected-react-router'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { configureStore, history } from './__data__'
import { bignumberConfig } from './config'

import Pages from './pages'
import './vendor.css'

bignumberConfig.setBignumberLocale()

const store = configureStore()

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const App = (): React.Node => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Router history={history}>
        <Pages />
      </Router>
    </Provider>
  </ThemeProvider>
)

export default App
