// TODO: extract products to container same as customers
// TODO: don't send discount request if no referrer

import swal from 'sweetalert';
import moment from "moment";
import appConstant from '../../../constants';
import ah from '../../../helpers/Axhelper';

export default class Invoices2Model {

  baseurl = appConstant.baseUrl;
  allUrl = this.baseurl + "invoices2/all/";
  statsUrl = this.baseurl + "invoices2/stats/";
  searchUrl = this.baseurl + "invoices2/search/";
  detailsUrl = this.baseurl + "invoices2/details/";
  downloadUrl = this.baseurl + "invoices2/download/";
  emailUrl = this.baseurl + "invoices2/email/";

  discountUrl = this.baseurl + "invoices2/getcustomerdiscount/";

  productsUrl = this.baseurl + "products/all/";

  addUrl = this.baseurl + "invoices2/";
  editUrl = this.baseurl + "invoices2/";
  saveUrl = this.baseurl + "invoices2/";
  deleteUrl = this.baseurl + "invoices2/";
  settingsUrl = this.baseurl + "settings/";


  orderOptions = [
    { column: "created", label: "Created" },
  ];
  selectedOrderOption = { column: "created", label: "Created", order: "desc" };

  initState = {};

  constructor(updateStateCallback) {
    this.updateStateCallback = updateStateCallback;
  }

  ////////////////////////////////////////

  displayAlert(e, message) {
    let title = "Success!";
    let icon = "success";
    if (e) { title = "Error!"; icon = "error"; }
    swal({ title: title, text: message, icon: icon });
  }

