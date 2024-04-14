import React from 'react'
import { Button, Form, FormGroup } from "reactstrap"
import { Colxx } from "../../../components/common/CustomBootstrap";

export default function SaveButton(props) {
    return (
        <Form>
            <FormGroup row>
                <Colxx sm={12}>
                    <Button color="primary" size="block" onClick={props.saveSettings}>SAVE</Button>
                </Colxx>
            </FormGroup>
        </Form>
    )
}