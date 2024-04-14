import React, { Component, Fragment } from "react";
import { Card, CardBody, Label, Input, Row, Form, FormGroup, Button } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import appConstant from '../../../../constants';
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import { NavLink } from "react-router-dom";
import { Alert } from "reactstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.bubble.css';

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image"],
    ["clean"]
  ]
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image"
];

export default class ClientEditPage extends Component {

  customerSources = [
    {value:'fb', label: 'Facebook AD'},
    {value:'instagram', label: 'Instagram AD'},
    {value:'snapchat', label: 'Snapchat AD'},
    {value:'internetad', label: 'Ad on Google'},
    {value:'googlesearch', label: 'Google search (not ad)'},
    {value:'friend', label: 'I got referred by a friend'},
    {value:'classpass', label: 'Classpass'},
    {value:'walkin', label: 'I saw the shop driving/walking by'}
    //{value:'other', label: 'Other'} // TODO: add text field after
  ];

  sexoptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" }
  ];

  specgenderoptions = [
    { value: "any", label: "Any" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" }
  ];


  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      isUpdated: false,
      errorMessage: '',
      initial: false,
      visible: false,
      
      name: '',
      tel: '',
      address: '',
      dob: new moment(),
      email:'',
      emergency: '',
      referrer: '',
      sex: '',
      source: '',
      specgender: '',
      internalNotes: ''

    }
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = async () => {
    let url = appConstant.customerDetails + this.state.id;
    
    await axios.get(url,{ withCredentials: true }).then(
      (resp) => {
        let newState = resp.data;
        newState.dob = new moment(resp.data.dob);
        newState.source = this.customerSources.filter(v => v.value===resp.data.source)[0] || {label: null, value: null};
        newState.sex = this.sexoptions.filter(v => v.value===resp.data.sex)[0];
        newState.specgender = this.specgenderoptions.filter(v => v.value===resp.data.specgender)[0];
        this.setState(newState);
      }
    );
  }

  setQuestionAnswer = (question,answer) => {
    let s = this.state;
    s[question] = answer;
    this.setState(s);
  }

  setFieldValue = (f,v) =>{
    let s = this.state;
    s[f] = v;
    this.setState(s);
  }

  updateData = async () => {
    const url = appConstant.customer + this.state.id;
    console.log(`TCL: ClientEditPage -> updateData -> url`, url);
    
    const data = {
      name: this.state.name,
      tel: this.state.tel,
      email: this.state.email,
      address: this.state.address,
      dob: moment(this.state.dob).format('YYYY-MM-DD'),
      emergency: this.state.emergency,
      referrer: this.state.referrer,
      sex: this.state.sex.value,
      source: this.state.source.value,
      internalNotes: this.state.internalNotes,
      specgender: this.state.specgender.value
    }
    console.log(data);

    axios.put(url, data,{ withCredentials: true }).then(
      (resp) => {
        this.setState({
          isUpdated: true,
          initial: true,
          visible: true
        });
      },
      (error) => {
        this.setState({
          errorMessage: error.response.data.error,
          isUpdated: false,
          initial: true,
          visible: true
        })
      }
    );
  }

  onDismiss =()=> {
    this.setState({ visible: false });
  }

  alertMessage = () => {
    if (this.state.isUpdated) {
      return <Alert
        color="success"
        className="rounded"
        isOpen={this.state.visible}
        toggle={this.onDismiss}
      >
        {appConstant.success}
    </Alert>
    } else {
      return <Alert
        color="danger"
        className="rounded"
        isOpen={this.state.visible}
        toggle={this.onDismiss}
      >
        {this.state.errorMessage}
    </Alert>
    }
  }

  render() {
     if(this.state.isUpdated) {
       return <Redirect to={`/app/clients/details/${this.state.id}`} />;
     }

    const hide = {
      display: 'none'
    }

    const show = {
      display: 'block'
    }

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="clients.edit" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="mb-5">
                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="large-icon initial-height iconsminds-male-female"></i>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                      <div className="list-item-heading mb-1">
                        <h2>Contact details</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <Form>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="fullname">Full Name</Label>
                        <Input
                          type="text"
                          name="fullname"
                          id="fullname"
                          placeholder="Full name"
                          value={this.state.name || ""}
                          onChange={(e)=>this.setFieldValue('name',e.target.value)}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="tel">Mobile number</Label>
                        <Input
                          type="text"
                          name="tel"
                          id="tel"
                          placeholder="Telephone number"
                          value={this.state.tel || ""}
                          onChange={(e)=>this.setFieldValue('tel',e.target.value)}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="sex">Gender</Label>
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          value={this.state.sex}
                          onChange={e => this.setFieldValue("sex", e)}
                          options={this.sexoptions}
                          placeholder="Select your gender"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="source">How did hear about us?</Label>
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          name="source"
                          value={this.state.source}
                          onChange={e => this.setFieldValue("source", e)}
                          options={this.customerSources}
                          placeholder="Select an option"
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="dob">Date of birth</Label>

                        <DatePicker
                          name="dob"
                          selected={this.state.dob}
                          onChange={e => this.setFieldValue("dob", e)}
                          placeholderText="Your date of birth mm/dd/YYYY"
                          maxDate={moment()}
                          withPortal
                          showYearDropdown
                        />

                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={e =>
                            this.setFieldValue("email", e.target.value)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="address">Address</Label>
                        <Input
                          type="address"
                          name="address"
                          id="address"
                          placeholder="Address"
                          value={this.state.address}
                          onChange={e =>
                            this.setFieldValue("address", e.target.value)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="referrer">Referrer (optional)</Label>
                        <Input
                          type="text"
                          name="referrer"
                          id="referrer"
                          placeholder="Who refferred you?"
                          value={this.state.referrer}
                          onChange={e =>
                            this.setFieldValue("referrer", e.target.value)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="mb-5">
                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="large-icon initial-height iconsminds-male-female"></i>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                      <div className="list-item-heading mb-1">
                        <h2>Internal notes</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <Form>
                  <FormGroup row>
                    <Colxx sm={12}>
                      <FormGroup>

                        <ReactQuill
                        theme="snow"
                        value={this.state.internalNotes}
                        onChange={(note) => this.setState({internalNotes: note})}
                        modules={quillModules}
                        formats={quillFormats}
                        />

                      </FormGroup>
                    </Colxx>
                  </FormGroup>
                </Form>
                <Button color="primary" onClick={()=>this.updateData()}>Save</Button>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" className="mb-4" style={this.state.initial ? show : hide}>
            {this.alertMessage()}
        </Colxx>
        </Row>

      </Fragment>
    );
  }
}
