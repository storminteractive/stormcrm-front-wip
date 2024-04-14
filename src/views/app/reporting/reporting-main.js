import React, {Fragment} from 'react'
import { Row } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import ReportingHeader from "./reporting-main-header";
import StormLineChart from './StormLineChart';
import appConstant from '../../../constants';

export default function ReportingMain(props) {
    return (
      <Fragment>
        <ReportingHeader heading="Reporting list" match={props.match}/>
        <Row>
          <Colxx sm="12" md="6" className="mb-4">
            <StormLineChart title={`New leads`} subtitle={`Leads per day`} url={appConstant.baseUrl+"reporting/leadsdailycount/"}/>
          </Colxx>
          <Colxx sm="12" md="6" className="mb-4">
            <StormLineChart title={`New bookings`} subtitle={`Bookings created on date`} url={appConstant.baseUrl+"reporting/bookingsdailycount/"}/>
          </Colxx>
          <Colxx sm="12" md="6" className="mb-4">
            <StormLineChart title={`Sales`} subtitle={`Sales total per date`} url={appConstant.baseUrl+"reporting/salesdailycount/"}/>
          </Colxx>
          <Colxx sm="12" md="6" className="mb-4">
            <StormLineChart title={`Sales tax`} subtitle={`Sales tax total per date`} url={appConstant.baseUrl+"reporting/salestaxtotal/"} reportLink={appConstant.baseUrl+"reporting/salestaxreport/"}/>
          </Colxx>
          <Colxx sm="12" md="6" className="mb-4">
            <StormLineChart title={`New customers`} subtitle={`Customers joining on date`} url={appConstant.baseUrl+"reporting/customersdailycount/"}/>
          </Colxx>
          <Colxx sm="12" md="6" className="mb-4">
            <StormLineChart title={`New members`} subtitle={`Memberships created on date`} url={appConstant.baseUrl+"reporting/membershipsdailycount/"}/>
          </Colxx>

          <Colxx sm="12" md="6" className="mb-4">
            <StormLineChart title={`Expenses Total`} subtitle={`Expenses between dates`} url={appConstant.baseUrl+"reporting/expensestotal/"} reportLink={appConstant.baseUrl+"reporting/expensesreport/"}/>
          </Colxx>

          <Colxx sm="12" md="6" className="mb-4">
            <StormLineChart title={`Expenses Tax`} subtitle={`Tax total between dates`} url={appConstant.baseUrl+"reporting/expensestaxtotal/"} reportLink={appConstant.baseUrl+"reporting/expensestaxreport/"}/>
          </Colxx>

          <Colxx sm="12" md="6" className="mb-4">
            <StormLineChart title={`Cancelled appointments`} subtitle={`Cancelled appointments summary`} url={appConstant.baseUrl+"reporting/cancelledbookingstotal/"} reportLink={appConstant.baseUrl+"reporting/cancelledbookingsreport/"}/>
          </Colxx>

        </Row>
      </Fragment>
    )
}