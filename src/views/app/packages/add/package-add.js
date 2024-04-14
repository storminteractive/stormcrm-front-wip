import React, { useEffect, useState } from "react";
import { Card, CardBody, Input, Row, Button, Form, FormGroup } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Creatable } from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import swal from "sweetalert";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { insert, setInsertField, setCustomer, setProduct, unsetError, unsetMessage, unsetInserted } from '../../../../redux/packages/actions';
import CustomersAsync from '../../../../containers/CustomersAsync';
import service from '../service';

function PackageAddPage(props) {

  const [insertItem, setInsertItem] = useState({
    customerId: "",
    customerName: "",
    productId: "",
    remainingUsage: "",
    expiry: "",
    note: "",
    code: ""
  });

  const [insertedId, setInsertedId] = useState(null);

  /* eslint react-hooks/exhaustive-deps: 0 */  
  useEffect(() => {
    // console.log("Props.match has changed: ", props.match)
    let customerId = props.match.params.customerid;
    if (customerId) {
      console.log("Will use customerId: ", customerId)
      setInsertItem({ ...insertItem, customerId });
    }
  }, [props.match]);
  
  /* eslint react-hooks/exhaustive-deps: 0 */  
  useEffect(() => {
    if (insertedId) {
      let redirUrl = "/app/packages/details/" + insertedId;
      swal("Success!", "Package added successfully", "success");
      setInsertedId(null);
      props.history.push(redirUrl);
    }
  }, [insertedId]);

  const handleCustomerChange = (customerDetails) => {
    setInsertItem({...insertItem, customerId: customerDetails.value, customerName: customerDetails.label})
  }

  const handleSave = async () => {
    const [error, data ] = service.insertItem(insertItem);
    console.log("handleSave= -> error, data:", error, data); 
  }


  return (
    <>
      {/* {props.loading && <div className="loading" />} */}
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="survey.add-new" match={props.match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="3"></Colxx>
        <Colxx xxs="6">
          <Card>
            <CardBody>
              <div className="mb-5">
                <div className="d-flex flex-row align-items-center mb-3">
                  <i className="large-icon initial-height iconsminds-dollar"></i>
                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <div className="list-item-heading mb-1">
                      <h2>Package</h2>
                    </div>
                  </div>
                </div>
              </div>

              <Form>
                <FormGroup row>
                  <Colxx sm={12}>
                    <FormGroup>
                      <CustomersAsync customerId={insertItem.customerId} customerChange={handleCustomerChange} />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Creatable options={props.selectProductOptions} onChange={props.setProduct} value={props.selectedProduct} name="productSelect" placeholder="Select a product"/>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Input type="text" name="remainingUsage" id="remainingUsage" placeholder="Number of sessions" value={props.insertField.remainingUsage} onChange={(e) => props.setInsertField('remainingUsage', e.target.value)}/>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <DatePicker selected={props.insertField.expiry?moment(props.insertField.expiry):null} name="expiry" onChange={(value) => props.setInsertField('expiry',moment(value).format("YYYY-MM-DD"))} placeholderText="Choose expiry date"/>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Input type="text" name="note" id="note" placeholder="OPTIONAL note" value={props.insertField.note} onChange={(e) => props.setInsertField('note',e.target.value)} />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Input type="text" name="code" id="code" placeholder="OPTIONAL code" value={props.insertField.code} onChange={(e) => props.setInsertField('code',e.target.value)} />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <Button color="primary" size="block" onClick={() => handleSave()}>SAVE</Button>
                  </Colxx>

                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => ({...state.packagesReducer})
const mapDispatchToProps = { insert, setInsertField, setCustomer, setProduct, unsetMessage, unsetError, unsetInserted }
export default connect(mapStateToProps, mapDispatchToProps)(PackageAddPage);
