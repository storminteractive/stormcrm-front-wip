import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Alert, Button } from "reactstrap";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";

import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
// import IntlMessages from "../../helpers/IntlMessages";
import axios from 'axios';
import appConstant from '../../constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogged: false,
      error: ""
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
      error: ""
    });
  }

  loginUser = async () => {
    let url = appConstant.authenticate;

    await axios.post(url, {email: this.state.email, password: this.state.password},{ withCredentials: true }).then(
        (resp) => {
          //console.log(`TCL: App -> checkLogin -> resp`, resp);
          this.setState({isLogged: true});
          //localStorage.setItem('token', resp.data.token);
        },
        (error) => {
          //console.log(`TCL: App -> checkLogin -> error`, error);
          this.setState({isLogged: false, error: "Authentication error"});
        }
      );
  }

  render() {
    const { password, email } = this.state;
    const initialValues = {email,password};

    if (this.state.isLogged) { return <Redirect to="/app/clients/list" />; }
    else return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position relative image-side">
              {/* 
              <p className="text-white h1">IronCRM</p>
              <p className="text-white h2">Know your customers. Drive value.</p>
              */}
            </div>
            <div className="form-side">
              <CardTitle className="mb-4">
                Child Development Center Login 
              </CardTitle>

              <Formik initialValues={initialValues} onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Alert
                      color="warning"
                      className="rounded"
                      isOpen={this.state.error !== ""}
                    >
                      {this.state.error}
                    </Alert>

                    <FormGroup className="form-group has-float-label">
                      <Label>Email</Label>
                      <Field
                        className="form-control"
                        name="email"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>Password</Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={this.handleInputChange}
                        value={this.state.password}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-end align-items-center">
                      <div className="mr-2"><NavLink to={`/add-external`}>Register</NavLink></div>
                      {/*
                      <div className="mr-2"><NavLink to={`/user/forgot-password`}>Forgot password?</NavLink></div>
                       */}
                      <Button 
                        color="primary" 
                        className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                        size="lg"
                        onClick={this.loginUser}
                      >
                        <span className="label">Login</span>
                      </Button>

                    </div>
                  </Form>
                )}
              </Formik>
            </div>


          </Card>
        </Colxx>
      </Row>
         );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect( mapStateToProps, { loginUser })(Login);
