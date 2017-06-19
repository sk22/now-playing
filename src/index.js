import React from 'react'
import ReactDOM from 'react-dom'
import 'material-components-web/dist/material-components-web.css'
import { autoInit } from 'material-components-web'

import App from './app'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))

autoInit()
registerServiceWorker()
