import React, { Fragment } from 'react'
import { Label, Input, Form, FormGroup } from "reactstrap"
import { Colxx } from "../../../components/common/CustomBootstrap";

export default function EmailDetails(props) {
    let settings = props.settings?props.settings:{};

    return (
        <Fragment>
            <div className="mb-5" id="email-details">
                <div className="d-flex flex-row align-items-center mb-3">
                    <i className="large-icon initial-height iconsminds-email"></i>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                        <div className="list-item-heading mb-1">
                            <h2>Email details</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Form>
                <FormGroup row>
                    <Colxx sm={12}>
                        <FormGroup>
                            <Label className="form-group has-float-label">
                                <Input type="text" name="smtpServer" id="smtpServer" placeholder="" value={settings.smtpServer ? settings.smtpServer : ""} onChange={props.updateSettings} />
                                <span>SMTP Server</span>
                            </Label>
                            <Label className="form-group has-float-label">
                                <Input type="text" name="smtpPort" id="smtpPort" placeholder="" value={settings.smtpPort ? settings.smtpPort : ""} onChange={props.updateSettings} />
                                <span>SMTP Port</span>
                            </Label>
                            <Label className="form-group has-float-label">
                                <Input type="text" name="smtpUser" id="smtpUser" placeholder="" value={settings.smtpUser ? settings.smtpUser : ""} onChange={props.updateSettings} />
                                <span>SMTP User</span>
                            </Label>
                            <Label className="form-group has-float-label">
                                <Input type="password" name="smtpPass" id="smtpPass" placeholder="" value={settings.smtpPassword ? settings.smtpPassword : ""} onChange={props.updateSettings} />
                                <span>SMTP Password</span>
                            </Label>
                            <Label className="form-group has-float-label">
                                <Input type="text" name="smtpFrom" id="smtpFrom" placeholder="" value={settings.smtpFrom ? settings.smtpFrom : ""} onChange={props.updateSettings} />
                                <span>SMTP From</span>
                            </Label>
                        </FormGroup>
                    </Colxx>
                </FormGroup>
            </Form>
        </Fragment>
    )
}