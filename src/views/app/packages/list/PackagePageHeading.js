import React, { useState, Fragment, useContext } from "react";
import { Row, Collapse, Button, InputGroup, Input, Card, CardBody, Form, FormGroup, Label, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Select from "react-select";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import "./styles.css";
import { SearchContext } from '../context/searchProvider';

function ListPageHeading(props) {

  const [buttonDropdownOpen, setButtonDropdownOpen] = useState(false);
  const [filterBoxOpen, setFilterBoxOpen] = useState(false);

  const { searchValue, sortOptions, sortColumn, sortDirection, sortDirectionOptions, handleSearchChange } = useContext(SearchContext);
  console.log("ListPageHeading -> searchValue, sortOptions, sortColumn, sortDirection, sortDirectionOptions, handleSearchChange:", searchValue, sortOptions, sortColumn, sortDirection, sortDirectionOptions, handleSearchChange);

  const searchKey = (e) => {
    let txt = e.target.value
    console.log("Search pressed: ",txt);
  }

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>Package list</h1>
          <div className="text-zero top-right-button-container">

            <ButtonGroup color="primary" className="mb-2 w-100">
              <Button color="primary" className="simple-icon-plus" onClick={()=>{props.history.push('/app/packages/add')}}><span className="pl-2">ADD NEW</span></Button>
              <ButtonDropdown color="primary" isOpen={buttonDropdownOpen} toggle={()=>setButtonDropdownOpen(!buttonDropdownOpen)}>
                <DropdownToggle color="primary" caret>
                  OPTIONS
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    Export
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>

          </div>
          <Breadcrumb match={props.match} />
        </div>

        <Row>
          <Colxx xxs="12" className="mb-3">
            
            <InputGroup className="mb-3">
              <Input className="mysearch" placeholder={"Search"} name="keyword" id="search" onKeyUp={e => searchKey(e)} />
            </InputGroup>

            <Fragment>
                <div style={{ 'borderColor': '#d7d7d7', 'borderWidth': 1, 'borderStyle': 'solid', 'borderRadius': 10, 'backgroundColor': 'white' }}>
                  <Button color="link" style={{ 'fontWeight': 'bold', 'color': 'black' }} onClick={() => setFilterBoxOpen(!filterBoxOpen)} aria-expanded={filterBoxOpen}>
                    Advanced filtering
                  </Button>
                  <Collapse isOpen={filterBoxOpen}>

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
                                  value={sortColumn}
                                  // onChange={e => { console.log(e) }}
                                  options={sortOptions}
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
                                  value={sortDirection}
                                  // onChange={e => { console.log(e) }}
                                  options={sortDirectionOptions}
                                />
                              </FormGroup>
                            </Colxx>

                          </FormGroup>
                        </Form>
                      </CardBody>
                    </Card>

                  </Collapse>
                </div>
              </Fragment>
          </Colxx>
        </Row>

        <Separator className="mb-3 mt-1" />

      </Colxx>
    </Row>
  );
}

export default ListPageHeading;
