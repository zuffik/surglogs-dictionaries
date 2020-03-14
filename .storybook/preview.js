import React from 'react'
import {addDecorator} from '@storybook/react'
import {MuiThemeProvider} from '@material-ui/core'
import {withKnobs} from '@storybook/addon-knobs'
import {theme} from "../src/services/Theme";
import StoryRouter from 'storybook-react-router';
import addons from '@storybook/addons'
import registerRedux from 'addon-redux/register'
import configureStore from 'redux-mock-store'
import {State} from "../src/redux/State";
import {Provider} from "react-redux";

registerRedux(addons)

const middlewares = []
const mockStore = configureStore(middlewares)
const store = mockStore(new State())

addDecorator(StoryRouter())
addDecorator(story => (
    <div style={{padding: '20px'}}>
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                {story()}
            </Provider>
        </MuiThemeProvider>
    </div>
))
addDecorator(withKnobs)
