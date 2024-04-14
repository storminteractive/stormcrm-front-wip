import React, { Component, Fragment } from "react";
import { Row, Table } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Redirect, NavLink } from 'react-router-dom';
import moment from 'moment';
import swal from 'sweetalert';
import Invoices2Model from './invoices2-model'

export default class Invoices2Details extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      deleted: false,
      customerId: {},
      date: '',
      name: 'Loading...',
      price: 'Loading...',
      products: [],
      subtotal: 0,
      total: 0,
      discount: 0,
      taxTotal: 0
    }
    this.Invoices2 = new Invoices2Model(async (newState) => { await this.setState(newState); return this.state; });
  }

  componentDidMount = () => {
    this.Invoices2.loadDetails(this.props.match.params.id);
  }

  deleteItem = () => {
    this.Invoices2.deleteItem(this.state.id);
  }

  emailInvoice = () => {
    this.setState({loading: true});

    this.Invoices2.emailInvoice(this.state.id,(e,res)=>{
      let icon = "success"
      if(res==="ERROR") icon = "warning";
      swal({title: "Email",text: res,icon});
      this.setState({loading: false});
    });
  }

  render() {
    if (this.state.deleted) { return <Redirect to="/app/invoices2/list" />; }

    let displayConsume = parseInt(this.state.remainingUsage)>0?'block':'none';
    let classConsume = parseInt(this.state.remainingUsage)>0?'d-flex flex-row align-items-center mb-3':'';
    const downloadUrl = this.Invoices2.downloadUrl+this.state.id;
    //const created = moment(this.state.created).format("YYYY-MM-DD");
    const editUrl = '/app/invoices2/edit/' + this.state.id;

    
    return this.state.loading?<div className="loading" />:(
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="Invoices" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>

        <Colxx xxs="12" md="12" xl="9" className="col-left mb-2">
        <Card className="mb-5 invoice-contents">
            <CardBody
              className="d-flex flex-column justify-content-between"
              id="invoicePrintableArea"
            >
              <div className="d-flex flex-column">

                <div className="d-flex flex-row justify-content-between mb-0" style={{marginTop: 200}}>
                  <h1 style={{marginLeft: 'auto', marginRight:'auto'}}>Invoice #{this.state.number}</h1>
                </div>

                <div className="d-flex flex-row justify-content-between mb-5">
                  <h3 style={{marginLeft: 'auto', marginRight:'auto'}}>{moment(this.state.date).format("YYYY-MM-DD")}</h3>
                </div>

                <div className="d-flex flex-row justify-content-between mb-5">
                  <div className="d-flex flex-column mr-2 p-4 text-semi-muted bg-semi-muted">
                    <p className="mb-0">{this.state.customerId.name}</p>
                    <p className="mb-0">{this.state.customerId.address}</p>
                    <p className="mb-0">{this.state.customerId.tel}</p>
                    <p className="mb-0">{this.state.customerId.email}</p>
                  </div>
                </div>

                <Table borderless style={{width: '80%'}}>
                  <thead>
                    <tr>
                      <th className="text-muted text-extra-small mb-2">
                        ITEM NAME
                      </th>
                      <th className="text-muted text-extra-small mb-2">
                        PRICE
                      </th>
                      <th className="text-muted text-extra-small mb-2">
                        COUNT
                      </th>
                      <th className="text-muted text-extra-small mb-2">
                        TAX PERCENT
                      </th>
                      <th className="text-right text-muted text-extra-small mb-2">
                        TOTAL
                      </th>
                      
                      <th className="text-right text-muted text-extra-small mb-2">
                      </th>

                      </tr>
                  </thead>
                  <tbody>
                    {this.state.products.map((item,index) => {
                      return <tr id={"row_"+index} key={index}>
                        <td>{item.name}</td>
                        <td>{parseFloat(item.price.$numberDecimal).toFixed(2)}</td>
                        <td>{item.count}</td>
                        <td>{item.taxPercent}</td>
                        <td className="text-right">{parseFloat(item.total.$numberDecimal).toFixed(2)}</td>
                        <td className="text-right"></td>
                      </tr>
                    })}
                  </tbody>
                </Table>
              </div>

              <div className="d-flex flex-column">
                <div className="border-top pt-3 mb-5" />
                <b>Note:</b>{this.state.notes}
              </div>


              <div className="d-flex flex-column">
                <div className="pt-3 mb-5" />
                <Table borderless className="d-flex justify-content-end" style={{width: '80%'}}>
                  <tbody>
                  <tr>
                      <td className="text-semi-muted">Subtotal :</td>
                      <td className="text-right">{parseFloat(parseFloat(this.state.total.$numberDecimal)-parseFloat(this.state.taxTotal.$numberDecimal)).toFixed(2)} QAR</td>
                      <td className="text-right"></td>
                    </tr>
                    <tr>
                      <td className="text-semi-muted">Discount :</td>
                      <td className="text-right">{this.state.discount} %</td>
                      <td className="text-right"></td>
                    </tr>
                    <tr className="font-weight-bold">
                      <td className="text-semi-muted">Total :</td>
                      <td className="text-right">{parseFloat(this.state.total.$numberDecimal).toFixed(2)} QAR</td>
                      <td className="text-right"></td>
                    </tr>
                    <tr className="font-weight-bold">
                      <td className="text-semi-muted">Tax value :</td>
                      <td className="text-right">{parseFloat(this.state.taxTotal.$numberDecimal).toFixed(2)} QAR</td>
                      <td className="text-right"></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" md="12" xl="3" className="col-left mb-2">
            <Card className="mb-4" style={{minHeight: '320px'}}>
              <CardBody>
                <CardTitle>
                  <b>Invoice options</b>
                </CardTitle>


                <div id="consume" className={classConsume} style={{display:displayConsume}}>
                <NavLink to="#" onClick={()=>this.consumeItem()}>
                    <i className="large-icon initial-height simple-icon-minus"></i>
                  </NavLink>
                  <div className="pl-3 pt-2 pr-2 pb-2">
                  <NavLink to="#" onClick={()=>this.consumeItem()}>
                      <p className="list-item-heading mb-1">Consume package</p>
                    </NavLink>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
                    <a href={downloadUrl} target='_blank' rel="noopener noreferrer">
                      <i className="large-icon initial-height simple-icon-cloud-download"></i>
                    </a>
                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <a href={downloadUrl} target='_blank' rel="noopener noreferrer">
                      <p className="list-item-heading mb-1">Download invoice</p>
                    </a>
                  </div>
                </div>
                
                <div className="d-flex flex-row align-items-center mb-3">
                    <NavLink to="#" onClick={()=>this.emailInvoice()}>
                      <i className="large-icon initial-height simple-icon-envelope"></i>
                    </NavLink>
                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <NavLink to="#" onClick={()=>this.emailInvoice()}>
                      <p className="list-item-heading mb-1">Email invoice</p>
                    </NavLink>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
                  <NavLink to={editUrl}>
                    <i className="large-icon initial-height simple-icon-doc"></i>
                  </NavLink>
                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <NavLink to={editUrl}>
                      <p className="list-item-heading mb-1">Edit invoice</p>
                    </NavLink>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
                  <NavLink to="#" onClick={()=>this.deleteItem()}>
                    <i className="large-icon initial-height simple-icon-trash"></i>
                  </NavLink>
                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <NavLink to="#" onClick={()=>this.deleteItem()}>
                      <p
                        className="list-item-heading mb-1"
                        style={{ color: "red", fontWeight: "bold" }}
                      >
                        Delete invoice
                      </p>
                    </NavLink>
                  </div>
                </div>

              </CardBody>
            </Card>
          </Colxx>

        </Row>
      </Fragment>
    );
  }
}
