import React, { Component } from "react";
import { Async } from "react-select";
import appConstant from '../constants';
import ah from '../helpers/Axhelper';
import swal from 'sweetalert';

// prop customerId should be just an ID
// prop customerChange should be a function accepting customerDeatils object as parameter
// for example: <CustomersAsync customerId={this.state.selectedCustomer.value} customerChange={handleCustomerChange}/>
// customerChange return {label: 'Jack Osullivan', value: '0aab028a9b8g8a', details: {address: '...'}}
// const handleCustomerChange = (customerDetails) => {setInsertItem({...insertItem,customerId: customerDetails.value, customerName: customerDetails.label})}

export default class CustomersAsync extends Component {

    initUrl = appConstant.baseUrl + "customers/all/";
    searchUrl = appConstant.baseUrl + "customers/search/";
    detailsUrl = appConstant.baseUrl + "customers/details/";

    displayAlert(e,message){
        let title = "Success!";
        let icon = "success";
        if(e) {title = "Error!"; icon = "error";}
        swal({title: title, text: message, icon: icon});
      }

    constructor(props) {
        super(props);
        this.state = {
            selectedCustomer: '',
            defaultOptions: []
        }
        this.loadDefaultOptions();
    }

    componentDidMount = () => {
        let customerId = this.props.customerId;
        // console.log(`CustomersAsync -> componentDidMount -> customerId`, customerId);
        if (customerId) {
            this.loadCustomerById(customerId);
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.customerId !== this.props.customerId){
            let customerId = this.props.customerId;
            // console.log(`CustomersAsync -> componentDidMount -> new customerId ${customerId} old customerId: ${prevProps.customerId}`);
            if (customerId) this.loadCustomerById(customerId);    
        }
    }

    loadDefaultOptions = () => {
        const url = this.initUrl;
        ah.sendGet(url, (e, res) => {
            // console.log(`TCL: CustomersAsync -> loadDefaultOptions -> url,e,res`, url, e, res);
            let options = [];
            res.map((customer) => {
                options.push({ label: customer.name, value: customer._id, details: customer });
                return customer;
            })
            this.setState({ defaultOptions: options });
        });
    }

    loadCustomerById = (id) => {
        let url = this.detailsUrl+id;
        ah.sendGet(url, (e, res) => {
            // console.log(`TCL: CustomersAsync -> loadCustomerById -> url,e,res`, url, e, res);
            if (e) { this.displayAlert(true, e); return; }
            let selectedCustomerObject = { label: res.name, value: res._id, details: res };
            // console.log("CustomersAsync -> ah.sendGet -> selectedCustomerObject", selectedCustomerObject);
            this.setState({ selectedCustomer: selectedCustomerObject});
            this.handleCustomerChange(selectedCustomerObject);
        });
    }

    searchCustomers = (search, cb) => {
        const url = this.searchUrl + search;
        if (search.length < 3) { cb([]); return; }

        ah.sendGet(url, (e, res) => {
            // console.log(`TCL: CustomersAsync -> searchCustomers -> url,e,res`, url, e, res);
            let options = [];
            res.map((customer) => {
                options.push({ label: customer.name, value: customer._id, details: customer });
                return customer;
            })
            cb(options);
        });
    }

    handleCustomerChange = (selectedCustomer) => {
        // console.log(`TCL: CustomersAsync -> handleCustomerChange -> selectedCustomer`, selectedCustomer);
        this.setState({ selectedCustomer });
        this.props.customerChange(selectedCustomer);
    }

    render() {
        return (
            <Async
                cacheOptions
                loadOptions={this.searchCustomers}
                defaultOptions={this.state.defaultOptions}
                value={this.state.selectedCustomer}
                onChange={this.handleCustomerChange}
                placeholder="Select customer"
            //onInputChange={this.handleCustomerInputChange}
            />
        )
    }
}