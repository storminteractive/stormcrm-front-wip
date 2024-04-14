import React, { Component } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

class PageHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      match,
    } = this.props;

    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Reporting</h1>
            <Breadcrumb match={match} />
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default PageHeading;
