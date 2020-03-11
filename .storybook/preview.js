import React from 'react'
import { addDecorator } from '@storybook/react'
import { MuiThemeProvider } from '@material-ui/core'
import { withKnobs } from '@storybook/addon-knobs'

addDecorator(story => (
  <div style={{ padding: '20px' }}>
    <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>
  </div>
))
addDecorator(withKnobs)
