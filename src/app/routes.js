import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Loading, Page } from 'app/components'
import Storage from 'app/utils/storage'
import Header from './header'

const Login = lazy(() => import('app/pages/auth/login'))
const Home = lazy(() => import('app/pages/home'))
const NotFound = lazy(() => import('app/pages/not-found'))
const Profile = lazy(() => import('app/pages/profile'))
const Users = lazy(() => import('app/pages/users'))
const Schedules = lazy(() => import('app/pages/schedules'))
const Topics = lazy(() => import('app/pages/topics'))
const Category = lazy(() => import('app/pages/category'))
const SchedulesDetails = lazy(() => import('app/pages/schedules-details'))

const AuthRoute = (props) => {
  const signedIn = Storage.has('ACCESS_TOKEN')

  return signedIn
    ? <Route {...props} />
    : <Redirect to="/login" />
}
const PrivateRoute = ({ condition, redirect, ...props }) => {
  condition = condition()

  if (condition) return <Route {...props} />
  return <Redirect to={redirect} />
}

export default class extends Component {
  _renderLazyComponent = LazyComponent => props => <LazyComponent {...props} />

  _renderAdminRoutes = props => (
    <>
      <Header history={props.history} />
      <Suspense fallback={<Page><Loading /></Page>}>
        <Switch>
          <Route exact path="/admin" component={this._renderLazyComponent(Schedules)} />
          <Route
            path="/admin/users"
            component={this._renderLazyComponent(Users)}
          />
          <Route
            path="/admin/category"
            component={this._renderLazyComponent(Category)}
          />
        </Switch>
      </Suspense>
    </>
  )

  _renderAuthRoutes = props => (
    <>
      <Header history={props.history} />
      <Suspense fallback={<Page><Loading /></Page>}>
        <Switch>
          <Route exact path="/" component={this._renderLazyComponent(Home)} />
          <Route
            path="/profile"
            component={this._renderLazyComponent(Profile)}
          />
          <Route
            path="/schedules"
            component={this._renderLazyComponent(Schedules)}
          />
          <Route
            path="/topics"
            component={this._renderLazyComponent(Topics)}
          />
          <Route
            path="/schedules-details/:id"
            component={this._renderLazyComponent(SchedulesDetails)}
          />
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </>
  )

  render() {
    return (
      <Suspense fallback={<Page><Loading /></Page>}>
        <Switch>
          <Route path="/login" component={this._renderLazyComponent(Login)} />
          <Route path="/admin/login" component={this._renderLazyComponent(Login)} />
          <Route path="/not-found" component={this._renderLazyComponent(NotFound)} />
          <PrivateRoute
            condition={() => Storage.has('ACCESS_TOKEN') && Storage.get('IS_ADMIN')}
            redirect="/login"
            path="/admin"
            component={this._renderAdminRoutes}
          />
          <PrivateRoute
            condition={() => Storage.has('ACCESS_TOKEN')}
            redirect="/login"
            path="/"
            component={this._renderAuthRoutes}
          />
        </Switch>
      </Suspense>
    )
  }
}
