import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Application from './Application';
import ThemeWrapper from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  return (
    <ThemeWrapper>
      <Switch>
        <Route path="/" component={Application} />
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}

export default App;
