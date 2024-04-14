import { useState, useEffect } from 'react';
import ah from './Axhelper';
import swal from 'sweetalert';

const useSettings = () => {
    const [settings, setSettings] = useState({});
    const [settingsLoading, setSettingsLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            setSettingsLoading(true);
            ah.sendGet('/settings/getsystem', (e, res) => {
                if (e) { console.log("Error fetching settings:", e); swal({
                    title: "Error!",
                    text: e,
                    icon: "error"
                }); return; }
                setSettings(res);
                setSettingsLoading(false);
            });
        };
        fetchSettings();
    }, []);

    const saveSettings = async () => {
        console.log("Saving settings")
        setSettingsLoading(true);
        ah.sendPut('/settings/setsystem', settings, (e, res) => {
            if (e) { console.log("Error saving settings:", e); return; }
            setSettingsLoading(false);
            swal({ title: "Success!", text: "Settings updated", icon: "success" });
        });
    };

    return { settings, settingsLoading, setSettings, saveSettings };
};

export default useSettings;
