import React, {useEffect} from "react";
import { Row, Button, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";

import { connect } from 'react-redux';
import { getItems, setSearchField, setSorting } from '../../../../redux/actions';

const PackagePageHeading = (props) => {


  /* eslint react-hooks/exhaustive-deps: 0 */  
  useEffect(() => { 
    props.getItems(props.searchField, props.selectedSortOption.column, props.sortDirection, props.limit)
  }, [props.selectedSortOption, props.sortDirection]);

  const handleSearchChange = (e) => {
    let searchFieldValue = e.target.value;
    props.setSearchField(searchFieldValue);
    if (searchFieldValue.length>=3) { props.getItems(e.target.value, props.selectedSortOption.column, props.sortDirection);}
    if (searchFieldValue.length===0) { props.getItems(e.target.value, props.selectedSortOption.column, props.sortDirection);}
  }

  const handleChangeOrder = async (newSorting) => {
    await props.setSorting(newSorting);
  }

  //console.log(`Packages heading props:`, props);

    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Packages list</h1>
            <div className="text-zero top-right-button-container">
              
              <NavLink to="/app/packages/add" location={{}} className="list-item-heading mb-1 truncate w-40 w-xs-100">
                <Button color="primary" size="sm" className="top-right-button">ADD NEW</Button>
              </NavLink>{" "}
              <NavLink to="#" location={{}} className="list-item-heading mb-1 truncate w-40 w-xs-100">
                <Button color="primary" size="sm" className="top-right-button">EXPORT</Button>
              </NavLink>

            </div>
            <Breadcrumb match={props.match} />
          </div>

          <div className="mb-2">
              <div className="d-block d-md-inline-block pt-1">

                <UncontrolledDropdown direction={props.sortDirection==='asc'?"up":"down"} className="mr-1 float-md-left btn-group mb-1">
                  
                  <DropdownToggle caret color="outline-dark" size="xs">
                    Order by {props.selectedSortOption.label}
                  </DropdownToggle>

                  <DropdownMenu>
                    {props.sortOptions.map((sortOption, index) => {
                      return (
                        <DropdownItem key={index} onClick={() => handleChangeOrder({column: sortOption.column, label: sortOption.label})}>
                          {sortOption.label}
                        </DropdownItem>
                      )
                    })}
                  </DropdownMenu>

                </UncontrolledDropdown>

                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={'Search'}
                    onKeyUp={e => handleSearchChange(e)}
                  />
                </div>

              </div>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
}

const mapStateToProps = (state) => ({...state.packagesReducer});
const mapDispatchToProps = { getItems, setSearchField, setSorting }
export default connect(mapStateToProps, mapDispatchToProps)(PackagePageHeading)
