import ah from '../../../helpers/Axhelper';
import appConstants from '../../../constants';

let defLimit = 2;
let defSortColumn = 'createdDate';
let defSortDirection = 'desc';

const urlAll = appConstants.baseUrl + 'packages/all/';
const urlSearch = appConstants.baseUrl + 'packages/search/';

const urlDetails = appConstants.baseUrl + 'packages/details/';
const urlInsert = appConstants.baseUrl + 'packages/';
const urlUpdate = appConstants.baseUrl + 'packages/';
const urlConsume = appConstants.baseUrl + 'packages/consume/'

const Service = {

    buildSearchUrl: (searchField, sortColumn, sortDirection, limit) => {
        // console.log("computeListUrl -> searchField, sortColumn, sortDirection, limit", searchField, sortColumn, sortDirection, limit);
        let computedSort = sortColumn || defSortColumn;
        let computedDirection = sortDirection || defSortDirection;
        let computedLimit = limit || defLimit; 
        let computedSearchUrl = urlSearch.concat(encodeURIComponent(searchField)).concat(`?sortcol=${computedSort}&sortdir=${computedDirection}&limit=${computedLimit}`);
        let computedAllUrl = urlAll.concat(`?sortcol=${computedSort}&sortdir=${computedDirection}&limit=${computedLimit}`);
    
        if(!searchField || searchField.length===0) { 
            return computedAllUrl 
        } else { 
            return computedSearchUrl 
        }
    },

    getAll: async () => {
        const {error, data } = await ah.sendGetAsync(urlAll);
        return {error, data}
    },

    getItem: async (id) => {
        const {error, data } = await ah.sendGetAsync(urlDetails+id);
        return {error, data}
    },

    insertItem: async (item) => {
        const { error, data } = await ah.sendPostAsync(urlInsert, item);
        return {error, data};
    },

    updateItem: async (id, item) => {
        const {error, data} = await ah.sendPutAsync(`${urlUpdate}${id}`, item);
        return {error, data}
    },

    consumeItem: async (id, productName) => {
        const {error, data} = await ah.sendPutAsync(`${urlConsume}${id}`, {productName});
        return {error, data}
    }

};

export default Service;
