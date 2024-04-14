class InvoiceHelper {

    getCurrentProductTotal = (state) => {
        console.log(`### getCurrentProductTotal->state: `,state);

        let currentProduct = state.currentProduct;
        let currentProductCount = currentProduct.count?parseInt(currentProduct.count):0;
        let currentProductPrice = currentProduct.price?parseFloat(currentProduct.price).toFixed(2):0;
        let currentProductSubTotal = parseFloat(currentProductPrice*currentProductCount).toFixed(2); // subtotal - no tax and discount

        /*
        let discountPercent = state.item.discount?parseInt(state.item.discount):0;
        let discountValue = parseFloat((currentProductSubTotal*discountPercent)/100).toFixed(2);
        currentProductSubTotal = parseFloat(parseFloat(currentProductSubTotal)-parseFloat(discountValue)).toFixed(2);
        */

        let currentProductTaxPercent = currentProduct.taxPercent? parseInt(currentProduct.taxPercent):0;
        let currentProductTaxValue = parseFloat(currentProductSubTotal*currentProductTaxPercent/100).toFixed(2);
        return {currentProductSubTotal, currentProductTaxValue};
      }
    
    getProductsTotal = (state) => {
        console.log(`### getProductsTotal->state: `,state);
        
        let productsSubTotal = 0;
        let productsTaxTotal = 0;
        let products = state.item.products;
    
        products.forEach(product => {
          productsSubTotal += parseFloat(parseFloat(product.total)-parseFloat(product.taxValue));
          productsTaxTotal += parseFloat(product.taxValue);
        });
    
        return { productsSubTotal, productsTaxTotal };
    }

    updateTotals = (state) => {
        console.log(`### getProductsTotal->state: `,state);

        // Update the currently edited product total
        let { currentProductSubTotal, currentProductTaxValue } = this.getCurrentProductTotal(state);
        let currentProductTotal = parseFloat(parseFloat(currentProductSubTotal)+parseFloat(currentProductTaxValue)).toFixed(2);
        console.log("### currentProductSubTotal, currentProductTaxValue", currentProductSubTotal, currentProductTaxValue);
    
        // Save the current product totals (in fixed-2 form) in state 
        let currentProductModified = state.currentProduct;
        currentProductModified.taxValue = currentProductTaxValue;
        currentProductModified.total = currentProductTotal;
    
        // Previous products totals
        let { productsSubTotal, productsTaxTotal } = this.getProductsTotal(state);
        console.log("### productsTotal, productsTaxTotal", productsSubTotal, productsTaxTotal);
    
        // Update overall invoice totals
        let invoiceSubTotal = parseFloat(parseFloat(productsSubTotal) + parseFloat(currentProductSubTotal)).toFixed(2); // current product and previous products subtotals
        console.log("### invoiceSubTotal (pre discount and tax)", invoiceSubTotal);

        let discountPercent = state.item.discount?parseInt(state.item.discount):0; 
        let discountValue = parseFloat(parseFloat(invoiceSubTotal*discountPercent/100).toFixed(2));

        let invoiceSubTotalAfterDiscount = parseFloat(parseFloat(invoiceSubTotal) - parseFloat(discountValue));
        console.log("### invoiceSubTotalAfterDiscount: ", invoiceSubTotalAfterDiscount);
        
        let invoiceTaxValueTotal = parseFloat(parseFloat(productsTaxTotal) + parseFloat(currentProductTaxValue)).toFixed(2); // current product and previous products tax values
        let taxDiscountValue = parseFloat(parseFloat(invoiceTaxValueTotal*discountPercent/100).toFixed(2));
        invoiceTaxValueTotal = invoiceTaxValueTotal - taxDiscountValue;
        console.log("### invoiceTaxValueTotal", invoiceTaxValueTotal);
      
        let invoiceTotal = parseFloat(parseFloat(invoiceSubTotalAfterDiscount) + parseFloat(invoiceTaxValueTotal)).toFixed(2);
        
        // Update element that will go to backend
        let itemModified = state.item;
        itemModified.total = parseFloat(invoiceTotal).toFixed(2);
        itemModified.taxTotal = parseFloat(invoiceTaxValueTotal).toFixed(2);
        
        console.log(`//// InvoiceHelper: will return item: `, itemModified);
        return({currentProduct: currentProductModified, item: itemModified});
        
      }
    
}

export default new InvoiceHelper();