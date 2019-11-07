import React from 'react';
import history from './services/history';
import { Route, Switch, Router } from 'react-router-dom';
import Stats from './views/Stats';
import Calculator from './views/Calculator';

const AppRouter: React.FC = () => {
  return (
      <Router history={history}>
          <Switch>
              <Route path="/stats" component={Stats} />
              <Route path="/" component={Calculator} />
          </Switch>
      </Router>
  );
};

export default AppRouter;
