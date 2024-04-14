import axios from 'axios';

class Axhelper {

    sendGet = async (url, cb) => {
        await axios.get(url, { withCredentials: true }).then(
            resp => {
                //console.log(`TCL: AxiosHelper -> sendGet -> resp`, resp.data);
                cb(null, resp.data);
            },
            error => {
                let errorMessage = error;
                if(errorMessage.response){errorMessage = error.response.data}
                //console.log(`TCL: AxiosHelper -> sendGet -> error`,errorMessage);
                cb(`${errorMessage}`, null);
            }
        );
    };

    sendGetAsync = async (url) => {
        let errorMessage = null;
        const response = await axios.get(url, { withCredentials: true }).catch(error => {
            errorMessage = error;
            if(errorMessage.response){errorMessage = error.response.data}
            //console.log(`TCL: AxiosHelper -> sendGetAsync -> error`,errorMessage);
            return `${errorMessage}`;
        })
        //console.log(`TCL: AxiosHelper -> sendGetAsync -> response.error, response.data`, errorMessage, response.data);
        return {error: errorMessage, headers: response.headers, data: response.data};
    };

    sendGetUserPassword = async (url, user, password, cb) => {
        await axios.get(url, { withCredentials: true }, {
            auth: {
                'username': user,
                'password': password
            }
        }).then(
            resp => {
                //console.log(`TCL: AxiosHelper -> sendGetUserPassword -> resp`, resp.data);
                cb(null, resp.data);
            },
            error => {
                let errorMessage = error;
                if(errorMessage.response){errorMessage = error.response.data}
                //console.log(`TCL: AxiosHelper -> sendPost -> error`,errorMessage);
                cb(`${errorMessage}`, null);
            }
        );
    };

    sendDelete = async (url, cb) => {
        await axios.delete(url, { withCredentials: true }).then(
            resp => {
                //console.log(`TCL: AxiosHelper -> sendDelete -> resp`, resp.data);
                cb(null, resp.data);
            },
            error => {
                let errorMessage = error;
                if(errorMessage.response){errorMessage = error.response.data}
                //console.log(`TCL: AxiosHelper -> sendDelete -> error`,errorMessage);
                cb(`${errorMessage}`, null);
            }
        );
    };

    sendDeleteAsync = async (url) => {
        let errorMessage = null;
        const response = await axios.delete(url, { withCredentials: true }).catch(error=>{
            errorMessage = error;
            if(errorMessage.response){errorMessage = error.response.data}
            //console.log(`TCL: AxiosHelper -> sendDeleteAsync -> error`,errorMessage);
            return `${errorMessage}`;
        })
        //console.log("Axhelper -> sendDeleteAsync -> response.error, response.data", errorMessage, response.data);
        return {error: errorMessage, headers: response.headers, data: response.data}
    };

    sendPost = async (url, data, cb) => {
        await axios.post(url, data, { withCredentials: true }).then(
            resp => {
                //console.log(`TCL: AxiosHelper -> sendPost -> resp`,resp.data);
                cb(null, resp.data);
            },
            error => {
                let errorMessage = error;
                if(errorMessage.response){errorMessage = error.response.data}
                //console.log(`TCL: AxiosHelper -> sendPost -> error`,errorMessage);
                cb(`${errorMessage}`, null);
            }
        );
    };

    sendPostAsync = async (url, data) => {
        let errorMessage = null;
        const response = await axios.post(url, data, { withCredentials: true }).catch(error => {
            errorMessage = error;
            if(errorMessage.response){errorMessage = error.response.data}
            //console.log(`TCL: AxiosHelper -> sendPostAsync -> error`,errorMessage);
            return `${errorMessage}`;
        });

        //console.log("Axhelper -> sendPostAsync -> response.error, response.data", errorMessage, response.data);
        return {error: errorMessage, headers: response.headers, data: response.data};
    };

    sendUploadAsync = async (url, data, onUploadProgress) => {
        let errorMessage = null;
        console.log(`will send data: `,data);
        const response = await axios.post(url, data, { withCredentials: true }, (progressEvent) => {
                console.log(`Progress: progressEvent`);
                if(onUploadProgress) onUploadProgress(progressEvent);
        }).catch(error => {
            errorMessage = error;
            if(errorMessage.response){errorMessage = error.response.data}
            //console.log(`TCL: AxiosHelper -> sendPostAsync -> error`,errorMessage);
            return `${errorMessage}`;
        });

        return {error: errorMessage, headers: response.headers, data: response.data, status: response.status};
    }

    sendPut = async (url, data, cb) => {
        await axios.put(url, data, { withCredentials: true }).then(
            resp => {
                //console.log(`TCL: AxiosHelper -> sendPut -> resp`,resp.data);
                cb(null, resp.data);
            },
            error => {
                let errorMessage = error;
                if(errorMessage.response){errorMessage = error.response.data}
                //console.log(`TCL: AxiosHelper -> sendPut -> error`,errorMessage);
                cb(`${errorMessage}`, null);

            }
        );
    };

    sendPutAsync = async (url, data) => {
        let errorMessage = null;
        const response = await axios.put(url, data, { withCredentials: true }).catch(error => {
            errorMessage = error;
            if(errorMessage.response){errorMessage = error.response.data}
            //console.log(`TCL: AxiosHelper -> sendPutAsync -> error`,errorMessage);
            return `${errorMessage}`;
        });
        //console.log("Axhelper -> sendPutAsync -> response.error, response.data", errorMessage, response.data);
        return {error: errorMessage, headers: response.headers, data: response.data};
    }
    
}
export default new Axhelper();