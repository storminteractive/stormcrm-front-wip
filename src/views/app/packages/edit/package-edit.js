import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Input, Row, Button, Form, FormGroup } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import swal from "sweetalert";
import service from '../service';

function PackageEditPage(props) {

  const itemId = props.match.params.id;

  const [item, setItem] = useState({
    id: itemId,
    note: "",
    code: ""
  });

  const [loading,setLoading] = useState(true);

  /* eslint react-hooks/exhaustive-deps: 0 */  
  useEffect(()=>{
    if (!itemId) {
      swal("Error!", "No ID", "error");
      return;
    }
    loadItem(itemId)
  },[]);

  const handleSave = async () => {
    console.log("I will send the following item for save: ", item);
    let r = await service.updateItem(itemId, item)
    console.log("handleSave -> r:", r);
    if (r.error){
      swal("Errror!",r.error,"error");
      return;
    }
    swal("Success!", "Item saved successfully", "success");
    props.history.push( "/app/packages/details/" + itemId)
  }

  const loadItem = async (id) => {
    let r = await service.getItem(id);
    if (r.error){
      swal("Errror!",r.error,"error");
      return;
    }
    delete(r.data._id);
    delete(r.data.__v);
    delete(r.data.created);
    setItem(r.data);
    setLoading(false);
  }

  return (
    <Fragment>
      {loading && <div className="loading" />}
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="survey.edit" match={props.match} />
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
                      <Input type="text" name="note" id="note" placeholder="OPTIONAL note" value={item.note?item.note:''} onChange={(e) => setItem({...item, note: e.target.value})} />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Input type="text" name="code" id="code" placeholder="OPTIONAL code" value={item.code?item.code:''} onChange={(e) => setItem({...item, code: e.target.value})} />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <Button color="primary" size="block" disabled={loading} onClick={handleSave}>SAVE</Button>
                  </Colxx>

                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </Fragment>
  );
}

export default PackageEditPage;