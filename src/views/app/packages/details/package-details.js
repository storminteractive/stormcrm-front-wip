import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import swal from 'sweetalert';

import { connect } from 'react-redux';
import { setDeleted, unsetDeleted, getDetails, selectProduct, consume, setMessage, unsetMessage, 
  unsetError, deleteItem, emergencyCancellation } from '../../../../redux/packages/actions';

import DetailsComponent from './DetailsComponent';
import ConsumptionHistory from "./ConsumptionHistory";
import ActionsCard from "./ActionsCard";

class PackageDetails extends Component {

  constructor(props) {
    super(props);
    console.log(`PackageDetails`);
  }

  componentDidMount = () => {
    this.props.getDetails(this.props.match.params.id);
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.deleted) {
      swal("Success!", "Package deleted!", "success");
      this.props.unsetDeleted();
      this.props.history.push("/app/packages/list");
    }
    if (this.props.message) {
      swal("Success!", this.props.message, "success");
      this.props.unsetMessage();
    }
    if (this.props.error) {
      swal("Error!", this.props.error, "error");
      this.props.unsetError();
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.loading && <div className="loading" />}
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.packages" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row>

          <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
            <DetailsComponent {...this.props} />
          </Colxx>

          <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
            <ConsumptionHistory {...this.props} />
          </Colxx>

          <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
            <ActionsCard {...this.props} />
          </Colxx>

        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({...state.packagesReducer})
const mapDispatchToProps = { setDeleted, unsetDeleted, getDetails, 
    selectProduct, consume, setMessage, unsetMessage, deleteItem, unsetError, emergencyCancellation }
export default connect(mapStateToProps, mapDispatchToProps)(PackageDetails) 