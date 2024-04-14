import React, { Component } from "react";
import { Row, Button, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { NavLink, Link } from "react-router-dom";
import urls from '../../../constants';

class PageHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
      searchField: ""
    };
  }

  toggleDisplayOptions = () => {this.setState(prevState => ({ displayOptionsIsOpen: !prevState.displayOptionsIsOpen }));};
  toggleSplit =()=> { this.setState(prevState => ({ dropdownSplitOpen: !prevState.dropdownSplitOpen }));}
  onSearchKey = (e) =>{ this.setState({searchField: e.target.value},this.props.handleSearchChange(e.target.value)); }

  render() {
    const {
      selectedOrderOption,
      match,
      orderOptions
    } = this.props;

    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Invoices list</h1>
            <div className="text-zero top-right-button-container">
              <NavLink to="/app/invoices2/add" location={{}} className="list-item-heading mb-1 truncate w-40 w-xs-100">
                <Button color="primary" size="lg" className="top-right-button">
                  ADD NEW
                </Button>
              </NavLink>

              <Link to={{pathname: urls.exportInvoices}} target="_blank" className="list-item-heading mb-1 truncate w-40 w-xs-100">
                <Button color="primary" size="lg" className="top-right-button">
                  REPORT
                </Button>
              </Link>

              <NavLink to="/app/products/list" className="list-item-heading mb-1 truncate w-40 w-xs-100">
                <Button color="primary" size="lg" className="top-right-button">
                  PRODUCTS
                </Button>
              </NavLink>

            </div>
            <Breadcrumb match={match} />
          </div>

          <div className="mb-2">
            <div className="d-block d-md-inline-block pt-1">
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle caret color="outline-dark" size="xs">
                  Order by {selectedOrderOption.label}
                </DropdownToggle>
                <DropdownMenu>
                  {orderOptions.map((order, index) => {
                    return (
                      <DropdownItem key={index} onClick={() => this.props.handleOrderChange(order.column, order.label)}>
                        {order.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder={"Search..."}
                  onKeyUp={e => this.onSearchKey(e)}
                />
              </div>
            </div>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default PageHeading;
