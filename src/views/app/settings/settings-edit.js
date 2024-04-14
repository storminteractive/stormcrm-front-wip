import React, { Fragment } from "react";
import { Card, CardBody, Row } from "reactstrap";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import CompanyDetails from "./companyDetails";
import SaveButton from "./saveButton";
import Images from "./Images";
import EmailDetails from "./emailDetails";
import useSettings from "../../../helpers/useSettings";


const SettingsEdit = props => {

  // let [settings, setSettings] = useState({});
  // let [loading, setLoading] = useState(true);
  // const saveSettings = async () => {
  //   ah.sendPut('/settings/setsystem', settings, (e, res) => {
  //     if (e) { swal({ title: "Error!", text: e, icon: "error" }); return; }
  //     swal({ title: "Success!", text: "Settings updated", icon: "success" });
  //   });
  // }
  // useEffect(() => {
  //   fetch('/settings/getsystem')
  //     .then(res => res.json())
  //     .then(data => {
  //       setSettings(data);
  //       setLoading(false);
  //       console.log("useEffect -> data:", data);
  //     });
  // }, []);
  // const [loading, setLoading] = useState(true);

  const { settings, setSettings, settingsLoading, saveSettings } = useSettings();

  const updateSettings = async (event) => {
    const { value, name } = event.target;
    setSettings({ ...settings, [name]: value });
  }

  return (
    <Fragment>
      {settingsLoading && <div className="loading" />} 

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Settings" match={props.match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xl="12" xxs="12">
          <Card>
            <CardBody>
            <Nav className="justify-content-center">
                  <NavItem>
                    <NavLink active href="#company-details">
                      Company details
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#email-details">
                      Email details
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#images">
                      Images
                    </NavLink>
                  </NavItem>
                </Nav>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xl="12" xxs="12">
          <Card>
            <CardBody>

              <CompanyDetails settings={settings} updateSettings={updateSettings} />
              <SaveButton saveSettings={saveSettings} />
              <EmailDetails settings={settings} updateSettings={updateSettings}/>
              <SaveButton saveSettings={saveSettings} />
              <Images settings={settings} updateSettings={updateSettings} />

            </CardBody>
          </Card>
        </Colxx>
      </Row>

    </Fragment>
  );
}

export default SettingsEdit;