import React, { Fragment } from 'react'
import { Label, Input, Form, FormGroup } from "reactstrap"
import { Colxx } from "../../../components/common/CustomBootstrap";
//import Axhelper from "../../helpers/Axhelper"

export default function CompanyDetails(props) {
    let settings = props.settings?props.settings:{};

    return (
        <Fragment>
            <div className="mb-5" id="company-details">
                <div className="d-flex flex-row align-items-center mb-3">
                    <i className="large-icon initial-height iconsminds-shopping-bag"></i>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                        <div className="list-item-heading mb-1">
                            <h2>Company details</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Form>
                <FormGroup row>
                    <Colxx sm={12}>
                    <FormGroup>
                            <Label className="form-group has-float-label">
                                <Input type="text" name="companyName" id="companyName" value={settings.companyName ? settings.companyName : ""} onChange={props.updateSettings} />
                                <span>Company name</span>
                            </Label>
                            <Label className="form-group has-float-label">
                                <Input type="text" name="addressLine1" id="addressLine1" value={settings.addressLine1 ? settings.addressLine1 : ""} onChange={props.updateSettings}  />
                                <span>Address Line 1</span>
                            </Label>
                            <Label className="form-group has-float-label">
                                <Input type="text" name="addressLine2" id="addressLine2" value={settings.addressLine2 ? settings.addressLine2 : ""} onChange={props.updateSettings}  />
                                <span>Address Line 2</span>
                            </Label>
                            <Label className="form-group has-float-label">
                                <Input type="text" name="addressLine3" id="addressLine3" value={settings.addressLine3 ? settings.addressLine3 : ""} onChange={props.updateSettings} />
                                <span>Address Line 3</span>
                            </Label>
                            <Label className="form-group has-float-label">
                                <Input type="text" name="currencySymbol" id="currencySymbol" value={settings.currencySymbol ? settings.currencySymbol : ""} onChange={props.updateSettings} />
                                <span>Currency Symbol</span>
                            </Label>
                        </FormGroup>
                    </Colxx>
                </FormGroup>
            </Form>
        </Fragment>

    )
}