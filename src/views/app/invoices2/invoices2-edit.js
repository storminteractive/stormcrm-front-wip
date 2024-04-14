import React, { Component, Fragment } from "react";
import { Card, CardBody, Input, Row, Button, Form, FormGroup, Label } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import CustomersAsync from '../../../containers/CustomersAsync';
import moment from "moment";
import { Redirect } from 'react-router-dom';
import Invoices2Model from './invoices2-model';
import ProductsCreatable from "./ProductsCreatable";
import InvoiceHelper from "./InvoiceHelper";
import SettingsClass from "../../../helpers/SettingsClass";

export default class Invoices2Edit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item: {
        discount: '',
        customerId: '',
        customerName: '',
        date: moment().format("YYYY-MM-DD"),
        notes: '',
        refCode: '',
        products: [],
        taxTotal: 0,
        total: 0
      },
      id: props.match.params.id,
      date: moment(),
      selectedCustomer: { label: "Loading...", value: "" },
      selectedProduct: { label: "Select product", value: "" },

      productOptions: [],
      allProducts: [],
      
      currentProduct: {
        name: '',
        id: '',
        price: '',
        taxPercent: '',
        taxValue: '',
        count: '',
        total: ''
      },

      saved: false
    };
    this.Invoices2 = new Invoices2Model(async (newState) => {await this.setState(newState); return this.state;});

    SettingsClass.getSettings((e, settings) => {
      // console.log("Settings fetched:", settings);
      let currencySymbol = "";
      if(settings && settings.currencySymbol) currencySymbol = settings.currencySymbol;
      this.setState({settings,currencySymbol});
    });
  }

  componentDidMount = async () => {
    this.Invoices2.loadItem(this.state.id);
    this.Invoices2.loadProducts();
  }

  handleCustomerChange = async (selectedCustomer) => {
    console.log(`Invoices2 -> Add -> handleCustomerChange -> selectedCustomer`, selectedCustomer);
    let newItem = this.state.item;
    newItem['customerName'] = selectedCustomer.label;
    newItem['customerId'] = selectedCustomer.value;
    newItem['refCode'] = selectedCustomer.details.referrer;
    await this.setState({ selectedCustomer,item: newItem });
    this.Invoices2.getCustomerDiscount(selectedCustomer.details,this.state);
  };

  handleDateChange = async (date) => {
    let newItem = this.state.item;
    newItem['date'] = date.format("YYYY-MM-DD");
    await this.setState({date, item: newItem});    
  }

  handleProductChange =  async (selectedProduct, actionMeta) => {
    console.log(`InvoiceModel -> handleProductChange -> selectedProduct, actionMeta`, selectedProduct, actionMeta);
    // If new product will just set name and exit
    let newProduct = this.state.currentProduct;
    newProduct.name = selectedProduct.label;
    newProduct.id = selectedProduct.value;
    newProduct.count = 1;
    if(actionMeta.action === 'create-option'){
      await this.setState({ selectedProduct, currentProduct: newProduct});  
      return;
    }

    // Otherwise we will pull the product details
    let allProducts = this.state.allProducts;
    let product = allProducts.filter(productOption => {
      return productOption.code === selectedProduct.value
    });
    product = product[0];
    console.log("Invoices2Add -> handleProductChange= -> product", product);

    await this.setState({currentProduct: {
      name: product.name,
      price: product.price.$numberDecimal,
      taxPercent: product.taxPercent,
      count: 1
    }});

    let newState = InvoiceHelper.updateTotals(this.state);
    this.setState(newState);
  };

  handleDataFieldChange = async (event) => {
    const { value, name } = event.target;
    let itemModified = this.state.item;
    itemModified[name] = value;
    await this.setState({item: itemModified});
    let newState = InvoiceHelper.updateTotals(this.state);
    this.setState(newState);
  }

  resetCurrentProduct = async () => {
    await this.setState({currentProduct: {
      name: '',
      id: '',
      price: '',
      taxPercent: '',
      count: '',
      total: ''
    }, selectedProduct: {label: 'Select product', value:''}});
    let newState = InvoiceHelper.updateTotals(this.state);
    this.setState(newState);
  }

  handleAddProduct = async () => {
    if(!this.state.currentProduct.name || (!this.state.currentProduct.price) || (!this.state.currentProduct.taxPercent) || (!this.state.currentProduct.count)) return;
    let itemModified = this.state.item;
    let currentProduct = this.state.currentProduct
    currentProduct.price = parseFloat(parseFloat(currentProduct.price).toFixed(2));
    currentProduct.total = parseFloat(parseFloat(currentProduct.total).toFixed(2));
    itemModified.products.push(currentProduct);
    console.log("handleAddProduct -> itemModified", itemModified);
    await this.setState({item: itemModified});
    this.resetCurrentProduct();
  }

  handleCurrentProductDataFieldChange = async (event) => {
    const { value, name } = event.target;
    let currentProductModified = this.state.currentProduct;
    currentProductModified[name] = value;
    await this.setState({currentProduct: currentProductModified});
    let newState = InvoiceHelper.updateTotals(this.state);
    this.setState(newState);
  }

  handleDelete = async (index) => {
    let itemModified = this.state.item;
    let newProducts = this.state.item.products.filter((el,i)=> {return i!==index});
    itemModified.products = newProducts;
    await this.setState({item: itemModified});
    let newState = InvoiceHelper.updateTotals(this.state);
    this.setState(newState);
  }

  save = async () => {
    if(!this.state.item.discount){
      let itemModified = this.state.item;
      itemModified.discount = 0;
      await this.setState({item: itemModified});
    }
    await this.handleAddProduct();
    this.Invoices2.saveItem(this.state.id,this.state.item);
  }

  render() {
    if (this.state.savedId) {
      let redirUrl = `/app/invoices2/details/${this.state.savedId}`;
      return <Redirect to={redirUrl} />;
    }

    let dynamicRows = this.state.item.products.map((el, index) => {
      return <FormGroup row key={index}>
              <Colxx sm={3}><Label> <span onClick={()=>this.handleDelete(index)} style={{color: 'red'}}>X</span> {el.name}</Label></Colxx>
              <Colxx sm={3}><Label>{parseFloat(el.price).toFixed(2)} {this.state.currencySymbol}</Label></Colxx>
              <Colxx sm={3}><Label>{el.taxPercent} %</Label></Colxx>
              <Colxx sm={2}><Label>{el.count}</Label></Colxx>
              <Colxx sm={1}><Label>{parseFloat(el.total).toFixed(2)} {this.state.currencySymbol}</Label></Colxx>
            </FormGroup>
    });

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="survey.edit" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row className="mb-4">

        {/* Header card */}
        <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <div className="mb-5">
                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="large-icon initial-height iconsminds-dollar"></i>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                      <p className="list-item-heading mb-1">Invoice #{this.state.item.number}</p>
                    </div>
                  </div>
                </div>
                <Form>
                  <FormGroup row>
                    <Colxx sm={4}>
                      <FormGroup>
                        <CustomersAsync customerId={this.state.item.customerId._id} customerChange={this.handleCustomerChange} />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <FormGroup>
                        <DatePicker
                          selected={this.state.date}
                          name="date"
                          onChange={this.handleDateChange}
                          placeholderText="Select Date"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <FormGroup>
                      <Input
                          type="number"
                          name="discount"
                          id="discount"
                          min="0"
                          onChange={this.handleDataFieldChange}
                          placeholder="Discount %"
                          value={this.state.item.discount}
                        />
                      </FormGroup>
                    </Colxx>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Colxx>

        {/* Products card */}
        <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <Form>
                
                {dynamicRows}

                <FormGroup row>
                    <Colxx sm={3}>
                      <FormGroup>
                        <ProductsCreatable selectedProduct={this.state.selectedProduct} products={this.state.productOptions} onChange={this.handleProductChange}/>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={3}>
                      <FormGroup>
                      <Input
                          type="number"
                          name="price"
                          id="price"
                          min="0"
                          onChange={this.handleCurrentProductDataFieldChange}
                          placeholder={"Price" + this.state.currencySymbol}
                          value={this.state.currentProduct.price}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={3}>
                      <FormGroup>
                      <Input
                          type="number"
                          name="taxPercent"
                          id="taxPercent"
                          min="0"
                          onChange={this.handleCurrentProductDataFieldChange}
                          placeholder="Tax %"
                          value={this.state.currentProduct.taxPercent}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={2}>
                      <FormGroup>
                      <Input
                          type="number"
                          name="count"
                          id="count"
                          min="0"
                          onChange={this.handleCurrentProductDataFieldChange}
                          placeholder="Count"
                          value={this.state.currentProduct.count}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={1}>
                      <FormGroup>
                        <div  style={{textAlign: 'center', marginTop: '15px'}}>{this.state.currentProduct.total?this.state.currentProduct.total:'0'} {this.state.currencySymbol}</div>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <Button color="success" size="block" onClick={() => this.handleAddProduct()}>+ ADD PRODUCT</Button>
                    </Colxx>
                  </FormGroup>
                </Form>
              
              </CardBody>
            </Card>
          </Colxx>
          
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <Form>
                  <FormGroup row>

                    <Colxx sm={8}>
                      <FormGroup>
                        <Input
                          type="textarea"
                          name="notes"
                          id="notes"
                          placeholder="Invoice notes"
                          value={this.state.item.notes}
                          onChange={(e) => this.handleDataFieldChange(e)}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={4} style={{ marginBottom: '10px'}}>
                      <div style={{textAlign: 'right'}}>Discount: {this.state.item.discount?this.state.item.discount:0} %</div>
                      <div style={{textAlign: 'right', fontWeight: 'bold'}}>Total: {this.state.item.total} {this.state.currencySymbol}</div>
                      <div style={{textAlign: 'right'}}>Tax value: {this.state.item.taxTotal} {this.state.currencySymbol}</div>
                      <div style={{textAlign: 'right'}}>Refereal code: "{this.state.item.refCode}"</div>
                    </Colxx>

                    <Colxx sm={12}>
                      <Button color="primary" size="block" onClick={() => this.save()}>SAVE</Button>
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
