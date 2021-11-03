import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import NProgress from 'nprogress'

import 'app/resources/styles'
import Store from 'app/store'
import Routes from './routes'

NProgress.configure({
  speed: 300,
  showSpinner: false,
  trickleSpeed: 150,
  easing: 'ease',
  minimum: 0.1
})

function fadePreloading() {
  const preloading = document.getElementsByClassName('preloading')[0]

  var fadeEffect = setInterval(() => {
    if (!preloading.style.opacity) {
      preloading.style.opacity = 1
    }
    if (preloading.style.opacity === '1') {
      preloading.style.opacity = 0
    } else {
      clearInterval(fadeEffect)
      preloading.style.display = 'none'
    }
  }, 500)
}

function App() {
  useEffect(fadePreloading)

  return (
    <Store>
      <Routes />
    </Store>
  )
}

ReactDOM.render(<App />, document.getElementById('application'))
