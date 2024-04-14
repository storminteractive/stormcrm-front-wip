import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Redirect } from "react-router-dom";

import ClientModel from '../ClientModel';

import CustomerDetailsCard from './CustomerDetailsCard.js';

import ActionsCard from "./ActionsCard";
import BookingsCard from "./BookingsCard";
import InvoicesCard from "./InvoicesCard";
import MembershipsCard from "./MembershipsCard";
import PackagesCard from "./PackagesCard";
import InternalNotesCard from "./InternalNotesCard";
import RemindersCard from "./RemindersCard";

export default class ClientListPage extends Component {

  constructor(props) {
    super(props);
    this.Client = new ClientModel(s => this.setState(s));
    this.state = this.Client.getInitState(this.props.match.params.id);
  }

  componentDidMount = () => {
    this.Client.loadData(this.state.id)
  }

  render() {
    if (this.state.isDeleted) { return <Redirect to="/app/clients/list" />; }
      
    return (
      <Fragment>
        {/* Page header */}
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.clients" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        {/* Customer details, actions */}
        <Row>
          <Colxx sm="12" xl="8" className="col-left">
            <CustomerDetailsCard customerId={this.state.id}/>
          </Colxx>
          <Colxx sm="12" xl="4" className="col-left mb-4">
            <ActionsCard customerId={this.state.id} handleDelete={ ()=> this.Client.deleteId(this.state.id)}/>
          </Colxx>
        </Row>

        {/* Scroll components row */}
        <Row>
          {/* Bookings card */}
          <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
            <BookingsCard bookings={this.state.schedules} customerId={this.state.id} />
          </Colxx>
          {/* Invoices card */}
          <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
            <InvoicesCard invoices={this.state.invoices} customerId={this.state.id} />
          </Colxx>
          {/* Memberships card */}
          <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
            <MembershipsCard memberships={this.state.memberships} customerId={this.state.id} />
          </Colxx>
          {/* Packages card */}
          <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
            <PackagesCard packages={this.state.packages} customerId={this.state.id} />
          </Colxx>
          {/* Notifications card */}
          <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
            <RemindersCard notifications={this.state.notifications} customerId={this.state.id} />
          </Colxx>
        </Row>

        {/* Internal notes */}
        <Row>
          <Colxx xxs="12" md="12" xl="12" className="col-left mb-2">
            <InternalNotesCard internalNotes={this.state.internalNotes} customerId={this.state.id} handleUpdateNotes={this.Client.updateNotes}/>
          </Colxx>
        </Row>

      </Fragment>
    );
  }
}
