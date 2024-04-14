import React, {useState, useEffect} from "react";
import {Card, CardBody, FormGroup, Form} from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import { Colxx } from "../../../components/common/CustomBootstrap";
import AreaChart from "./Area";
import { chartTooltip } from './util'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeColors } from '../../../helpers/ThemeColors';
import ah from '../../../helpers/Axhelper';
import swal from 'sweetalert';

const StormSalesChart = ({ title="Report", subtitle="Line report", url="", reportLink="" }) => {

  const colors = ThemeColors();

  const [startDate, setStartDate] = useState(moment().subtract(7, 'days').format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [graphData, setGraphData] = useState({
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        label: '',
        data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        borderColor: colors.themeColor2,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor2,
        pointHoverBackgroundColor: colors.themeColor2,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 4,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor2_10
      }
    ]
  });

  const getOptions = (fromData) => {

    let calculatedMin = 0;
    let calculatedMax = Math.max(...fromData.datasets[0].data);
    let calculatedStep = Math.ceil((calculatedMax)/100)*10;
  
    let options = {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: chartTooltip,
      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
              lineWidth: 1,
              color: 'rgba(0,0,0,0.1)',
              drawBorder: false
            },
            ticks: {
              beginAtZero: true,
              stepSize: calculatedStep,
              min: calculatedMin,
              max: calculatedMax,
              padding: 20
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      }
    };

    return options;
  }

  const displayAlert = (e,message) => {
    let title = "Success!";
    let icon = "success";
    if(e) {title = "Error!"; icon = "error";}
    swal({title: title, text: message, icon: icon});
  }

  const getData = async (start,end) => {
    setLoading(true);
    let queryUrl = url+start+"/"+end;
    //console.log("getData -> start,end, queryUrl", start,end, queryUrl);
    ah.sendGet(queryUrl,async (e,res)=>{
      if(e){ displayAlert(true, e); return; }
      let newLabels = [];
      let newData = [];
      let newTotal = 0;
      
      res.map((value, i)=>{
        newLabels.push(moment(value._id).format('DD/MM')); 
        newData.push(value.count);
        newTotal += parseFloat(value.count);
        return value;
      });

      let newGraphData = graphData;
      newGraphData.datasets[0].data = newData;
      newGraphData.labels = newLabels;
      // if newTotal has decimal places make it fixed to 2 decimal places
      setTotal(parseFloat(newTotal).toFixed(2));
      setGraphData(newGraphData);
      setLoading(false);
    });
  }

  const handleChangeDate = (start,end) => {
    setStartDate(start);
    setEndDate(end);
    getData(start,end);
  }

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(()=>{
    getData(startDate,endDate);
  },[]);

  let reportElement = "";
  let finalLink = reportLink+startDate+"/"+endDate;
  reportElement = reportLink?<Link to={finalLink} target="_blank">(Report)</Link>:"";

  return (
    <Card className={`dashboard-filled-line-chart`}>
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              {title}
            </h5>
            <span className="text-muted text-medium d-block">
              {subtitle} - total: <b>{total} {reportElement}</b>
            </span>
          </div>
        </div>

      <div className="chart card-body">
        {loading? <div style={{marginTop: '60px', textAlign: 'center'}}>Loading...</div>: <AreaChart shadow data={graphData} options={getOptions(graphData)} />}
      </div>

      <Form>

        <FormGroup row className="mb-0">
          <Colxx className="ml-0 mr-0">
            <FormGroup className="mb-0">
              <DatePicker
                selected={moment(startDate)}
                name="startDate"
                onChange={(newStartDate) => { handleChangeDate(newStartDate.format("YYYY-MM-DD"), endDate) }}
                placeholderText="Start date"
                withPortal
                showYearDropdown
              />
            </FormGroup>
          </Colxx>
        </FormGroup>

        <FormGroup row className="mb-0 mt-2">
          <Colxx className="ml-0 mr-0">
            <FormGroup className="mb-0">
              <DatePicker
                selected={moment(endDate)}
                name="endDate"
                onChange={(newEndDate) => { handleChangeDate(startDate, newEndDate.format("YYYY-MM-DD")) }}
                placeholderText="End date"
                withPortal
                showYearDropdown
              />
            </FormGroup>
          </Colxx>
        </FormGroup>

      </Form>
      </CardBody>
    </Card>
  );
};

export default StormSalesChart;
