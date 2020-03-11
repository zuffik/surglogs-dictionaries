import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['ubuntu', 'roboto', 'sans-serif'].join(',')
  },
  palette: {
    primary: {
      main: '#2196F3'
    },
    secondary: {
      main: '#8BC34A'
    }
  }
})
