//import React, { useState, useEffect } from 'react'
import React from 'react'
import { NavLink } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";

export default function BookingsCard({ visits, customerId }) {

  let visitsDisplay = visits.length === 0 ? (<div style={{paddingTop: '50px', color: '#909090'}} className="dashboard-logs mb-2 text-center"> No data </div>) : (
    <div className="dashboard-logs mb-2">
      <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
        <table className="table table-sm table-borderless">
          <tbody>
            {visits.map((value, index) => {
              let visitLink = `/app/visits/edit/${value._id}`;
              return (
                <tr key={index}>
                  <td>
                    <span
                      className={`log-indicator align-middle border-theme-3`}
                    />
                  </td>
                  <td>
                    <span className="font-weight-medium">
                      <NavLink to={visitLink}>
                        {moment(value.created).format("YYYY-MM-DD HH:mm")} ({value.therapistName})
                      </NavLink>
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
        <NavLink to="/app/visits/list">
          <i className="large-icon initial-height simple-icon-login"></i>
        </NavLink>
        <div className="pl-3 pt-2 pr-2 pb-2">
          <p className="list-item-heading mb-1">Visits: {visits.length}</p>
        </div>
      </div>
      {visitsDisplay}
      <NavLink to={`/app/visits/add/${customerId}`}>
        <Button color="primary" block>
          Add new
        </Button>
      </NavLink>
    </CardBody>
    </Card>
  )
}