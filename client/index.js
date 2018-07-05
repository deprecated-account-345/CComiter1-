import React from 'react'
import ReactDOM from 'react-dom'
import styled, {
  ThemeProvider,
} from 'styled-components'
import { Provider } from 'react-redux'
import store from './store'

import theme from '../theme'
import {
  Main,
} from './screens'
import { NavBar } from './components/Organisms'
import { CallWindow } from './components/Atoms'

const options = [
  {
    text: 'Home',
    href: 'facebook.com',
    fa: 'fa-home',
    active: true,
  },
  {
    text: 'Call History',
    href: 'facebook.com',
    fa: 'fa-history',
  },
  {
    text: 'Metrics',
    href: 'facebook.com',
    fa: 'fa-bar-chart',
  },
  {
    text: 'Customer Lookup',
    href: 'facebook.com',
    fa: 'fa-search',
  },
]

const Body = styled.main`
  margin-left: 110px;
`

class App extends React.Component {
  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <NavBar options={options} />
          <Body>
            <Main />
          <CallWindow />
          </Body>
        </React.Fragment>
      </ThemeProvider>

    )
  }
}

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('app'),
)

if (module.hot) {
  module.hot.accept()
}

