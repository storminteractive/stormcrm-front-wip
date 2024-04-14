// TODO: check if no more and remove button then 
import React, { Fragment, useEffect, useState } from "react";
import { Row, Button } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import PackagePageHeading from "./PackagePageHeading";
import PackageListItem from './package-list-item';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { unsetMessage, unsetError, unsetDeleted, getItems, loadMore } from '../../../../redux/packages/actions';

/*
handleLoadMore = async () => {
  let newLimit = this.state.limit + 50;
  console.log(`Packages new limit:`, newLimit);
  await this.setState({ limit: newLimit });
  await this.updateGetUrl();
}
*/

const PackageList = props => {

  const handleLoadMore = () => {
    // console.log(`Props: `, props);
    // console.log(`Will load more...`);
    props.loadMore(props.searchField, props.selectedSortOption.column, props.sortDirection, props.limit+50)
  }

  const [theresMore, setTheresMore] = useState(false);

  const loadMoreButton = theresMore ? <Button color="primary" block className="mb-2" onClick={() => handleLoadMore()}>{props.loadMoreLoading?"Loading...":"Load more"}</Button> : null;

  useEffect(() => {
    // console.log("PackageList props has changed: ", props);

    if (props.headers?.['x-limit'] && props.headers?.['x-total-count']) {
      setTheresMore(parseInt(props.headers['x-limit']) < parseInt(props.headers['x-total-count']));
    }

    if (props.message) {
      swal("Success!", props.message, "success");
      props.unsetMessage();
    }
    if (props.deleted) {
      swal("Success!", "Package deleted!", "success");
      props.unsetDeleted();
      props.history.push("/app/packages/list");
    }
    if (props.error) {
      swal("Error!", props.error, "error");
      props.unsetError();
    }

  }, [props]);

  return (
    <Fragment>
      <PackagePageHeading heading="Packages list" match={props.match} />
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Row>
            {props.loading ? (<div className="loading" style={{ fontSize: 15 }}/>) : null}
            <Colxx>
              {props.items.map((item, index) => {
                return <PackageListItem key={`item_${index}`} {...item} />;
              })}
            </Colxx>
            {loadMoreButton}
          </Row>
        </Colxx>
      </Row>
    </Fragment>
  )
}

const mapDispatchToProps = { unsetMessage, unsetDeleted, unsetError, getItems, loadMore };
const mapStateToProps = (state) => ({...state.packagesReducer});
export default connect(mapStateToProps, mapDispatchToProps)(PackageList)
