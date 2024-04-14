//import React, { useState, useEffect } from 'react'
import React from 'react'
import { NavLink } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";

export default function BookingsCard({ invoices, customerId }) {

    let invoicesDisplay = invoices.length === 0 ? (<div style={{paddingTop: '50px', color: '#909090'}} className="dashboard-logs mb-2 text-center"> No data </div>) : (
        <div className="dashboard-logs mb-2">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <table className="table table-sm table-borderless">
              <tbody>
                {invoices.map((value, index) => {
                  let invoiceLink = `/app/invoices2/details/${value._id}`;
                  return (
                    <tr key={index}>
                      <td>
                        <span
                          className={`log-indicator align-middle border-theme-3`}
                        />
                      </td>
                      <td>
                        <span className="font-weight-medium">
                          <NavLink to={invoiceLink}>
                            {moment(value.date).format("DD-MMM-YYYY")}
                          </NavLink>
                        </span>
                      </td>
                      <td className="text-right">
                                <span className="text-muted">
                                    {value.total.$numberDecimal} AED
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
                    <NavLink to="/app/invoices2/list">
                        <i className="large-icon initial-height iconsminds-dollar"></i>
                    </NavLink>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                        <NavLink to="/app/invoices2/list">
                            <p className="list-item-heading mb-1">Invoices: {invoices.length}</p>
                        </NavLink>
                    </div>
                </div>
                {invoicesDisplay}
                <NavLink to={`/app/invoices2/add/${customerId}`}>
                    <Button color="primary" block>
                        Add new
                    </Button>
                </NavLink>
            </CardBody>
        </Card>
    )
}