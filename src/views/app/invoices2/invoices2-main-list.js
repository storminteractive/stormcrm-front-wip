import React, { Component, Fragment } from "react";
import { Row, Button } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import Invoices2Model from './invoices2-model'
import Invoices2ListItem from './invoices2-main-list-item'

export default class Invoices2Box extends Component {

  constructor(props) {
    super();
    this.state = {
      loading: "Loading...",
      currentUrl: props.currentUrl,
      items: []
    }
    this.Invoices2 = new Invoices2Model(async (newState) => { await this.setState(newState); return this.state; });
  }

  getItems = () => {
    this.Invoices2.getItems(this.state.currentUrl);
  }

  componentDidMount = () => {
    this.Invoices2.getItems(this.state.currentUrl);
    //this.Invoices2.getStats();
  }

  componentDidUpdate() {
    if (this.state.currentUrl !== this.props.currentUrl) {
      this.setState({ currentUrl: this.props.currentUrl }, this.getItems);
    }
  }

  render() {
    let button = <Button color="primary" block className="mb-2" onClick={() => this.props.onLoadMore()}>Load more</Button>;
    let currencySymbol = this.props.settings? this.props.settings.currencySymbol: null;
    return (
      <Fragment>
        <Row>
          { this.state.loading? (<div className="loading" style={{ fontSize: 15 }}/>):null }
          <Colxx>
            {(this.state.items[0]) && this.state.items.map((item, index) => {
              return <Invoices2ListItem key={`item_${index}`} {...item} currencySymbol={currencySymbol} />;
            })}
          </Colxx>
          {button}
        </Row>
      </Fragment>
    );
  }
}

