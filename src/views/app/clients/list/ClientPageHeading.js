// import React, { Component, Fragment } from "react";
import React, { Component } from "react";
import {
  Row,
  // Collapse,
  Button,
  InputGroup,
  Input,
  // Card,
  // CardBody,
  // Form,
  // FormGroup,
  // Label,
  // ButtonGroup,
  // ButtonDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";
// import Select from "react-select";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import "./styles.css";
// import { Link, NavLink } from "react-router-dom";
import { NavLink } from "react-router-dom";

class ClientPageHeading extends Component {
  constructor(props) {
    super();

    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
      accordion: [false],
      nestingDropdownOpen: false,
      selectedOrderOption: props.selectedOrderOption
    };
  }

  nestingToggle = () => {
    this.setState({
      nestingDropdownOpen: !this.state.nestingDropdownOpen
    });
  };

  toggleAccordion = tab => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state
    });
  };

  render() {
    const {
      match,
      onSearchKey,
      // orderOptions,
    } = this.props;

    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Client list</h1>
            <div className="text-zero top-right-button-container">

              {/* <ButtonGroup color="primary" className="mb-2 w-100">
                <Button color="primary" className="simple-icon-plus"><span className="pl-2">ADD NEW</span></Button>
                <ButtonDropdown color="primary" isOpen={this.state.nestingDropdownOpen} toggle={this.nestingToggle}>
                  <DropdownToggle color="primary" caret>
                    OPTIONS
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      Export all
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup> */}

              
              <NavLink to="/app/clients/add" location={{}} className="list-item-heading mb-1 w-40 w-xs-100 mr-2">
                <Button color="primary" size="sm" className="top-right-button">
                  ADD NEW
                </Button>
              </NavLink>
              {/* <Link to={{ pathname: urls.exportCustomers }} target="_blank" className="list-item-heading mb-1 w-40 w-xs-100">
                <Button color="primary" size="sm" className="top-right-button">
                  EXPORT
                </Button>
              </Link> */}
             
              
            </div>
            <Breadcrumb match={match} />
          </div>

          <Row>
            <Colxx xxs="12" className="mb-3">
              <InputGroup className="mb-3">
                <Input className="mysearch" placeholder={"Search"} name="keyword" id="search" onKeyUp={e => onSearchKey(e)} />
              </InputGroup>
              {/* <Fragment>
                <div style={{ 'borderColor': '#d7d7d7', 'borderWidth': 1, 'borderStyle': 'solid', 'borderRadius': 10, 'backgroundColor': 'white' }}>
                  <Button color="link" style={{ 'fontWeight': 'bold', 'color': 'black' }} onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]}>
                    Advanced filtering
                  </Button>
                  <Collapse isOpen={this.state.accordion[0]}>

                    <Card>
                      <CardBody>
                        <Form>
                          <FormGroup row>

                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="sortColumn">Sort column</Label>
                                <Select
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="sortColumn"
                                  value={this.props.selectedOrderOption}
                                  onChange={e => { console.log(e) }}
                                  options={orderOptions}
                                />
                              </FormGroup>
                            </Colxx>

                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="sortDirection">Sort direction</Label>
                                <Select
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="sortDirection"
                                  value={this.props.selectedOrderDirection}
                                  onChange={e => { console.log(e) }}
                                  options={this.props.orderDirectionOptions}
                                />
                              </FormGroup>
                            </Colxx>

                          </FormGroup>
                        </Form>
                      </CardBody>
                    </Card>

                  </Collapse>
                </div>
              </Fragment> */}
            </Colxx>
          </Row>

          <Separator className="mb-3 mt-1" />

        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(ClientPageHeading);
