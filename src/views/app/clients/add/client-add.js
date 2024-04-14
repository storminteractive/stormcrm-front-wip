import React, { Component, Fragment } from "react";
import { Card, CardBody, Label, Input, Row, Form, FormGroup, Button, CustomInput } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import moment from "moment";
import appConstant from '../../../../constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import swal from 'sweetalert';
import socketIO from 'socket.io-client';
import {Alert} from "reactstrap";
import ah from '../../../../helpers/Axhelper';

// import { NavLink } from "react-router-dom";

const socket = socketIO.connect();

socket.on('connect', () => {
  console.log(`Connected to socket.io server`);
  socket.emit('role', 'client-page');
});

socket.on('disconnect', () => {
  console.log(`Disconnected from socket.io server`);
});


export default class ClientAddPage extends Component {

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

  yearoptions = [];
  monthoptions = [];
  dayoptions = [];

  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      initial: false,
      visible: false,
      specgender: {label: "Any", value: "any"},
      sex: null,
      source: null,
      ID: '',
      name: '',
      tel: '',
      email: '',
      address: '',
      referrer: '',
      emergency: '',
      dob: '',
      dobMoment: null,
      year: '',
      month: '',
      day: '',
      newsletter: true,
      customerSources: null,
    };
    const yearnow = parseInt(moment().format("YYYY"));

    for(let i=yearnow; i>=(yearnow-100); i--){
      this.yearoptions.push({
        label: i,
        value: i
      });
    }

    for(let i=12; i>=1; i--){
      this.monthoptions.push({
        label: i.toString().padStart(2,'0'),
        value: i.toString().padStart(2,'0')
      });
    }

    for(let i=31; i>=1; i--){
      this.dayoptions.push({
        label: i.toString().padStart(2,'0'),
        value: i.toString().padStart(2,'0')
      });
    }
  }

  componentDidUpdate() {
  }

  displayAlert(e,message){
    let title = "Success!";
    let icon = "success";
    if(e) {title = "Error!"; icon = "error";}
    swal({title: title, text: message, icon: icon});
  }

  componentDidMount() {
    socket.on('lead',(data) => {
      console.log("socket.on -> data", data);
      swal("Received update", `Received update for customer: ${data.item.customerName}`, "success");
      this.setFieldValue("name", data.item.customerName);
      this.setFieldValue("tel", data.item.customerTel);
      this.setFieldValue("email", data.item.customerEmail);
      this.setFieldValue("source", data.item.source);
      this.setFieldValue("leadId", data.id);
      this.setState({source: {value: data.item.source, label: data.item.source}});
    }); 
  }

  createDob = async () => {
    /*
    if ((this.state.year==='') || (this.state.month==='') || (this.state.day==='')){
      console.log(`TCL: ClientAddPage -> createDob -> Unselected date field`);
      return false;
    } 
    const newDateS = `${this.state.year.value}-${this.state.month.value}-${this.state.day.value}`;
    console.log(`TCL: ClientAddPage -> createDob -> newDate`, newDateS);
    let newDate = moment(newDateS,'YYYY-MM-DD');
    console.log(`TCL: ClientAddPage -> createDob -> newDate`, newDate);
    */
    let newDate = moment(this.state.dobMoment,'YYYY-MM-DD');
    if(!newDate.isValid()) return false;
    this.setState({dob: newDate});
    return true;
  }

  save = async () => {
    if (! await this.createDob()){
      await this.setState({
        errorMessage: 'Invalid date of birth',
        isSaved: false,
        initial: true,
        visible: true
      })
      console.log("Invalid date");
      return; 
    }
    //console.log("All good with date of birth");

    const data = {
      name: this.state.name,
      tel: this.state.tel,
      email: this.state.email,
      address: this.state.address,
      emergency: this.state.emergency,
      referrer: this.state.referrer,
      dob: this.state.dob.format("YYYY-MM-DD"),
      sex: this.state.sex.value,
      source: this.state.source.value,
      newsletter: this.state.newsletter,
      specgender: this.state.specgender.value, 
      leadId: this.state.leadId
    }

    console.log("ClientAddPage -> save -> data", data);

    ah.sendPost(appConstant.customer,data,async (e,res)=>{
      console.log("Client-add -> addItem -> res", res);
      if(e){ this.displayAlert(true, e); return; }
      this.displayAlert(null, "Item successfully saved!");

      this.setState({
        isSaved: true,
        initial: true,
        visible: true,
        ID: res._id
      });
    });

  }

  setFieldValue = (f,v) =>{
    let s = this.state;
    s[f] = v;
    this.setState(s);
  }

  onDismiss =()=> {
    this.setState({ visible: false });
  }

  alertMessage = () => {
    if (this.state.isSaved) {
      return <Alert
        color="success"
        className="rounded"
        isOpen={this.state.visible}
        toggle={this.onDismiss}
        style={{marginTop: 15}}
      >
        {appConstant.success}
    </Alert>
    } else {
      return <Alert
        color="danger"
        className="rounded"
        isOpen={this.state.visible}
        toggle={this.onDismiss}
        style={{marginTop: 15}}
      >
        {this.state.errorMessage}
    </Alert>
    }
  }

  handleNewsletter = event => this.setState({ newsletter: event.target.checked })

  render() {

     if(this.state.isSaved) {
       if(this.props.external) return (
        <div
        className="d-flex flex-column"
      >
        <div className="d-flex flex-row justify-content-between pt-2 pb-2">
          <div className="d-flex" style={{ alignSelf: "center" }}>
            <img
              src="/assets/img/logo.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className="border-bottom pt-4 mb-5" />
        <div><h1>Thank you.</h1></div>
      </div>
         )
       else return <Redirect to={`/app/clients/details/`+this.state.ID} />;  
    }

    const hide = {
      display: 'none'
    }

    const show = {
      display: 'block'
    }

    return (
      <Fragment>
        <div style={{ display: this.props.external ? "none" : "block" }}>
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="clients.add-new" match={this.props.match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
        </div>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>

                <div
                  className="d-flex flex-column"
                  style={{ display: this.props.external ? "none" : "block" }}
                >
                  <div className="d-flex flex-row justify-content-between pt-2 pb-2">
                    <div className="d-flex" style={{ alignSelf: "center" }}>
                      {/* <img
                        src="/assets/img/logo.png"
                        alt="Logo"
                      /> */}
                    </div>
                  </div>
                  <div className="border-bottom pt-4 mb-5" />
                </div>

                <div className="mb-5" style={{ display: this.props.external ? "none" : "block" }}>
                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="large-icon initial-height iconsminds-male-female"></i>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                      <p className="list-item-heading mb-1">Contact details</p>
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
                          placeholder="Full name (eg. John Doe)"
                          value={this.state.name}
                          onChange={e =>
                            this.setFieldValue("name", e.target.value)
                          }
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
                          placeholder="Telephone number (eg. 0526778899)"
                          value={this.state.tel}
                          onChange={e =>
                            this.setFieldValue("tel", e.target.value)
                          }
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
                        <Label for="source">How did you hear about us?</Label>
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
                          selected={this.state.dobMoment}
                          name="date"
                          onChange={(date) => { this.setState({dobMoment: date}) }}
                          placeholderText="Date of birth"
                          withPortal
                          showYearDropdown
                        />

                        {/*
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-year"
                          value={this.state.year}
                          onChange={e => this.setFieldValue("year", e)}
                          options={this.yearoptions}
                          placeholder="Year"
                        />

                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-month"
                          value={this.state.month}
                          onChange={e => this.setFieldValue("month", e)}
                          options={this.monthoptions}
                          placeholder="Month"
                        />

                        <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-day"
                        value={this.state.day}
                        onChange={e => this.setFieldValue("day", e)}
                        options={this.dayoptions}
                        placeholder="Day"
                        />
                        */}

                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email (eg. name@email.com or name1@email.com;name2@email.com)"
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
                          placeholder="Address (eg. Apt 1311 123 Main St Doha)"
                          value={this.state.address}
                          onChange={e =>
                            this.setFieldValue("address", e.target.value)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="referrer">Referral code (optional)</Label>
                        <Input
                          type="text"
                          name="referrer"
                          id="referrer"
                          placeholder="Referral code (eg. KA1JUX)"
                          value={this.state.referrer}
                          onChange={e =>
                            this.setFieldValue("referrer", e.target.value)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                          <CustomInput
                            type="checkbox"
                            id="newsletter"
                            checked={this.state.newsletter}
                            onChange={(e)=>this.handleNewsletter(e)}
                            label="I am happy to receive occasional newsletter with discounts and recommendations"
                          />
                      </FormGroup>
                    </Colxx>

                  </FormGroup>
                </Form>
                <Button color="primary" onClick={() => this.save()}>
                  Save
                </Button>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx
            xxs="12"
            className="mb-4"
            style={this.state.initial ? show : hide}
          >
            {this.alertMessage()}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
