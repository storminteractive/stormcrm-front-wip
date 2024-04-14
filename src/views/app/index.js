import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import axios from 'axios';
import appConstant from '../../constants';

const Menu = React.lazy(() => import('./menu'));
const BlankPage = React.lazy(() => import('./blank-page'));

const Clients = React.lazy(() => import('./clients'));
const Packages = React.lazy(() => import('./packages'));
const Invoices2 = React.lazy(() => import('./invoices2'));
const Reporting = React.lazy(() => import('./reporting'));
const Settings = React.lazy(() => import('./settings'));
//end-of-menu

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      isLogged: false
    }
  }
  async checkLogin(){
    let url = appConstant.checkAuth;
    //console.log(`TCL: App -> checkLogin -> url`, url);

    axios.get(url,{ withCredentials: true }).then(
        (resp) => {
          //console.log(`TCL: App -> checkLogin -> resp`, resp);
          this.setState({isLogged: true, loading: false});
        },
        (error) => {
          //console.log(`TCL: App -> checkLogin -> error`, error);
          this.setState({isLogged: false, loading: false});
        }
      );
  }

  componentDidMount() {
    this.checkLogin();
  }
  
  render() {
    const { match } = this.props;

    if (this.state.loading) { return "Loading..."; }
    if (!this.state.isLogged) { return <Redirect to="/user/login" />; }
    else return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Route
                path={`${match.url}/clients`}
                render={props => <Clients {...props} />}
              />
              <Route
                path={`${match.url}/packages`}
                render={props => <Packages {...props} />}
              />
              <Route
                path={`${match.url}/menu`}
                render={props => <Menu {...props} />}
              />
              <Route
                path={`${match.url}/blank-page`}
                render={props => <BlankPage {...props} />}
              />
              <Route path={`${match.url}/invoices2`} render={props => <Invoices2 {...props} />} />
              <Route path={`${match.url}/reporting`} render={props => <Reporting {...props} />} />
              <Route path={`${match.url}/settings`} render={props => <Settings {...props} />} />
              {/* end-of-routes */}
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
