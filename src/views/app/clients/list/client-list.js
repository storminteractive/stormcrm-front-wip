import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";

//import ClientPageHeading from "../../../containers/pages/ClientPageHeading";
import ClientPageHeading from "./ClientPageHeading";
import ClientList from "./client-list-box";
import appConstant from '../../../../constants';


export default class ClientListPage extends Component {

  constructor(props) {
    super(props);

    let initialLimit = 50;

    this.state = {
      modalOpen: false,
      loadingMsg: "Loading...",
      orders: [],
      orderOptions: [
        { value: "name", label: "Name" },
        { value: "created", label: "Registration date" },
      ],
      orderDirectionOptions: [
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" }
      ],
      selectedOrderOption: { value: "created", label: "Registration date", order: "desc" },
      selectedOrderDirection: { label: "Descending", value: "desc"},
      searchField: "",
      getUrl: appConstant.customer + `all?sortcol=created&sortdir=desc&limit=${initialLimit}`,
      limit: initialLimit,
      urls: {
        main: appConstant.customerAll,
        search: appConstant.customerSearch
      }
    };
    
  }

  changeOrder = (col, lbl) => {
    let newOrder = this.state.selectedOrderOption.order;
    // If clicking same column as currently selected inverting from asc to desc and desc to asc
    if(col===this.state.selectedOrderOption.column){
      newOrder = this.state.selectedOrderOption.order==="desc"?"asc":"desc";
    }
    console.log(`ClientListPage -> changeOrder col ${col} lbl ${lbl} order ${newOrder}`);
    this.setState({selectedOrderOption: {column: col, label: lbl, order: newOrder}},this.updateGetUrl);
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  updateGetUrl(){
    let newGetUrl = (this.state.searchField.length>=3) ? 
      this.state.urls.search.concat(encodeURIComponent(this.state.searchField)).concat(`?sortcol=${this.state.selectedOrderOption.column}&sortdir=${this.state.selectedOrderOption.order}&limit=${this.state.limit}`) : 
      this.state.urls.main.concat(`?sortcol=${this.state.selectedOrderOption.column}&sortdir=${this.state.selectedOrderOption.order}&limit=${this.state.limit}`);

    console.log(`ClientListPage -> updateGetUrl -> newGetUrl`, newGetUrl);
    this.setState({getUrl: newGetUrl});    
  }

  onSearchKey = (e) =>{ this.setState({searchField: e.target.value},this.updateGetUrl); }

  onLoadMore = async (e) => { 
    let newLimit = this.state.limit + 50; 
    console.log(`file: client-list -> ClientListPage -> onLoadMore -> newLimit`, newLimit);
    await this.setState({limit: newLimit});
    this.updateGetUrl();
  }
  

  render() {
    const match = this.props.match;
    
    return (
      <Fragment>

        <ClientPageHeading
          heading="Clients"
          orderOptions={this.state.orderOptions}
          orderDirectionOptions={this.state.orderDirectionOptions}
          selectedOrderOption={this.state.selectedOrderOption}
          selectedOrderDirection={this.state.selectedOrderDirection}
          changeOrder={this.changeOrder}
          onSearchKey={this.onSearchKey}
          match={match}
        />
        <Row>
          <Colxx xxs="12" className="mb-4">
            <ClientList getUrl={this.state.getUrl} onLoadMore={this.onLoadMore} />
          </Colxx>
        </Row>

      </Fragment>
    )
  }
}