import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const PackageList = React.lazy(() => import('./list/package-list'));
const PackageDetails = React.lazy(() =>import('./details/package-details'));
const PackageAdd = React.lazy(() =>import('./add/package-add'));
const PackageEdit = React.lazy(() =>import('./edit/package-edit'));

const Packages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>

      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} render={props => <PackageList {...props} />} />

      <Route path={`${match.url}/details/:id`} render={props => <PackageDetails {...props} />} />
      <Route path={`${match.url}/add/:customerid`} render={props => <PackageAdd {...props} />} />
      <Route path={`${match.url}/edit/:id`} render={props => <PackageEdit {...props} />} />
      <Route path={`${match.url}/add`} render={props => <PackageAdd {...props} />} />
      
      <Redirect to="/error" />

    </Switch>
  </Suspense>
);
export default Packages;
