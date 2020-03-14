import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { store } from './redux/Store'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { theme } from './services/Theme'
import { BrowserRouter } from 'react-router-dom'
import { RouterLayout } from './components/router/RouterLayout'

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <RouterLayout />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
