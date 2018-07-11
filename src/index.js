// # Default Libs
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// # CSS Imports
import 'normalize.css'
import './index.css'

// # App imports
import App from './layout/default'
import registerServiceWorker from './registerServiceWorker'

// # Redux
import configureStore from './store'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App store={store} />
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()
