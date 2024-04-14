import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ReportingMain = React.lazy(() =>
  import('./reporting-main')
);

const Reporting = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={props => <ReportingMain {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Reporting;
