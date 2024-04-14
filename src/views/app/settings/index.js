import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const SettingsEdit = React.lazy(() =>import('./settings-edit'));

const Settingss = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>

      <Redirect exact from={`${match.url}/`} to={`${match.url}/edit`} />
      <Route path={`${match.url}/edit`} render={props => <SettingsEdit {...props} />} />
      <Redirect to="/error" />

    </Switch>
  </Suspense>
);
export default Settingss;
