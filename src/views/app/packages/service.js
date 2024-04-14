import ah from '../../../helpers/Axhelper';
import appConstants from '../../../constants';

const urlInsert = appConstants.baseUrl + 'packages/';
const urlUpdate = appConstants.baseUrl + 'packages/';
const urlDelete = appConstants.baseUrl + 'packages/';
const urlConsume = appConstants.baseUrl + 'packages/consume/';

const Service = {

    insertItem: async (item) => {
        console.log("insertItem: -> data:", item);
        const { error, data } = await ah.sendPostAsync(urlInsert, item);
        console.log("insertItem: -> error, data:", error, data);
        return {error, data};
    },

    updateItem: async (id, item) => {
        try {
            const response = await ah.sendPutAsync(`${urlUpdate}${id}`, item);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deleteItem: async (id) => {
        try {
            const response = await ah.sendDeleteAsync(`${urlDelete}${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    consumeItem: async (id) => {
        try {
            const response = await ah.sendPostAsync(`${urlConsume}${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default Service;
