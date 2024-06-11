import React, { useState } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import swal from 'sweetalert';
import ProductsAsync from '../../../../containers/ProductsAsync';
import service from '../service';

const ActionsCard = props => {

  const [productToConsume, setProductToConsume] = useState({ label: '', value: '' });

  if (!props.details) {
    return (<div className="loading" />)
  } else {

    const handleConsume = (e) => {

      if ((!productToConsume.value) || (!productToConsume.label)) {
        swal("Error!", "Please select a product!", "error");
        return;
      }

      swal({
        title: "Are you sure?",
        text: "You are about to consume a product from this package!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (proceed) => {
        if (proceed) {
          let id = props.details._id;
          let productName = productToConsume.label;

          let r = await service.consumeItem(id,productName);
          if(r.error){
            swal("Error", r.error, "error");
            return;
          }

          swal("Success", "Voucher successfully consumed", "success"); 
          setProductToConsume({ label: '', value: '' });
          props.refresh();
        }
      });
    }

    const handleDelete = (e) => {
      swal({
        title: `Delete warning`,
        text: `Are you sure you want to proceed with delete?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
          if (willDelete) {
            props.deleteItem(props.details._id);
          }
        });
    }

    let displayConsume = parseInt(props.details.remainingUsage) > 0 ? 'block' : 'none';
    let classConsume = parseInt(props.details.remainingUsage) > 0 ? 'd-flex flex-row align-items-center mb-3' : '';

    if (props.details.expiry) {
      if (moment(props.details.expiry).isBefore(moment())) {
        displayConsume = 'none';
        classConsume = '';
      }
    }

    return (

      <Card className="mb-4" style={{ minHeight: '320px' }}>
        <CardBody>
          <CardTitle>
            <b>Package options</b>
          </CardTitle>

          <div id="consumeInfo" style={{ display: displayConsume, marginTop: '20px', marginBottom: '20px' }}>
            <ProductsAsync
              onChange={(p) => setProductToConsume(p)}
              selectedId={productToConsume.value}
            />
          </div>

          <div id="consume" className={classConsume} style={{ display: displayConsume }}>
            <NavLink to="#" onClick={(e) => handleConsume(e)}>
              <i className="large-icon initial-height simple-icon-minus"></i>
            </NavLink>
            <div className="pl-3 pt-2 pr-2 pb-2">
              <NavLink to="#" onClick={(e) => handleConsume(e)}>
                <p className="list-item-heading mb-1">Consume package</p>
              </NavLink>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-3" style={{ height: '100%' }}>
            <NavLink to="#" onClick={() => handleDelete()}>
              <i className="large-icon initial-height simple-icon-trash"></i>
            </NavLink>
            <div className="pl-3 pt-2 pr-2 pb-2">
              <NavLink to="#" onClick={() => handleDelete()}>
                <p className="list-item-heading mb-1" style={{ color: "red", fontWeight: "bold" }}>
                  Delete Package
                </p>
              </NavLink>
            </div>
          </div>
        </CardBody>
      </Card>

    )
  }
}

export default ActionsCard