import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './AppContainer'
import { Provider } from 'react-redux'
import store from '~redux/store'

const appRoot = document.getElementById('app-root')
ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    appRoot
)

