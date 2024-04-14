import React, { Component, Fragment } from "react";
import ClientAdd from "./app/clients/add/client-add";

class Error extends Component {
  componentDidMount() {
    //document.body.classList.add("no-footer");
  }
  componentWillUnmount() {
    //document.body.classList.remove("no-footer");
  }

  componentDidUpdate() { }

  constructor(props) {
    super(props)
  
    this.state = {
      props: {
        match: {path: "/app/clients/add", url: "/app/clients/add", isExact: true}
      }
    }

  }
  
  render() {
    return (
      <Fragment>
        <ClientAdd {...this.state.props} external="true" />
      </Fragment>
    );
  }
}
export default Error;
