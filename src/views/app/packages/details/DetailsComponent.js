import React from 'react'
import { Card, CardBody, CardTitle, Label, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const DetailsComponent = (props) => {

  if (!props.details) {
    return (<div className="loading"/>)
  } else {

    let expiryStyle = { color: 'black' };
    if (props.details.expiry) {
      if (moment(props.expiry).isBefore(moment())) {
        expiryStyle = { color: 'red' };
      }
    }

    return (
      <Card className="mb-4" style={{ minHeight: '320px' }}>
        <CardBody>
          <CardTitle>
            <b>Package Details</b>
          </CardTitle>
          <table className="table table-sm table-borderless">
            <tbody>
              <tr key="1">
                <td>
                  <Label>Customer Name</Label>
                </td>
                <td>
                  <span className="font-weight-medium">
                    <a href={"/app/clients/details/"+props.details.customerId}>{props.details.customerName}</a>
                  </span>
                </td>
              </tr>
              <tr key="2">
                <td>
                  <Label>Product name</Label>
                </td>
                <td>
                  <span className="font-weight-medium">{props.details.productName}</span>
                </td>
              </tr>
              <tr key="3">
                <td>
                  <Label>Remaining usage</Label>
                </td>
                <td>
                  <span className="font-weight-medium">{props.details.remainingUsage}</span>
                </td>
              </tr>
    
              <tr key="4">
                <td>
                  <Label>Created</Label>
                </td>
                <td>
                  <span className="font-weight-medium">
                    {moment(props.details.created).format("YYYY-MM-DD")} ({moment(props.details.created).toNow(true)} ago)
                  </span>
                </td>
              </tr>
    
              <tr key="5">
                <td>
                  <Label>Code</Label>
                </td>
                <td>
                  <span className="font-weight-medium">
                    {props.details.code}
                  </span>
                </td>
              </tr>
    
              {(props.details.expiry)?(
              <tr key="6">
                <td>
                  <Label>Expiry date</Label>
                </td>
                <td>
                  <span className="font-weight-medium" style={expiryStyle}>
                    {moment(props.details.expiry).format('YYYY-MM-DD')}
                  </span>
                </td>
              </tr>
              ):null}
              
              {(props.details.note)?(
              <tr key="7">
                <td>
                  <Label>Note</Label>
                </td>
                <td>
                  <span className="font-weight-medium">
                    {props.details.note}
                  </span>
                </td>
              </tr>
              ):null}

              {(props.details.emergencyCancellation)?(
              <tr key="8">
                <td>
                  <Label>Emergency cancellation</Label>
                </td>
                <td>
                  <span className="font-weight-medium" style={{color: 'red'}}>
                    {props.details.emergencyCancellation}
                  </span>
                </td>
              </tr>
              ):null}

              <tr key="9">
                <td colSpan="2">
                  <NavLink to={"/app/packages/edit/"+props.details._id}>
                  <Button color="primary" block style={{marginRight: '5px'}}>EDIT</Button>
                  </NavLink>
                </td>
              </tr>
    
            </tbody>
          </table>
        </CardBody>
      </Card>
    )
  }
}

export default DetailsComponent;