import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Row, Button } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import axios from 'axios';
import { Card, CardBody, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import swal from 'sweetalert';
import appConstant from '../../../../constants';
import "./styles.css";

class ClientItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDelete: false,
      errorLoading: false,
      totalItems: 0,
      limit: 0,
      loading: true
    }
  }

  deleteItem = () => {
    swal({
      title: appConstant.warningHeader,
      text: appConstant.deleteWarning,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.delete();
      }
    });
  }

  delete = () => {
    const url = appConstant.customer + this.props._id;

    axios.delete(url,{ withCredentials: true }).then(
      (resp) => {
        this.setState({
          isDelete: true
        });
      },
      (error) => {
        console.log(`TCL: ClientModel -> sendGet -> error.response.data`,error.response.data);
        swal({
          title: "Error while deleting",
          text: error.response.data,
          icon: "error",
          dangerMode: true,    
        });
      }
    );
  }
  
  render() {
    let statusColor = 'primary'; // or secondary
    let detailPath = '/app/clients/details/' + this.props._id;
    let name = this.props.name;
    let tel = this.props.tel;
    let createdDisplay = moment(this.props.created);

    if(this.state.isDelete) {
      return <Redirect to="/app/clients/list" />;
    }

    return (
      <Card className="d-flex flex-row mb-3">
      <div className="d-flex flex-grow-1 min-width-zero">
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <NavLink to={detailPath} location={{}} className="list-item-heading mb-1 truncate w-40 w-xs-100 text-center mb-3 text-lg-left mb-md-0">
            <b>{name}</b>
          </NavLink>
          
          <div className="mb-1 text-muted text-medium w-15 w-xs-100">
            <Badge color={statusColor} pill className="mybadge w-xs-100">
              <div className={"glyph-icon iconsminds-smartphone-4"} style={{ fontWeight: "normal" }}>
                <span className="pl-2">{tel}</span>
              </div>
            </Badge>{" "}
          </div>

          <div className="mb-1 text-muted text-medium w-20 w-xs-100">
            <Badge color={statusColor} pill className="w-xs-100 mybadge">
              <div className={"glyph-icon iconsminds-calendar-4"} style={{ fontWeight: "normal" }}>
                <span className="pl-2">{createdDisplay.format("YYYY-MM-DD HH:mm")}</span>
              </div>
            </Badge>{" "}
          </div>

          <div className="w-15 w-xs-100 text-center">
            <Button color="danger" size="sm" className="w-xs-100 simple-icon-trash" onClick={() => this.deleteItem()}>
                <span className="pl-2">DELETE</span>
            </Button>
          </div>
        </CardBody>
      </div>
    </Card>
    );
  }
}

export default class ClientList extends Component {

  getCustomers= () => {
    axios.get(this.state.getUrl,{ withCredentials: true })
    .then((resp)=>{
      console.log(`Customers loaded: `,resp)
      this.setState({
        loadingMsg: "",
        // loading: false,
        orders: resp.data,
        limit: resp.headers["x-limit"],
        totalItems: resp.headers["x-total-count"],
        errorLoading: false
      });
    }).catch(e => {
      //console.log("Error loading customers from the backend")
      this.setState({
        loadingMsg: `Error loading customers: ${e}`,
        // loading: false,
        errorLoading: true,
          name: 'Error',
          tel: 'Error'
      });
    });
  }

  constructor(props) {
    super();
    this.state = {
      loadingMsg: "Loading...",
      getUrl: props.getUrl,
      orders: []
    }
    this.getCustomers();
  }

  componentDidUpdate(){
    if(this.state.getUrl!==this.props.getUrl){
      //console.log(`ClientList -> componentDidUpdate received new props getUrl ${this.props.getUrl}, wil update state and getCustomers`);
      this.setState({getUrl: this.props.getUrl, loadingMsg:"Loading..."},this.getCustomers);
    }
  }

  render(){
    const onLoadMore = this.props.onLoadMore;

    let loadMoreButton = <Button color="primary" block className="mb-2" onClick={() => onLoadMore()}>Load more</Button>;
    if(this.state.loadingMsg !== "" ) loadMoreButton = "";

    let totalItems = parseInt(this.state.totalItems);
    let limit = parseInt(this.state.limit);

    return (
      <Row>
      {this.state.loading && <div className="loading" />} 
        <Colxx>
          {this.state.orders.map((order, index) => {
            return <ClientItem key={`order_${index}`} {...order} />;
          })}
        </Colxx>
        {(totalItems>limit) && loadMoreButton}
      </Row>
    );
  }
}

