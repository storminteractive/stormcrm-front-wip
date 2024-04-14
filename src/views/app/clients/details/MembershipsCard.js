//import React, { useState, useEffect } from 'react'
import React from 'react'
import { NavLink } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";

export default function BookingsCard({ memberships, customerId }) {

  let membershipsDisplay = memberships.length === 0 ? (<div style={{paddingTop: '50px', color: '#909090'}} className="dashboard-logs mb-2 text-center"> No data </div>) : (
    <div className="dashboard-logs mb-2">
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <table className="table table-sm table-borderless">
          <tbody>
            {memberships.map((value, index) => {
              let membershipLink = `/app/members/details/${value._id}`;
              return (
                <tr key={index}>
                  <td>
                    <span
                      className={`log-indicator align-middle border-theme-3`}
                    />
                  </td>
                  <td>
                    <span className="font-weight-medium">
                      <NavLink to={membershipLink}>
                        {value.type} (Remaining: {value.remainingUsage}) 
                      </NavLink>
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="text-muted">
                      Expiry: {moment(value.expiryDate).format('YYYY-MM-DD')}  ({moment(value.expiryDate).fromNow()})
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </PerfectScrollbar>
    </div>
  );

    return (
      <Card className="mb-4">
      <CardBody>
        <div className="d-flex flex-row align-items-center mb-3">
          <NavLink to="/app/members/list">
            <i className="large-icon initial-height iconsminds-student-hat"></i>
          </NavLink>
          <div className="pl-3 pt-2 pr-2 pb-2">
            <NavLink to="/app/members/list">
              <p className="list-item-heading mb-1">Memberships: {memberships.length}</p>
            </NavLink>
          </div>
        </div>
        {membershipsDisplay}
        <NavLink to={`/app/members/add/${customerId}`}>
          <Button color="primary" block>
            Add new
          </Button>
        </NavLink>
      </CardBody>
    </Card>
    )
}