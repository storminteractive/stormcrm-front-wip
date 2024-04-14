import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import appConstant from '../../constants';
import ah from '../../helpers/Axhelper';

import {
    getItemsSuccess,
    getItemsError, 
    deleteItemSuccess,
    deleteItemError,
    getDetailsSuccess,
    getDetailsError,
    consumeSuccess,
    consumeError,
    insertSuccess,
    insertError,
    updateSuccess,
    updateError,
    loadUpdateSuccess,
    loadUpdateError,
    emergencyCancellationSuccess,
    emergencyCancellationError, 
    loadMoreSuccess,
    loadMoreError
} from "./actions";

let defLimit = 2;
let defSortColumn = 'createdDate';
let defSortDirection = 'desc';

let urlAll = appConstant.baseUrl+"packages/all/";
let urlDetails = appConstant.baseUrl+"packages/details/";
let urlSearch = appConstant.baseUrl+"packages/search/"; 
let urlDelete = appConstant.baseUrl+"packages/";
let urlConsume = appConstant.baseUrl+"packages/consume/";
let urlEmergency = appConstant.baseUrl+"packages/emergency-cancellation/";
let urlInsert = appConstant.baseUrl+"packages/";
let urlUpdate = appConstant.baseUrl+"packages/";

const computeListUrl = (searchField, sortColumn, sortDirection, limit) => {
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
}

const getItemsAsync = async (actionObject) => {
    let {searchField, sortColumn, sortDirection, limit} = actionObject.payload;
    let currentUrl = computeListUrl(searchField, sortColumn, sortDirection, limit);
    let items = ah.sendGetAsync(currentUrl);
    return items;
};

function* getItems(actionObject) {
    const response = yield call(getItemsAsync,actionObject);
    if(response.error){
        yield put(getItemsError(response.error, response.headers));
    } else {
        yield put(getItemsSuccess(response.data, response.headers));
    }
}

/* eslint require-yield: 0 */  
function* setSearch(actionObject) {
    if(actionObject.payload.length>=3){
        getItems(actionObject);
    }
}

const deleteItemAsync = async (actionObject) => {
    let id = actionObject.payload;
    let currentUrl = urlDelete.concat(id);
    let items = ah.sendDeleteAsync(currentUrl);
    return items;
};

function* deleteItem(actionObject) {
    const response = yield call(deleteItemAsync,actionObject);
    if(response.error){
        yield put(deleteItemError(response.error));
    } else {
        yield put(deleteItemSuccess(response.data));
    }
}

const getDetailsAsync = async (actionObject) => {
    let id = actionObject.payload;
    let currentUrl = urlDetails.concat(id);
    let itemDetails = ah.sendGetAsync(currentUrl);
    return itemDetails;
}

function* getDetails(actionObject) {
    const response = yield call(getDetailsAsync,actionObject);
    if(response.error){
        yield put(getDetailsError(response.error));
    } else {
        yield put(getDetailsSuccess(response.data));
    }

}

const insertAsync = async (actionObject) => {
    let item = actionObject.payload;
    let response = ah.sendPostAsync(urlInsert,item);
    return response;
};

function* insert(actionObject) {
    const response = yield call(insertAsync,actionObject);
    if(response.error){
        yield put(insertError(response.error));
    } else {
        yield put(insertSuccess(response.data));
    }
}


const consumeAsync = async (actionObject) => {
    let id = actionObject.payload.packageId;
    let currentUrl = urlConsume.concat(id);
    let items = ah.sendPutAsync(currentUrl,{productName: actionObject.payload.productName});
    return items;
};

function* consume(actionObject) {
    const response = yield call(consumeAsync,actionObject);
    if(response.error){
        yield put(consumeError(response.error));
    } else {
        yield put(consumeSuccess(response.data));
    }
}

const loadUpdateAsync = async (actionObject) => {
    let id = actionObject.payload;
    let currentUrl = urlDetails.concat(id);
    let itemDetails = ah.sendGetAsync(currentUrl);
    return itemDetails;
}

function* loadUpdate(actionObject) {
    const response = yield call(loadUpdateAsync,actionObject);
    if(response.error){
        yield put(loadUpdateError(response.error));
    } else {
        yield put(loadUpdateSuccess(response.data));
    }
}

const updateAsync = async (actionObject) => {
    let id = actionObject.payload.id;
    let currentUrl = urlUpdate.concat(id);
    let item = ah.sendPutAsync(currentUrl,actionObject.payload.item);
    return item;
};

function* update(actionObject) {
    const response = yield call(updateAsync,actionObject);
    if(response.error){
        yield put(updateError(response.error));
    } else {
        yield put(updateSuccess(response.data));
    }
}

const emergencyCancellation = async (actionObject) => {
    let id = actionObject.payload;
    let currentUrl = urlEmergency.concat(id);
    let item = ah.sendGetAsync(currentUrl);
    return item;
}

function* emergencyCancellationAsync(actionObject) {
    const response = yield call(emergencyCancellation,actionObject);
    if(response.error){
        yield put(emergencyCancellationError(response.error));
    } else {
        yield put(emergencyCancellationSuccess(response.data));
    }
}

function* loadMore(actionObject) {
    // console.log("Load more saga");
    const response = yield call(getItemsAsync,actionObject);
    if(response.error){
        yield put(loadMoreError(response.error, response.headers));
    } else {
        yield put(loadMoreSuccess(response.data, response.headers));
    }
}

export function* watchActions() {
    yield takeEvery('GET_ITEMS', getItems);
    yield takeEvery('LOAD_MORE', loadMore);
    yield takeEvery('SET_SEARCH_FIELD', setSearch);
    yield takeEvery('DELETE_ITEM', deleteItem);
    yield takeEvery('GET_DETAILS', getDetails);
    yield takeEvery('CONSUME', consume);
    yield takeEvery('INSERT', insert);
    yield takeEvery('LOAD_UPDATE', loadUpdate);
    yield takeEvery('UPDATE', update);
    yield takeEvery('EMERGENCY_CANCELLATION', emergencyCancellationAsync);
}

export default function* rootSaga() {
    yield all([
        fork(watchActions)
    ]);
}