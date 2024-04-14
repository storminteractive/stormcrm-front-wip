import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ClientList = React.lazy(() =>
  import('./list/client-list')
);
const ClientDetails = React.lazy(() =>
  import('./details/client-details')
);
const ClientAdd = React.lazy(() =>
  import('./add/client-add')
);
const ClientEdit = React.lazy(() =>
  import('./edit/client-edit')
);

const Clients = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>

      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} render={props => <ClientList {...props} />}/>

      <Route path={`${match.url}/details/:id`} render={props => <ClientDetails {...props} />} />
      <Route path={`${match.url}/add`} render={props => <ClientAdd {...props} />} />
      <Route path={`${match.url}/edit/:id`} render={props => <ClientEdit {...props} />}/>

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Clients;
