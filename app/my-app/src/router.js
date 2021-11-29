import React from 'react';

import Menu from './componentes/Menu';

import Home from './pages/home';
import Game from './pages/games';
import Login from './pages/login';
import Player from './pages/players';

import UserForm from './pages/user/form';
import UserConfig from './pages/user/configuration';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
  const email = localStorage.getItem('X-User-Email') || '';
  const token = localStorage.getItem('X-User-Token') || '';

  return email && token;
};

const PrivateRouter = ({ component: Component, ...rest }) => (
  <div>
    {/* {console.log('component', rest)} */}
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} nav={Menu} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { form: props.location },
            }}
          />
        )
      }
    />
  </div>
);

const Routes = (props) => {
  // console.log('props', props)
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/login" exact />
        <PrivateRouter component={Home} props path="/" exact />
        <PrivateRouter component={Game} props path="/games" exact />
        <PrivateRouter
          component={Player}
          props
          nav={props.nav}
          path="/players"
          exact
        />
        {/* <PrivateRouter component={PlayerForm} nav={props.nav} path="/player/create" exact/> */}
        <PrivateRouter
          component={UserForm}
          nav={props.nav}
          path="/user/create"
          exact
        />
        <PrivateRouter
          component={UserConfig}
          nav={props.nav}
          path="/user/configuration"
          exact
        />

        {/* <Route path='*' component={Game} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
