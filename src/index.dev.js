import './app/bootstrap'

if (module.hot) {
  module.hot.accept('./app/bootstrap', () => {
    require('./app/bootstrap')
  })
}
