import React, { Component, Fragment } from "react";
import { Card, CardBody, Input, Row, Button, Form, FormGroup } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import swal from "sweetalert";
import "react-datepicker/dist/react-datepicker.css";

import { connect } from 'react-redux';
import { loadUpdate, update, setInsertField, setCustomer, setProduct, unsetError, unsetMessage, unsetUpdated } from '../../../../redux/packages/actions';

class PackageEditPage extends Component {

  constructor(props) {
    super(props);
    console.log(`Package edit`)
  }

  componentDidMount = async () => {
    let id = this.props.match.params.id;
    console.log(`PackageEditPage -> componentDidMount -> id`, id);
    if (!id) {
      swal("Error", "Item ID is missing", "error");
      this.props.history.push('/app/packages');
    } else {
      this.props.loadUpdate(id);
    }
  }

  componentDidUpdate = () => {
    if (this.props.error) {
      swal("Error!", this.props.error, "error");
      this.props.unsetError();
    }

    if (this.props.updated) {
      let redirUrl = "/app/packages/details/" + this.props.updated;
      console.log("PackageEditPage -> redirUrl", redirUrl);
      swal("Success!", "Package updated successfully", "success");
      this.props.unsetUpdated();
      this.props.history.push(redirUrl);
    }

  }

  render() {
    return (
      <Fragment>
        {this.props.loading && <div className="loading" />}
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="survey.edit" match={this.props.match} />
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
                        <Input type="text" name="note" id="note" placeholder="OPTIONAL note" value={this.props.insertField.note?this.props.insertField.note:''} onChange={(e) => this.props.setInsertField('note',e.target.value)} />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Input type="text" name="code" id="code" placeholder="OPTIONAL code" value={this.props.insertField.code?this.props.insertField.code:''} onChange={(e) => this.props.setInsertField('code',e.target.value)} />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <Button color="primary" size="block" onClick={() => this.props.update(this.props.match.params.id, this.props.insertField)}>SAVE</Button>
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
}

const mapStateToProps = (state) => ({...state.packagesReducer})
const mapDispatchToProps = { loadUpdate, update, setInsertField, setCustomer, setProduct, unsetMessage, unsetError, unsetUpdated }
export default connect(mapStateToProps, mapDispatchToProps)(PackageEditPage);