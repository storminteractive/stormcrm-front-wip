import React, { useEffect, useState } from "react";
import { Card, CardBody, Input, Row, Button, Form, FormGroup } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import DatePicker from "react-datepicker";
import moment from "moment";
import swal from "sweetalert";
import "react-datepicker/dist/react-datepicker.css";
import CustomersAsync from '../../../../containers/CustomersAsync';
import ProductsAsync from '../../../../containers/ProductsAsync';
import service from '../service';

function PackageAddPage(props) {

  const [insertItem, setInsertItem] = useState({
    customerId: "",
    customerName: "",
    productName: "",
    remainingUsage: "",
    expiry: "",
    note: "",
    code: ""
  });

  const [insertedId, setInsertedId] = useState(null);

  /* eslint react-hooks/exhaustive-deps: 0 */  
  useEffect(() => {
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
      setInsertedId(null);
      swal("Success!", "Package added successfully", "success");
      props.history.push(redirUrl);
    }
  }, [insertedId]);

  const handleCustomerChange = (customerDetails) => {
    setInsertItem({
      ...insertItem, 
      customerId: customerDetails.value, 
      customerName: customerDetails.label
    })
  }

  const handleProductChange = (productDetails) => {
    setInsertItem({
      ...insertItem,
      productName: productDetails.label
    });
  }

  const handleSave = async () => {
    let r = await service.insertItem(insertItem);
    if (r.error) {
      swal("Error!", r.error, "error");
      return;
    }
    swal("Success", "Item added successsfully","success")
    setInsertedId(r.data._id);
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
                      <ProductsAsync selectedId={insertItem.productId} onChange={handleProductChange} />
                      {/* <Creatable options={selectProductOptions} onChange={handleProductChange} value={insertItem.productId} name="productSelect" placeholder="Select a product"/> */}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Input type="text" name="remainingUsage" id="remainingUsage" placeholder="Number of sessions" value={insertItem.remainingUsage} onChange={(e) => setInsertItem({...insertItem, remainingUsage: e.target.value})}/>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <DatePicker selected={insertItem.expiry?moment(insertItem.expiry):null} name="expiry" onChange={(value) => setInsertItem({...insertItem, expiry: moment(value).format("YYYY-MM-DD")})} placeholderText="Choose expiry date"/>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Input type="text" name="note" id="note" placeholder="OPTIONAL note" value={insertItem.note} onChange={(e) => setInsertItem({...insertItem, note: e.target.value})} />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Input type="text" name="code" id="code" placeholder="OPTIONAL code" value={insertItem.code} onChange={(e) => setInsertItem({...insertItem, code: e.target.value})} />
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

export default PackageAddPage;