import React from 'react';
import { PropTypes } from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import ThemeWrapper from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App(props) {
  const { history } = props;
  return (
    <ThemeWrapper>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={LoginDedicated} />
          <Route path="/app" component={Application} />
          <Route component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeWrapper>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
