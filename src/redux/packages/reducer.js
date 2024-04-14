const INIT_STATE = {
	loading: true,

    searchField: '',

    sortColumn: 'createdDate',
    sortDirection: 'desc',
    limit: 2,
    
    sortOptions: [
        { column: 'createdDate', label: 'Created Date' },
        { column: 'code', label: 'Package code' }
    ],
    selectedSortOption: {column: 'createdDate', label: 'Created Date'},

    selectProductOptions: [
        {value:'restart-1', label: 'Recovery assessment/follow up - 1 hr'},
        {value:'restart-2', label: 'Recovery session - 45 mins'},
        {value:'restart-3', label: 'Membership package'},
        {value:'restart-4', label: 'IR Sauna - 30 min'},
        {value:'restart-5', label: 'IR Sauna - 45 min'},
        {value:'restart-6', label: '(Add on) IR Sauna - 30 min'},
        {value:'restart-7', label: 'Compression therapy (Normatec) - 1 hr '},
        {value:'restart-8', label: 'Compression therapy (Normatec) - 30 min'},
        {value:'restart-9', label: '(Add on) Compression therapy (Normatec) - 30 min'},
        {value:'restart-10', label: 'Sports massage - 1 hr'},
        {value:'restart-11', label: 'Sports massage - 30 min'},
        {value:'restart-12', label: 'Floatation therapy - 1 hr'},
        {value:'restart-13', label: 'Floatation therapy - 90 min'},
        {value:'restart-14', label: 'Floatation therapy - 2 hr'},
        {value:'restart-15', label: 'Cryotherapy - 1 session'}
    ], 
    selectedProductOption: null,

    deleted: false,
    items: [],

    details: null, 

    updateFlag: 0,
    insertField: {
        customerId: '',
        customerName: '',
        productName: '',
        remainingUsage: '',
        expiry: null,
        note: '',
        code: ''
    },
    inserted: false,
    updated: false,

    message: null
};

let searchField;
let sortColumn;
let sortDirection;
let limit;

const packagesReducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        
        case 'LOAD_MORE':
            searchField = action.payload.searchField?action.payload.searchField:state.searchField;
            sortColumn = action.payload.sortColumn?action.payload.sortColumn:state.sortColumn;
            sortDirection = action.payload.sortDirection?action.payload.sortDirection:state.sortDirection;
            limit = action.payload.limit?action.payload.limit:state.limit+50;
            //return { ...state, error: null, searchField, sortColumn, sortDirection, limit, loadMoreLoading: true};
            return {...state, limit, error: null, loadMoreLoading: true};

        case 'GET_ITEMS':
            searchField = action.payload.searchField?action.payload.searchField:state.searchField;
            sortColumn = action.payload.sortColumn?action.payload.sortColumn:state.sortColumn;
            sortDirection = action.payload.sortDirection?action.payload.sortDirection:state.sortDirection;
            limit = action.payload.limit?action.payload.limit:state.limit;
            return { ...state, items: [], error: null, searchField, sortColumn, sortDirection, limit, loading: true};
        
        case 'GET_ITEMS_SUCCESS':
            return { ...state, items: action.payload.items, headers: action.payload.headers, loading: false};
        
        case 'LOAD_MORE_SUCCESS':
            return { ...state, items: [...action.payload.items],headers: action.payload.headers, loadMoreLoading: false};
        
        case 'GET_ITEMS_ERROR':
            state.error = action.payload;
            return {...state, loadMoreLoading: false};

        case 'LOAD_MORE_ERROR':
            state.error = action.payload; 
            return {...state, loading: false};
        
        case 'GET_DETAILS':
            return { ...state, details: null, error: null, loading: true};

        case 'GET_DETAILS_SUCCESS':
            return { ...state, details: action.payload, loading: false};
        
        case 'GET_DETAILS_ERROR':
            state.error = action.payload;
            return {...state, loading: false};

        case 'SET_SEARCH_FIELD':
            return { ...state, searchField: action.payload};

        case 'SET_SORTING':
            let computedSortDirection = state.sortDirection; 
            if(!action.payload.sortDirection) {
                if (action.payload.selectedSortOption.column === state.selectedSortOption.column) {
                    console.log(`Same column changing order`);
                    if (state.sortDirection === "asc") { computedSortDirection = `desc`;} 
                    else { computedSortDirection = `asc`; }
                }
            } else { computedSortDirection = action.payload.sortDirection };
            return {...state, selectedSortOption: action.payload.selectedSortOption, sortDirection: computedSortDirection};
            
        case 'DELETE_ITEM':
            return { ...state, loading: true};
        
        case 'DELETE_ITEM_SUCCESS':
            return { ...state, loading: false, deleted: true, items: state.items.filter(item => item._id !== action.payload._id)};
        
        case 'DELETE_ITEM_ERROR':
            state.error = action.payload;
            return { ...state, loading: false};

        case 'SET_DELETED':
            return { ...state, deleted: true};
        
        case 'UNSET_DELETED':
            return { ...state, deleted: false, message: null};

        case 'SELECT_PRODUCT':
            return { ...state, selectedProductOption: action.payload};
        
        case 'CONSUME':
            return { ...state, loading: true};
        
        case 'CONSUME_SUCCESS':
            state.message = `Package consumed successfully`;
            return { ...state, details: action.payload, loading: false};
        
        case 'CONSUME_ERROR':
            state.error = action.payload;
            return { ...state, loading: false};

        case 'SET_MESSAGE':
            return { ...state, message: action.payload};

        case 'UNSET_MESSAGE':
            return { ...state, message: null};
        
        case 'UNSET_ERROR':
            return { ...state, error: null};

        case 'SET_INSERT_FIELD':
            state.insertField[action.payload.field] = action.payload.value;
            state.updateFlag ++;
            return { ...state, loading: false};

        case 'INSERT':
            return { ...state, loading: true};
        
        case 'INSERT_SUCCESS':
            return { ...state, inserted: action.payload._id, loading: false};
        
        case 'INSERT_ERROR':
            state.error = action.payload;
            return { ...state, loading: false};
        
        case 'UNSET_INSERTED':
            return { ...state, insertField: INIT_STATE.insertField, inserted: false};

        case 'LOAD_UPDATE':
            return { ...state, loading: true};
        
        case 'LOAD_UPDATE_SUCCESS':
            delete action.payload.__v;
            delete action.payload.consumptionDates;
            delete action.payload.created;
            delete action.payload._id;
            return { ...state, loading: false, insertField: action.payload};

        case 'LOAD_UPDATE_ERROR':
            state.error = action.payload;
            return { ...state, loading: false};
        
        case 'UPDATE':
            return { ...state, loading: true};
        
        case 'UPDATE_SUCCESS':
            state.message = `Package updated successfully`;
            return { ...state, updated: action.payload._id, loading: false};

        case 'UPDATE_ERROR':
            state.error = action.payload;
            return { ...state, loading: false};

        case 'UNSET_UPDATED':
            return { ...state, insertField: INIT_STATE.insertField, updated: false};

        case 'SET_CUSTOMER':
            state.updateFlag ++;
            state.insertField.customerName = action.payload.label;
            state.insertField.customerId = action.payload.value;
            return { ...state};

        case 'SET_PRODUCT':
            state.updateFlag ++;
            state.insertField.productName = action.payload.label;
            return { ...state};

        case 'EMERGENCY_CANCELLATION':
            return { ...state, loading: true};

        case 'EMERGENCY_CANCELLATION_SUCCESS':
            state.message = `Visit cancelled successfully`;
            return { ...state, details: action.payload, loading: false};

        case 'EMERGENCY_CANCELLATION_ERROR':
            state.error = action.payload;
            return { ...state, loading: false};

        default:
            return state;
    }
}

export default packagesReducer; 