// TODO: add filtering in the style of todo list app in gogo
import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import Invoices2Header from "./invoices2-main-header";
import Invoices2List from "./invoices2-main-list";
import Invoices2Model from './invoices2-model';
import SettingsClass from "../../../helpers/SettingsClass";

export default class PackageListPage extends Component {

  constructor(props) {
    super(props);
    this.Invoices2 = new  Invoices2Model(async (newState) => { await this.setState(newState); return this.state; });
    let orderOptions = this.Invoices2.orderOptions;
    let selectedOrderOption = this.Invoices2.selectedOrderOption;

    this.state = {
      modalOpen: false,
      loading: true,
      orderOptions,
      selectedOrderOption,
      limit: 50,
      searchString: "",
      currentUrl: this.Invoices2.allUrl
    };

    SettingsClass.getSettings((e, settings) => {
      // console.log("Settings fetched:", settings);
      this.setState({settings});
    });

  }

  handleOrderChange = (column, lbl) => {
    this.Invoices2.handleOrderChange(this.state,column,lbl);
  }

  handleSearchChange = (searchString) => {
    this.Invoices2.handleSearchChange(this.state, searchString);
  }

  render() {
    return (
      <Fragment>
        <Invoices2Header 
          heading="Invoices2 list" 
          orderOptions={this.state.orderOptions}
          selectedOrderOption={this.state.selectedOrderOption}
          handleOrderChange={this.handleOrderChange}
          handleSearchChange={this.handleSearchChange}
          match={this.props.match}
        />
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Invoices2List settings={this.state.settings} currentUrl={this.state.currentUrl} onLoadMore={() => this.Invoices2.handleLoadMore(this.state)}/>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}