import React, { Component } from "react";
import {  Creatable } from "react-select";

export default class ProductsCreatable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: this.props.selectedProduct,
            options: this.props.products
        }
    }

    componentDidMount = () => { }
    
    componentDidUpdate = (prevProps) => {
        if(prevProps.products!==this.props.products) this.updateOptions(this.props.products);
        if(prevProps.selectedProduct!==this.props.selectedProduct) this.updateSelected(this.props.selectedProduct);
    };

    updateOptions = (options) => {
        console.log("ProductsCreatable -> updateOptions", options);
        this.setState({options})
    }

    updateSelected = (selectedProduct) => {
        console.log("ProductsCreatable -> updateSelected ", selectedProduct);
        this.setState({selectedProduct})
    }

    handleProductChange = (selectedProduct,actionMeta) => {
        //console.log("ProductsCreatable -> handleProductChange -> selectedProduct", selectedProduct);
        this.setState({ selectedProduct });
        this.props.onChange(selectedProduct,actionMeta);
    }

    render() {
        return (
           <Creatable
              options={this.state.options}
              onChange={this.handleProductChange}
              value={this.state.selectedProduct}
              name="productSelect"
              placeholder="Select a product"
            />
        )
    }
}