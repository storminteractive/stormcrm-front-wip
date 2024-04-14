import axios from 'axios';
import swal from 'sweetalert';
import moment from "moment";
import appConstant from '../../../constants';
import ah from '../../../helpers/Axhelper';

export default class ClientModel {
  initState = {
    id: '',
    isDelete: false,
    name: '',
    tel: '',
    email: '',
    address: '',
    created: '',
    internalNotes: '',
    therapistId: '',
    invoices: [],
    assessments: [],
    packages: [],
    schedules: [],
    visits: [],
    memberships: [],
    emergencyCancellations: [],
    notifications: [],
  }

  constructor(updateStateCallback) {
    this.updateStateCallback = updateStateCallback;
  }

  getInitState = id => {
    if (id) this.initState.id = id;
    return this.initState;
  };

  displayAlert(e,message){
    let title = "Success!";
    let icon = "success";
    if(e) {title = "Error!"; icon = "error";}
    swal({title: title, text: message, icon: icon});
  }

  handleInputChange = async (event) => {
    const { value, name } = event.target;
    await this.updateStateCallback({
      [name]: value,
    });
  }

  handleCustomerChange = selectedCustomer => {
    this.updateStateCallback({ selectedCustomer });
  };

sendGet = async (url, cb) => {
  await axios.get(url, { withCredentials: true }).then(
    resp => {
      console.log(`TCL: ClientModel -> sendGet -> resp`, resp.data);
      cb(null, resp.data);
    },
    error => {
      console.log(`TCL: ClientModel -> sendGet -> error.response.data`,error.response.data);
      cb(error.response.data, null);
    }
  );
};

sendDelete = async (url, cb) => {
  await axios.delete(url, { withCredentials: true }).then(
    resp => {
      console.log(`TCL: ClientModel -> sendGet -> resp`, resp.data);
      cb(null, resp.data);
    },
    error => {
      console.log(`TCL: ClientModel -> sendGet -> error.response.data`,error.response.data);
      cb(error.response.data, null);
    }
  );
};

sendPost = async (url, data, cb) => {
  await axios.post(url, data,{ withCredentials: true }).then(
    resp => {
      console.log(`TCL: ClientModel -> sendPost -> resp`,resp.data);
      cb(null, resp.data);
    },
    error => {
      console.log(`TCL: ClientModel -> sendPost -> error.response.data`, error.response.data);
      cb(error.response.data, null);
    }
  );
};


  addData = async (state) => {
    let { questions } = state;
    const data = {
      customerId: state.selectedCustomer.value,
      questions
    };
    if(state.internalNotes) data.internalNotes = state.internalNotes;
    let url = appConstant.customer;
    console.log(`TCL: ClientModel -> addData -> url, data`, url, data);

    this.sendPost(url,data,async (e,res)=>{
      if(e){ this.displayAlert(true, e); return; }
      this.displayAlert(null, "Client successfully saved!");
      await this.updateStateCallback({ isSaved: true});
    })
    return;
    
  };

  deleteId = async (id) => {
    swal({
      title: "Are you sure?",
      text: "This data will be permanently deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let url = appConstant.customer+id;
        console.log(`TCL: ClientModel -> deleteId -> url`, url);
        this.sendDelete(url,(e,res)=>{
          if(e){ this.displayAlert(true, e); return; }
          this.displayAlert(null, "Client successfully saved!");
          this.updateStateCallback({isDeleted: true});    
        });
        //this.delete();
      }
    });    
  };
  
  loadCustomers = async () => {
    let customers = [];
    let url = appConstant.customerAll;
    await this.sendGet(url,(e,res)=>{
      if(e){ this.displayAlert(true, e); return; }
      res.map(customer => {
        customers.push({label: customer.name, value: customer._id});
        return customer;
      })
    })
    this.updateStateCallback({selectCustomer: customers});
  };

  getCustomerById = async (id) => {
    let url = appConstant.customerDetails + id;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> getCustomerById -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({ customerName: res.name, customerAddress: res.address, customerEmail: res.email, customerNumber: res.tel });
    });
  }

  loadData = async (id) => {
    let url = appConstant.customerDetails + id;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> loadData -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({
        name: res.name,
        tel: res.tel,
        email: res.email,
        address: res.address,
        created: moment(res.created),
        internalNotes: res.internalNotes?res.internalNotes:'',
        therapistId: res.therapistId
      });
      this.getInvoices(id);
      this.getPackages(id);
      this.getAssessments(id);
      this.getSchedules(id);
      this.getVisits(id);
      this.getMemberships(id);
      this.getEmergencyCancellations(id);
      this.getCustomerNotifications(id);
    });
  }

  getEmergencyCancellations = (customerId) => {
    let url = appConstant.emergencyCancellations+customerId;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> getemergencyCancellations -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({
        emergencyCancellations: res
      });
    });
  }

  getCustomerNotifications = (customerId) => {
    let url = appConstant.customerNotifications+customerId;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> getcustomerNotifications -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({
        notifications: res
      });
    });
  }

  getSchedules = (customerId) => {
    let url = appConstant.schedulesCustomer+customerId;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> getSchedules -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({
        schedules: res
      });
    });
  }

  getInvoices = async (customerid) => {
    let url = appConstant.invoiceByCustomer + customerid;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> getInvoices -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({
        invoices: res
      });
    });
  }

  getPackages = async (customerid) => {
    let url = appConstant.packageByCustomer + customerid;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> getPackages -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({
        packages: res
      });
    });
  }

  getAssessments = async (customerid) => {
    let url = appConstant.assessmentByCustomer + customerid;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> getAssessments -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({
        assessments: res
      });
    });
  }

  getVisits = async (customerid) => {
    let url = appConstant.visitsByCustomer + customerid;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> getVisits -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({
        visits: res
      });
    });
  }

  getMemberships = async (customerid) => {
    let url = appConstant.membershipsByCustomer + customerid;
    this.sendGet(url, async (e,res)=>{
      console.log(`TCL: ClientModel -> getMemberships -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      await this.updateStateCallback({
        memberships: res
      });
    });
  }

  setTherapist = async (customerid,therapistid) => {
    let url = appConstant.customerSetTherapist;
    this.sendPost(url,{customerid, therapistid}, async (e,res)=>{
      console.log(`TCL: ClientModel -> setTherapist -> url,e,res`, url,e,res);
      if(e){ this.displayAlert(true, e); return; }
      this.displayAlert(null, "Therapist successfully updated");
      await this.updateStateCallback({
        therapistId: res.therapistId
      });
    });
  }

  updateNotes = (customerId, notes) => {
    let url = appConstant.customerUpdateNotes+customerId;
    console.log(`TCL: CustomerModel -> updateNotes -> url, notes`, url, notes);
    ah.sendPut(url,{internalNotes: notes},async (e,res)=>{
      if(e){ this.displayAlert(true, e); return; }
      this.displayAlert(null, "Item successfully saved!");
      await this.updateStateCallback({ saved: true});
    })
    return;
  };

}