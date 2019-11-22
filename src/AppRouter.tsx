import React from 'react';
import history from './services/history';
import { Route, Switch, Router } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import Stats from './views/Stats';
import News from './views/News';
import Calculator from './views/Calculator';
import About from './views/About';

const AppRouter: React.FC = () => {
  return (
      <Router history={history}>
          <HeaderBar/>
          <Switch>
              <Route path="/stats" exact={true} component={Stats} />
              <Route path="/news" exact={true} component={News} />
              <Route path="/about" exact={true} component={About} />
              <Route path="/" exact={true} component={Calculator} />
          </Switch>
      </Router>
  );
};

export default AppRouter;
