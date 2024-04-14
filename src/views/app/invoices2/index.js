import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Invoices2Main = React.lazy(() => import('./invoices2-main'));
const Invoices2Details = React.lazy(() => import('./invoices2-details'));
const Invoices2Add = React.lazy(() => import('./invoices2-add'));
const Invoices2Edit = React.lazy(() => import('./invoices2-edit'));

const Invoices2 = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={props => <Invoices2Main {...props} />}
      />
      <Route
        path={`${match.url}/details/:id`}
        render={props => <Invoices2Details {...props} />}
      />

      <Route
        path={`${match.url}/add/:customerid`}
        render={props => <Invoices2Add {...props} />}
      />

      <Route
        path={`${match.url}/add`}
        render={props => <Invoices2Add {...props} />}
      />

      <Route
        path={`${match.url}/edit/:id`}
        render={props => <Invoices2Edit {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Invoices2;
