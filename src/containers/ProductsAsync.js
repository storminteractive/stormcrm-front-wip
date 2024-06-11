import React, { Component } from "react";
import { Async } from "react-select";
import appConstant from '../constants';
import ah from '../helpers/Axhelper';
import swal from 'sweetalert';

/* 
    <ProductsAsync 
        onChange={handleProductChange}
        selectedId={this.state.selectedItem.value} 
    />
    
    <ProductsAsync
        onChange={(p) => setProductToConsume(p)}
        selectedId={productToConsume.value}
    />

*/
// onChange return {label: 'Jack Osullivan', value: '0aab028a9b8g8a', details: {address: '...'}}
// const handleProductChange = (productDetails) => {setInsertItem({...insertItem,selectedId: productDetails.value, customerName: productDetails.label})}
export default class ProductsAsync extends Component {

    initUrl = appConstant.baseUrl + "products/all/";
    searchUrl = appConstant.baseUrl + "products/search/";
    detailsUrl = appConstant.baseUrl + "products/details/";

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: '',
            defaultOptions: []
        }
        this.loadDefaultOptions();
    }

    componentDidMount = () => {
        let selectedId = this.props.selectedId;
        // console.log(`ProductsAsync -> componentDidMount -> selectedId`, selectedId);
        if (selectedId) {
            this.loadItemById(selectedId);
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.selectedId !== this.props.selectedId){
            let selectedId = this.props.selectedId;
            // console.log(`ProductsAsync -> componentDidMount -> new selectedId ${selectedId} old selectedId: ${prevProps.selectedId}`);
            if (selectedId) this.loadItemById(selectedId);    
        }
    }

    loadDefaultOptions = () => {
        const url = this.initUrl;
        ah.sendGet(url, (e, res) => {
            // console.log(`TCL: ProductsAsync -> loadDefaultOptions -> url,e,res`, url, e, res);
            let options = [];
            res.map((customer) => {
                options.push({ label: customer.name, value: customer._id, details: customer });
                return customer;
            })
            this.setState({ defaultOptions: options });
        });
    }

    loadItemById = (id) => {
        let url = this.detailsUrl+id;
        ah.sendGet(url, (e, res) => {
            // console.log(`TCL: ProductsAsync -> loadItemById -> url,e,res`, url, e, res);
            if (e) { swal({title: 'Error', text: e}); return; }
            let selectedItemObject = { label: res.name, value: res._id, details: res };
            // console.log("ProductsAsync -> ah.sendGet -> selectedItemObject", selectedItemObject);
            this.setState({ selectedItem: selectedItemObject});
            this.handleItemChange(selectedItemObject);
        });
    }

    searchItems = (search, cb) => {
        const url = this.searchUrl + search;
        if (search.length < 3) { cb([]); return; }

        ah.sendGet(url, (e, res) => {
            // console.log(`TCL: ProductsAsync -> searchItems -> url,e,res`, url, e, res);
            let options = [];
            res.map((item) => {
                options.push({ label: item.name, value: item._id, details: item });
                return item;
            })
            cb(options);
        });
    }

    handleItemChange = (selectedItem) => {
        // console.log(`TCL: ProductsAsync -> handleItemChange -> selectedItem`, selectedItem);
        this.setState({ selectedItem });
        this.props.onChange(selectedItem);
    }

    render() {
        return (
            <Async
                cacheOptions
                loadOptions={this.searchItems}
                defaultOptions={this.state.defaultOptions}
                value={this.state.selectedItem}
                onChange={this.handleItemChange}
                placeholder="Select product"
                //onInputChange={this.handleCustomerInputChange}
            />
        )
    }
}