  confirmMessage = (message, cbtrue) => {
    swal({
      title: "Confirm",
      text: message,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        cbtrue();
      }
    });
  }

  //////////////////////////////////////

  handleSearchChange = (currentState, searchString) => {
    let newState = currentState;
    newState.searchString = searchString;
    console.log(`handleSearchChange triggered -> searchString`, searchString);
    this.updateCurrentUrl(newState);
  }

  handleOrderChange = async (currentState, column, lbl) => {
    let newState = currentState;
    let newOrder = currentState.selectedOrderOption.order;
    if (column === currentState.selectedOrderOption.column) newOrder = currentState.selectedOrderOption.order === "desc" ? "asc" : "desc"; // invert asc-desc
    console.log(`handleOrderChange triggered -> column, lbl, newOrder`, column, lbl, newOrder);
    newState.selectedOrderOption = { "column": column, "label": lbl, "order": newOrder };
    await this.updateCurrentUrl(newState);
  }

  handleLoadMore = async (currentState) => {
    let newState = currentState;
    let newLimit = currentState.limit + 50;
    console.log(`leads new limit:`, newLimit);
    newState.limit = newLimit;
    await this.updateCurrentUrl(newState);
  }

  updateCurrentUrl = async (currentState) => {
    let newCurrentUrl;
    let newState = currentState;
    if (currentState.searchString.length >= 2) {
      newCurrentUrl = this.searchUrl.concat(encodeURIComponent(currentState.searchString)).concat(`?sortcol=${currentState.selectedOrderOption.column}&sortdir=${currentState.selectedOrderOption.order}&limit=${currentState.limit}`);
    } else {
      newCurrentUrl = this.allUrl.concat(`?sortcol=${currentState.selectedOrderOption.column}&sortdir=${currentState.selectedOrderOption.order}&limit=${currentState.limit}`);
    }
    newState.currentUrl = newCurrentUrl;
    console.log(`Updating new currentUrl to: ${newCurrentUrl}`);
    this.updateStateCallback(newState);
  }

  getInitState = id => {
    if (id) this.initState.id = id;
    return this.initState;
  };

  getItems = (url) => {
    ah.sendGet(url, async (e, res) => {
      console.log(`TCL: Invoices2Model -> getItems -> res`, res);
      if (e) { this.displayAlert(true, e); return; }
      if ((res !== null) && (!Array.isArray(res))) res = new Array(res);
      await this.updateStateCallback({ loading: false, items: res });
    });
  }

  getStats = () => {
    ah.sendGet(this.statsUrl, async (e, res) => {
      console.log(`TCL: Invoices2Model -> getStats -> statsUrl,e,res`, this.statsUrl, e, res);
      if (e) { this.displayAlert(true, e); return; }

      if (!res[0]) {
        await this.updateStateCallback({
          statCustomers: "0",
          statRevenue: "0"
        });
        return;
      } else {
        await this.updateStateCallback({
          statCustomers: (res[0].allCustomers).toString(),
          statRevenue: (res[0].allRevenue).toString()
        });
      }
    });

    ah.sendGet(this.allUrl, async (e, res) => {
      console.log(`TCL: Invoices2Model -> getStats -> allUrl,e,res`, this.allUrl, e, res);
      if (e) { this.displayAlert(true, e); return; }
      if (!res[0]) {
        await this.updateStateCallback({
          statTopRef: "None",
          statTopRefCount: "0",
        });
      } else {
        await this.updateStateCallback({
          statTopRef: res[0].name,
          statTopRefCount: (res[0].totalCustomers).toString()
        });
      }
    });
  }

  loadDetails = (id) => {
    let url = this.detailsUrl + id;
    ah.sendGet(url, async (e, res) => {
      console.log(`TCL: Invoices2Model -> loadDetails -> url, id, res`, url, id, res);
      if (e) { this.displayAlert(true, e); return; }
      await this.updateStateCallback({ loading: false, ...res });
    });
  }

  loadItem = (id) => {
    let url = this.detailsUrl + id;
    ah.sendGet(url, async (e, res) => {
      console.log(`TCL: Invoices2Model -> loadItem -> url, id, res`, url, id, res);
      if (e) { this.displayAlert(true, e); return; }

      res.taxTotal = res.taxTotal.$numberDecimal;
      res.total = res.total.$numberDecimal;
      res.date = moment(res.date).format('YYYY-MM-DD');
      delete (res.__v);
      delete (res._id);
      delete (res.created);
      delete (res.customerAddress);
      delete (res.customerTel);

      res.products.map((el) => {
        el.price = el.price.$numberDecimal;
        el.taxValue = el.taxValue.$numberDecimal;
        el.total = el.total.$numberDecimal;
        return el;
      })

      await this.updateStateCallback({
        loading: false,
        selectedCustomer: {
          label: res.name,
          value: res.customerId._id
        },
        date: moment(res.date),
        item: res
      });

    });
  }

  loadCustomerById = (id, cb) => {
    const url = appConstant.baseUrl + "customers/details/" + id;
    ah.sendGet(url, (e, res) => {
      console.log(`TCL: Invoices2Model -> loadCustomerById -> url,e,res`, url, e, res);
      if (e) { this.displayAlert(true, e); return; }
      //cb(e,{'label': res.name, 'value':res._id});
      cb(e, res);
    });
  }

  loadAsyncCustomers = (search, cb) => {
    const url = appConstant.baseUrl + "customers/search/" + search;
    if (search.length < 3) cb([]);

    ah.sendGet(url, (e, res) => {
      console.log(`TCL: Invoices2Model -> loadAsyncCustomers -> url,e,res`, url, e, res);
      if (e) { this.displayAlert(true, e); return; }
      let options = [];
      res.map((customer) => {
        options.push({ label: customer.name, value: customer._id });
        return customer;
      })
      cb(e, options);
    });
  }

  loadProducts = async () => {
    let url = this.productsUrl;
    await ah.sendGet(url, (e, res) => {
      console.log(`ProductsCreatable -> loadProducts -> url,e,res`, url, e, res);
      let productOptions = [];
      Promise.all(res.map((product) => {
        productOptions.push({ label: product.name, value: product.code });
        return product;
      }));
      //console.log(`### will set allProducts to: ${JSON.stringify(res)} and productOptions to: ${JSON.stringify(productOptions)}`);
      this.updateStateCallback({ allProducts: res, productOptions })
    });
  }

  handleFieldChange = async (event) => {
    const { value, name } = event.target;
    await this.updateStateCallback({
      [name]: value,
    });
  }

  /*
  // Merging field changes "item", has to be in main file
  handleDataFieldChange = async (event) => {
    const { value, name } = event.target;
    let newItem = this.state.item;
    newItem[name] = value;
    console.log(`Invoices2Add -> handleFieldChange -> newitem`, newItem);
    await this.setState({item: newItem});    
  }
  */

  addItem = (item) => {
    let url = this.addUrl;
    console.log(`TCL: Invoices2Model -> addItem -> url, data`, url, item);
    if (item.products.length === 0) { this.displayAlert(true, "No products added"); return; }

    ah.sendPost(url, item, async (e, res) => {
      if (e) { this.displayAlert(true, e); return; }
      //this.displayAlert(null, `Item successfully saved!`);
      await this.updateStateCallback({
        savedId: res._id,
        saved: true
      });
    })
    return;
  };

  saveItem = (id, item) => {
    let url = this.saveUrl + id;
    console.log(`TCL: Invoices2Model -> saveItem -> url, data`, url, item);

    ah.sendPut(url, item, async (e, res) => {
      if (e) { this.displayAlert(true, e); return; }
      this.displayAlert(null, "Item successfully saved!");
      await this.updateStateCallback({ saved: true, savedId: res._id });
    })
    return;
  };

  deleteItem = (id) => {
    let url = this.deleteUrl + id;
    console.log(`TCL: Invoices2Model -> deleteItem -> id, url`, id, url);

    this.confirmMessage("Are you sure to delete this item?", () => {
      ah.sendDelete(url, async (e, res) => {
        if (e) { this.displayAlert(true, e); return; }
        this.displayAlert(null, "Item successfully deleted!");
        await this.updateStateCallback({ deleted: true });
      })
      return;
    })
  };

  ////

  emailInvoice = (id, cb) => {
    const url = this.emailUrl + id;
    ah.sendGet(url, (e, res) => {
      console.log(`TCL: Invoices2Model -> emailInvoice -> url,e,res`, url, e, res);
      if (e) { this.displayAlert(true, e); return; }
      cb(e, res);
    });
  }

  getCustomerDiscount = async (customerDetails, currentState) => {
    console.log("Invoices2Model -> getCustomerDiscount= -> customerDetails", customerDetails);
    const url = this.discountUrl + customerDetails._id;
    console.log("Invoices2Model -> getCustomerDiscount -> url", url);
    let newState = currentState;

    if (customerDetails.referrer === "") {
      newState.item.discount = 0;
      newState.item.notes = "";
      this.updateStateCallback(newState);
      this.loadProducts();
      return;
    }

    // There is referrer in customer details, whether he is eligble for discount or not
    ah.sendGet(url, async (e, res) => {
      console.log(`TCL: Invoices2Model -> getCustomerDiscount -> url,e,res`, url, e, res);
      if (e) { this.displayAlert(true, e); return; }
      let { discount } = res;
      discount = parseInt(discount);
      if (discount > 0) {
        this.displayAlert(null, `Assigned ${discount}% discount as it is a first invoice and customer is being referred by: ${res.refName}`);
        newState.item.discount = discount;
        newState.item.refCode = customerDetails.referrer;
        await this.updateStateCallback(newState);
        this.loadProducts();
      } else {
        newState.item.notes = ` `;
        newState.item.discount = '';
        await this.updateStateCallback(newState);
        this.loadProducts();
      }
    });
  }


}