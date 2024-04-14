import React, { Component } from "react";
import { UncontrolledDropdown, DropdownToggle } from "reactstrap";
// import { DropdownMenu } from "reactstrap";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import NotificationsModel from "../../views/app/notifications/NotificationsModel";
import swal from 'sweetalert';

//import notifications from "../../data/notifications";


// class NotificationItem extends Component {

//   render() {
//     let birthdayImg = <img src="/assets/img/birthday.jpg" alt="Birthday cake" className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle" />
//     let alarmImg = <img src="/assets/img/alarm.jpg" alt="Alarm clock" className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle" />
//     let img = birthdayImg;
    
//     switch(this.props.type){
//       case "birthday":
//         img = birthdayImg;
//         break;
//       case "reminder":
//         img = alarmImg;
//         break;
//       default:
//         img = birthdayImg;
//     }

//     return (
//       <div className="d-flex flex-row mb-3 pb-3 border-bottom">
//         <a href="/app/notifications">
//           {img}
//         </a>
//         <div className="pl-3 pr-2">
//           <a href="/app/notifications">
//             <p className="font-weight-medium mb-1">{this.props.txt}</p>
//           </a>
//         </div>
//       </div>
//     );
//   }

// };

// const EmptyNotifications = () => {
//   return (
//     <div className="d-flex flex-row mb-3 pb-3 border-bottom">
//       <img
//         src='/assets/img/placeholder.jpg'
//         alt='No notifications'
//         className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
//       />
//       <div className="pl-3 pr-2">
//         <p className="font-weight-medium mb-1">No new notifications</p>
//       </div>
//     </div>
//   );
// };

class TopnavNotifications extends Component {

  constructor(props) {
    super();
    this.state = {
      items: [],
      showEmpty: true
    };
    // this.Notification = new NotificationsModel(async (newState) => { await this.setState(newState); return this.state; });
  }

  componentDidMount = () => {
    // this.Notification.last5noack();
  }

  informAndLog = () => {
    swal({
      title: "Unactioned notifications",
      text: "There are unactioned notifications (user notified already X times)",
      icon: "warning",
      dangerMode: true,
    });
  }

  render() {
    
    //this.informAndLog();

    return (
      <div className="position-relative d-inline-block">
        <UncontrolledDropdown className="dropdown-menu-right">
          <DropdownToggle className="header-icon notificationButton" color="empty">
            <i className="simple-icon-bell" />
            <span className="count">{this.state.items.length}</span>
          </DropdownToggle>
          {/*<DropdownMenu className="position-absolute mt-3 scroll" right id="notificationDropdown">
             <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
              {this.state.items.map((notification, index) => { return <NotificationItem key={index} {...notification} />; })}
              { this.state.showEmpty && <EmptyNotifications /> }
            </PerfectScrollbar> 
          </DropdownMenu>
          */}
        </UncontrolledDropdown>
      </div>
    )
  }
};

export default TopnavNotifications;
