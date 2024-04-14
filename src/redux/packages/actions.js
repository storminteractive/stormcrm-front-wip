export const getItems = (searchField, sortColumn, sortDirection, limit) => {
    return {
        type: 'GET_ITEMS',
        payload: { searchField, sortColumn, sortDirection, limit }
    }
}

export const loadMore = (searchField, sortColumn, sortDirection, limit) => {
    return {
        type: 'LOAD_MORE',
        payload: { searchField, sortColumn, sortDirection, limit }
    }
}

export const getItemsSuccess = (items, headers) => {
    return {
        type: 'GET_ITEMS_SUCCESS',
        payload: {items, headers}
    }
}

export const loadMoreSuccess = (items, headers) => {
    return {
        type: 'LOAD_MORE_SUCCESS',
        payload: {items, headers}
    }
}

export const getItemsError = (error, headers) => {
    return {
        type: 'GET_ITEMS_ERROR',
        payload: error
    }
}

export const loadMoreError = (error, headers) => {
    return {
        type: 'LOAD_MORE_ERROR',
        payload: error
    }
}

export const getDetails = (itemId) => {
    return {
        type: 'GET_DETAILS',
        payload: itemId
    }
}

export const getDetailsSuccess = (item) => {
    return {
        type: 'GET_DETAILS_SUCCESS',
        payload: item
    }
}

export const getDetailsError = (error) => {
    return {
        type: 'GET_DETAILS_ERROR',
        payload: error
    }
}

export const setSearchField = (searchField) => {
    return {
        type: 'SET_SEARCH_FIELD',
        payload: searchField
    }
}

export const setSorting = (selectedSortOption, sortDirection) => {
    return {
        type: 'SET_SORTING',
        payload: { selectedSortOption, sortDirection }
    }
}

export const deleteItem = (itemId) => {
    return {
        type: 'DELETE_ITEM',
        payload: itemId
    }
}

export const deleteItemSuccess = (itemId) => {
    return {
        type: 'DELETE_ITEM_SUCCESS',
        payload: itemId
    }
}

export const deleteItemError = (error) => {
    return {
        type: 'DELETE_ITEM_ERROR',
        payload: error
    }
}

export const setDeleted = () => {
    return {
        type: 'SET_DELETED'
    }
}

export const unsetDeleted = () => {
    return {
        type: 'UNSET_DELETED'
    }
}

export const selectProduct = (product) => {
    return {
        type: 'SELECT_PRODUCT',
        payload: product
    }
}

export const consume = (packageId, productName) => {
    return {
        type: 'CONSUME',
        payload: { packageId, productName }
    }
}

export const consumeSuccess = (packageObject) => {
    return {
        type: 'CONSUME_SUCCESS',
        payload: packageObject
    }
}

export const consumeError = (error) => {
    return {
        type: 'CONSUME_ERROR',
        payload: error
    }
}

export const setMessage = (message) => {
    return {
        type: 'SET_MESSAGE',
        payload: message
    }
}

export const unsetMessage = () => {
    return {
        type: 'UNSET_MESSAGE'
    }
}

export const unsetError = () => {
    return {
        type: 'UNSET_ERROR'
    }
}

/////

export const setInsertField = (field, value) => {
    return {
        type: 'SET_INSERT_FIELD',
        payload: { field, value }
    }
}

export const insert = (item) => {
    return {
        type: 'INSERT',
        payload: item
    }
}

export const insertSuccess = (item) => {
    return {
        type: 'INSERT_SUCCESS',
        payload: item
    }
}

export const insertError = (error) => {
    return {
        type: 'INSERT_ERROR',
        payload: error
    }
}

export const setUpdateField = (field, value) => {
    return {
        type: 'SET_UPDATE_FIELD',
        payload: { field, value }
    }
}

export const update = (id, item) => {
    return {
        type: 'UPDATE',
        payload: {id, item}
    }
}

export const updateSuccess = (item) => {
    return {
        type: 'UPDATE_SUCCESS',
        payload: item
    }
}

export const updateError = (error) => {
    return {
        type: 'UPDATE_ERROR',
        payload: error
    }
}

export const setCustomer = (customer) => {
    return {
        type: 'SET_CUSTOMER',
        payload: customer
    }
}

export const setExpiryDate = (date) => {
    return {
        type: 'SET_EXPIRY_DATE',
        payload: date
    }
}

export const setProduct = (product) => {
    return {
        type: 'SET_PRODUCT',
        payload: product
    }
}

export const unsetInserted = () => {
    return {
        type: 'UNSET_INSERTED'
    }
}

export const unsetUpdated = () => {
    return {
        type: 'UNSET_UPDATED'
    }
}

export const loadUpdate = (id) => {
    return {
        type: 'LOAD_UPDATE',
        payload: id
    }
}

export const loadUpdateSuccess = (item) => {
    return {
        type: 'LOAD_UPDATE_SUCCESS',
        payload: item
    }
}

export const loadUpdateError = (error) => {
    return {
        type: 'LOAD_UPDATE_ERROR',
        payload: error
    }
}

export const emergencyCancellation = (id) => {
    return {
        type: 'EMERGENCY_CANCELLATION',
        payload: id
    }
}

export const emergencyCancellationSuccess = (id) => {
    return {
        type: 'EMERGENCY_CANCELLATION_SUCCESS',
        payload: id
    }
}

export const emergencyCancellationError = (error) => {
    return {
        type: 'EMERGENCY_CANCELLATION_ERROR',
        payload: error
    }
}
