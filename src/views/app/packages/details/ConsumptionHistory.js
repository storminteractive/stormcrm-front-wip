import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import PerfectScrollbar from "react-perfect-scrollbar";

const ConsumptionHistory = props => {
    
    if (!props.details) {
        return (<div className="error">Loading...</div>)
    } else {    
        let consumptionDates = props.details.consumptionDates ? props.details.consumptionDates : [];
        return (
        <Card className="mb-4" style={{ minHeight: '320px' }}>
            <CardBody>
                <div className="d-flex flex-row align-items-center mb-3">
                    <NavLink to="/app/customers/list">
                        <i className="large-icon initial-height simple-icon-notebook"></i>
                    </NavLink>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                        <p className="list-item-heading mb-1"><b>Consumption History</b></p>
                    </div>
                </div>

                <div className="dashboard-logs mb-2">
                    <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }} style={{ height: 200 }}>
                        <table className="table table-sm table-borderless">
                            <tbody>
                                {consumptionDates.map((item, index) => {
                                    return <tr key={index}>
                                        <td> <span className={`log-indicator align-middle border-theme-1`} /></td>
                                        <td> <span className="font-weight-medium"> {item} </span> </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </PerfectScrollbar>
                </div>
            </CardBody>
        </Card>
    )
    }
}

export default ConsumptionHistory