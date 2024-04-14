//import React, { useState, useEffect } from 'react'
import React from 'react'
import { NavLink } from "react-router-dom"
import { Row, Button, Card, CardBody } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";

//const StormSalesChart = ({ title="Report", endDate, handleChangeDate }) => {}
//export default StormSalesChart;

export default function ActionsCard({customerId, handleDelete}) {

    return (
        <Card className="mb-4">
            <Row>
                <Colxx xl="12" sm="12">
                    <CardBody>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <NavLink to="/app/schedule/list">
                                <i className="large-icon initial-height simple-icon-fire"></i>
                            </NavLink>
                            <div className="pl-3 pt-2 pr-2 pb-2">
                                    <p className="list-item-heading mb-1">Actions</p>
                            </div>
                        </div>

                        <div className="text-center">
                            <NavLink to={`/app/invoices2/add/${customerId}`}>
                                <Button color="primary" size="block" className="mb-2">
                                    <span className="iconsminds-dollar-sign-2" style={{ position: 'relative', top: '0px', fontSize: '15px', marginRight: '15px'}} />
                                    ADD INVOICE
                                </Button>
                            </NavLink>
                            <NavLink to={'/app/referrals/add/' + customerId}>
                                <Button color="primary" size="block" className="mb-2">
                                    <span className="simple-icon-like" style={{ position: 'relative', top: '2px', fontSize: '15px', marginRight: '15px' }} />
                                    REGISTER AS REFERRER
                                </Button>
                            </NavLink>
                            <NavLink to={'/app/clients/edit/' + customerId}>
                                <Button color="primary" size="block" className="mb-2">
                                    <span className="iconsminds-file-edit" style={{ position: 'relative', top: '2px', fontSize: '15px', marginRight: '15px' }} />
                                    EDIT PROFILE
                                </Button>
                            </NavLink>
                            <NavLink to="#" onClick={handleDelete}>
                                <Button color="danger" size="block" className="mb-2">
                                    <span className="simple-icon-trash" style={{ position: 'relative', top: '2px', fontSize: '15px', marginRight: '15px' }} />
                                    DELETE PROFILE
                                </Button>
                            </NavLink>
                        </div>
                    </CardBody>
                </Colxx>
            </Row>
        </Card>
    )
}