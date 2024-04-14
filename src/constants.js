
require('dotenv').config();
//console.log("TCL: process.env", process.env);
const baseUrl =  `/`;
console.log(`Backend baseUrl`, baseUrl);

const appConstant = {
    baseUrl: baseUrl,
    customer: baseUrl + 'customers/',
    customerDetails: baseUrl + 'customers/details/',
    customerAll: baseUrl + 'customers/all/',
    customerSearch: baseUrl + 'customers/search/',
    customerSetTherapist: baseUrl + 'customers/settherapist/',
    customerUpdateNotes: baseUrl + 'customers/updatenotes/',
    referrerSearch: baseUrl + 'referrals/searchone/',

    packageAll:  baseUrl + 'packages/all/',
    packages: baseUrl + 'packages/',
    packageAdd: baseUrl + 'packages/',
    packageDetails: baseUrl + 'packages/details/',
    packageConsume:  baseUrl + 'packages/consume/',
    packageSearch:  baseUrl + 'packages/search/',
    packageByCustomer: baseUrl + 'packages/bycustomer/',
    
    invoice: baseUrl + 'invoices2/',
    invoiceDetails: baseUrl + 'invoices2/details/',
    invoiceAll:  baseUrl + 'invoices2/all/',
    invoiceSearch:  baseUrl + 'invoices2/search/',
    invoiceByCustomer: baseUrl + 'invoices2/bycustomer/',
    
    checkAuth: baseUrl + 'users/checkauth/',
    authenticate: baseUrl + 'users/authenticate/',
    logout: baseUrl + 'users/logout/',
    changePass: baseUrl + 'users/changepass/',

    assessments: baseUrl + 'assessments/',
    assessmentsDetails: baseUrl + 'assessments/details/',
    assessmentsAll:  baseUrl + 'assessments/all/',
    assessmentsSearch:  baseUrl + 'assessments/search/',
    assessmentByCustomer:  baseUrl + 'assessments/bycustomer/',

    visitsByCustomer:  baseUrl + 'visits/bycustomer/',

    membershipsByCustomer:  baseUrl + 'memberships/bycustomer/',
    emergencyCancellations:  baseUrl + 'memberships/emergencycancellations/',
    customerNotifications: baseUrl + 'customernotifications/bycustomer/',

    exportCustomers:  baseUrl + 'customers/export/',
    exportInvoices:  baseUrl + 'invoices2/export/',
    exportLeads:  baseUrl + 'leads/export/',
    exportExperimental:  baseUrl + 'experimental/export/',

    schedulesCustomer: baseUrl + 'schedule/customerschedules/',
    
    success: 'Successfully Saved',
    deleteWarning: 'Once deleted, you will not be able to recover this data!',
    warningHeader: 'Are you sure?',
    deleteSuccess: 'Successfully Deleted',
    somethingWentWrong: 'Something Went Wrong'
}

export default appConstant;