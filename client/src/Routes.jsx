// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublishPage from './PublishPage';
import MyBooksPage from './MyBooksPage';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/publish" component={PublishPage} />
        <Route path="/my-books" component={MyBooksPage} />
      </Switch>
    </Router>
  );
}

export default Routes;
