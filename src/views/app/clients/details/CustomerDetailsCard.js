import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { Row, Card, CardBody, Nav, NavItem, CardHeader, TabContent, TabPane, Button } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import moment from "moment";
import appConstant from '../../../../constants';
import classnames from "classnames";
import swal from 'sweetalert';
import ah from '../../../../helpers/Axhelper';

export default function MyComponent(props) {

  const [customerDetails, setCustomerDetails] = useState({});
  const [referrerDetails, setReferrerDetails] = useState(`None`);

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    let componentMounted = true;
    console.log(`Component has updated`)
    let url = appConstant.customerDetails + props.customerId;
    ah.sendGet(url, (e, res) => {
      console.log("CustomerDetails ah.sendGet -> res", res);

      let newState = res;
      newState.dob = moment(res.dob).format("YYYY-MM-DD");
      newState.created = moment(res.created).format("YYYY-MM-DD");
      newState.id = props.id;
      if(componentMounted) setCustomerDetails(newState);

      if(newState.referrer){
        let refSearchString = newState.referrer;
        let refUrl = appConstant.referrerSearch + refSearchString;
        console.log(`Referrer search url: ${refUrl}`);
        ah.sendGet(refUrl,(e,res)=>{
          if(e){ 
            if(componentMounted) setReferrerDetails(`Not found (${newState.referrer})`);
            swal("Referrer not found", `Referrer ${newState.referrer} not found.`, "warning")
            return;
          }
          if(componentMounted)setReferrerDetails(<a href={`/app/referrals/details/${res._id}`}>{res.customerName} ({newState.referrer})</a>);
        });
      }
    })
    return () => { componentMounted = false; };
  },[]);

  //useEffect(() => { dispatch(actions.referralsStatsLoad()); },[])

  return (
    <Card className="mb-4">
      <CardHeader>
        {/* Entire cardheader is just tab navigation - our pretty looking title } */}
        <Nav tabs className="card-header-tabs ">
          <NavItem>
            <NavLink to={"#"} className={classnames({ "active": true, "nav-link": true })}>
              Customer details
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>

      <TabContent activeTab={`1`}>
        <TabPane tabId="1">
          <Row>

            <Colxx xl="5" sm="12">
              <CardBody>
                <div className="text-center">
                  <i className="iconsminds-male large-icon"></i>
                  <h5 className="mb-0 font-weight-semibold color-theme-1 mb-2">{customerDetails.name}</h5>
                  <p>
                    <b>Joined:</b> {customerDetails.created}<br />
                    <b>Telephone number:</b> {customerDetails.tel}<br />
                  </p>
                  <Button color="info" size="sm" className="mb-1 mr-3" onClick={(e) => { window.open(`tel://${customerDetails.tel}`) }}><span className="simple-icon-phone" style={{ position: 'relative', top: '2px', fontSize: '15px', marginRight: '10px' }} />CALL</Button>
                  <Button color="success" size="sm" className="mb-1 mr-3" onClick={(e) => { window.open(`https://api.whatsapp.com/send?phone=971${customerDetails.tel}`, '_blank') }}><span className="simple-icon-social-skype" style={{ position: 'relative', top: '2px', fontSize: '15px', marginRight: '10px' }} />WHATSAPP</Button>
                </div>
              </CardBody>
            </Colxx>

            <Colxx xl="7" sm="12" style={{ borderRightWidth: 1 }}>
              <CardBody>
                <div className="text-left">
                  <p>
                    <b>Telephone:</b> {customerDetails.tel}<br />
                    <b>Email:</b> {customerDetails.email}<br />
                    <b>Address:</b> {customerDetails.address}<br />
                    <b>Gender:</b> {customerDetails.sex}<br />
                    <b>Date of birth:</b> {customerDetails.dob}<br />
                    <b>Customer joined:</b> {customerDetails.created}<br />
                    <b>How did you hear about us:</b> {customerDetails.source}<br />
                    <b>Referrer:</b> {referrerDetails}<br />
                  </p>
                </div>
              </CardBody>
            </Colxx>

          </Row>
        </TabPane>
      </TabContent>
    </Card>
  );
}