import React, { Component } from "react";
import moment from "moment";
import { Card, CardBody, Badge, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Invoices2Model from './invoices2-model'

export default class Invoices2Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      deleted: false,
      currentUrl: props.currentUrl
    }
    this.Invoices2 = new Invoices2Model(async (newState) => {await this.setState(newState); return this.state;});
  }

  render() {
    let editPath = "/app/invoices2/edit/" + this.props._id;
    let detailsPath = "/app/invoices2/details/" + this.props._id;
    if(this.state.deleted) { return <Redirect to="/app/invoices2/list" />; }

    // console.log("Invoices2Item props:", this.props);
    
    return (
      <Card className="d-flex flex-row mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            
            <NavLink to={detailsPath} location={{}} className="list-item-heading mb-1 truncate w-15 w-xs-100 text-left">
              Invoice# {this.props.number}  
            </NavLink>
            
            <p className="mb-1 text-muted text-medium w-15 w-xs-100 text-left">
              {this.props.customerName}
            </p>


            <div className="mb-1 text-muted text-medium w-15 w-xs-100 text-left">
              <Badge color={'primary'} pill style={{ fontSize: 13, marginRight: '10px' }}>
              <div className={"glyph-icon iconsminds-coins"} style={{ fontWeight: 'normal' }}></div>
              </Badge>
              {this.props.total.$numberDecimal} {this.props.currencySymbol}
            </div>


            <div className="mb-1 text-muted text-medium w-15 w-xs-100 text-left">
              <Badge color={'primary'} pill style={{ fontSize: 13, marginRight: '10px' }}>
                <div className={"glyph-icon iconsminds-calendar-4"} style={{ fontWeight: 'normal' }}></div>
              </Badge>
              {moment(this.props.date).format('YYYY-MM-DD')}
            </div>
            
            {(localStorage.getItem('isAdmin')==='true') && 
              <div className="w-15 w-xs-100 text-center">
                <Link to={editPath}><Button color="primary" size="sm">EDIT</Button></Link>{" "}
                <Button color="danger" size="sm" onClick={() => this.Invoices2.deleteItem(this.props._id)}>DELETE</Button>
              </div>
            }

          </CardBody>
        </div>
      </Card>
    );
  }
}

