import React, { Fragment, useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import swal from 'sweetalert';
import service from '../service';

import DetailsComponent from './DetailsComponent';
import ConsumptionHistory from "./ConsumptionHistory";
import ActionsCard from "./ActionsCard";

function PackageDetailsPage(props){

  const itemId = props.match.params.id;

  const [loading, setLoading] = useState(true); 
  const [item, setItem] = useState({});

  const loadItem = async (id) => {
    setLoading(true);
    let r = await service.getItem(id);
    if (r.error){
      swal("Errror!",r.error,"error");
      return;
    }
    setItem(r.data);
    setLoading(false);
  }

  /* eslint react-hooks/exhaustive-deps: 0 */  
  useEffect(()=>{
    if (!itemId) {
      swal("Error!", "No ID", "error");
      return;
    }
    loadItem(itemId)
  },[]);

  return (
    <Fragment>
      {loading && <div className="loading" />}
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.packages" match={props.match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
          <DetailsComponent details={item} />
        </Colxx>
        <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
          <ConsumptionHistory details={item} />
        </Colxx>
        <Colxx xxs="12" md="12" xl="4" className="col-left mb-2">
          <ActionsCard details={item} refresh={()=>loadItem(itemId)} />
        </Colxx>
      </Row>
    </Fragment>
  );
}

export default PackageDetailsPage;