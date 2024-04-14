import React from "react";
import { Card, CardBody, Button, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { connect } from 'react-redux';
import *  as actions from '../../../../redux/packages/actions';
import swal from 'sweetalert';

const PackageListItem = props => {
  let createdDate = moment(props.createdDate).format("YYYY-MM-DD");
  let details = "/app/packages/details/" + props._id;

  const handleDelete = (e) => {
    swal({
      title: `Delete warning`,
      text: `Are you sure you want to proceed with delete?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        props.dispatch(actions.deleteItem(props._id));
      }
    });
  }

  return (
    <Card className="d-flex flex-row mb-3">
      <div className="d-flex flex-grow-1 min-width-zero">
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          
          <NavLink to={details} location={{}} className="list-item-heading mb-1 truncate w-15 w-xs-100">
            {props.code}
          </NavLink>
          
          <p className="mb-1 text-muted text-medium w-15 w-xs-100">
            {props.customerName}
          </p>
          
          <div className="mb-1 text-muted text-medium w-15 w-xs-100">
              Created: {createdDate}
          </div>
          
          <p className="mb-1 text-muted text-medium w-15 w-xs-100">
            Remaining: {props.remainingUsage}
          </p>
          <div className="w-20 w-xs-100 text-center">
            <Row>
              {props.productName}
            </Row>
          </div>

          <div className="w-15 w-xs-100 text-center">
            <Button color="danger" size="sm" onClick={handleDelete}>
              DELETE
            </Button>
          </div>

        </CardBody>
      </div>
    </Card>
  )
}

const mapStateToProps = (state) => ({...state.packagesReducer});
//const mapDispatchToProps = { deleteItem }
//export default connect(mapStateToProps, mapDispatchToProps)(PackageListItem)
export default connect(mapStateToProps)(PackageListItem)
