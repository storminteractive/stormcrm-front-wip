import ah from './Axhelper';
const swal = require('sweetalert');

class SettingsClass{
    getSettings = (cb) => {
        ah.sendGet('/settings/getsystem', (e, res) => {
            if (e) {
              console.log("Error fetching settings:", e); swal({
                title: "Error!",
                text: e,
                icon: "error"
              }); 
              cb(e, null);
              return;
            }
            // console.log("Settings fetched:", res);
            cb(null, res);
          });
    }
}

export default new SettingsClass();