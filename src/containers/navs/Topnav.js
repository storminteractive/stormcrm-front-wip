import React, { Component } from "react";
import { injectIntl } from "react-intl";
import axios from 'axios';
import appConstant from '../../constants';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
} from "../../redux/actions";

import {
  menuHiddenBreakpoint,
  searchPath,
  isDarkSwitchActive
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";
import TopnavNotifications from "./Topnav.Notifications";
import TopnavDarkSwitch from "./Topnav.DarkSwitch";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: "",
      isLogged: true,
      name: "..."
    };
    this.checkLogin();
  }


  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch = () => {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  };
  removeEventsSearch = () => {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  };
  handleSearchInputChange = e => {
    this.setState({
      searchKeyword: e.target.value
    });
  };
  handleSearchInputKeyPress = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    this.setState({
      searchKeyword: ""
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    let url = appConstant.logout;
    //console.log(`Topnav -> handleLogout -> url`, url);

    axios.get(url,{ withCredentials: true }).then(
        (resp) => {
          //console.log(`Topnav -> handleLogout -> resp`, resp);
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          localStorage.removeItem('userid');
          localStorage.removeItem('isAdmin');
          this.setState({isLogged: false});
        },
      );
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  checkLogin = ()=>{
    let url = appConstant.checkAuth;
    //console.log(`Topnav -> checkLogin -> url`, url);

    axios.get(url,{ withCredentials: true }).then(
        (resp) => {
          //console.log(`TCL: App -> checkLogin -> resp`, resp);
          this.setState({isLogged: true, name: resp.data.name});
          localStorage.setItem('userid',resp.data.userid);
          localStorage.setItem('name',resp.data.name);
          localStorage.setItem('email',resp.data.email);
          localStorage.setItem('isAdmin',resp.data.isAdmin);
        },
        (error) => {
          //console.log(`TCL: App -> checkLogin -> error`, error);
          this.setState({isLogged: false});
        }
      );
  }

  render() {
    const { containerClassnames, menuClickCount } = this.props;

    if (!this.state.isLogged) { return <Redirect to="/user/login" />; }
    else return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={e =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>

        </div>
        <a className="navbar-logo" href="/">
          {/* <span className="logo d-none d-xs-block" /> */}
          <span className="logo-mobile d-block d-xs-none" />
        </a>

        <div className="navbar-right">
          {isDarkSwitchActive && <TopnavDarkSwitch/>}
          <div className="header-icons d-inline-block align-middle">
            <TopnavNotifications />
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">{this.state.name}</span>                
                <span>
                  <i className="small-icon initial-height iconsminds-male-female"></i>
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <NavLink to="/app/change-password"><DropdownItem>Change password</DropdownItem></NavLink>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    { setContainerClassnames, clickOnMobileMenu, logoutUser }
  )(TopNav)
);
