// TODO: check if no more and remove button then 
import React, { Fragment, useEffect, useState } from "react";
import { Row, Button } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import PackagePageHeading from "./PackagePageHeading";
import PackageListItem from './package-list-item';
import swal from 'sweetalert';
import service from '../service'

import { SearchProvider } from '../context/searchProvider';

const PackageList = props => {

  const [theresMore, setTheresMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const handleLoadMore = () => {
    props.loadMore(props.searchField, props.selectedSortOption.column, props.sortDirection, props.limit + 50)
  }
  const loadMoreButton = theresMore ? <Button color="primary" block className="mb-2" onClick={() => handleLoadMore()}>{props.loadMoreLoading ? "Loading..." : "Load more"}</Button> : null;

  const loadItems = async () => {
    setLoading(true);
    let r = await service.getAll();
    if (r.error){
      swal("Errror!",r.error,"error");
      return;
    }
    setItems(r.data);
    setLoading(false);
  }

  /* eslint react-hooks/exhaustive-deps: 0 */  
  useEffect(()=>{
    loadItems()
  },[]);

  return (
    <Fragment>
      <SearchProvider>
        <PackagePageHeading heading="Packages list" {...props} />
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Row>
              {loading ? (<div className="loading" style={{ fontSize: 15 }} />) : null}
              <Colxx>
                {items.map((item, index) => {
                  return <PackageListItem key={`item_${index}`} {...item} />;
                })}
              </Colxx>
              {loadMoreButton}
            </Row>
          </Colxx>
        </Row>
      </SearchProvider>
    </Fragment>
  )
}

// const mapDispatchToProps = { unsetMessage, unsetDeleted, unsetError, getItems, loadMore };
// const mapStateToProps = (state) => ({ ...state.packagesReducer });
// export default connect(mapStateToProps, mapDispatchToProps)(PackageList)
export default PackageList;