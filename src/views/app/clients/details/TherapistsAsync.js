import React, { Component } from "react";
import { Async } from "react-select";
import appConstant from '../../../../constants';
import ah from '../../../../helpers/Axhelper';
import swal from 'sweetalert';

export default class TherapistsAsync extends Component {

    initUrl = appConstant.baseUrl + "users/all/";
    searchUrl = appConstant.baseUrl + "users/search/";
    detailsUrl = appConstant.baseUrl + "users/details/";

    constructor(props) {
        super(props);
        this.state = {
            selectedtherapist: '',
            defaultOptions: []
        }
        this.initialTherapists();
    }

    componentDidMount = () => {
        let therapistId = this.props.therapistId;
        console.log(`TherapistsAsync -> componentDidMount -> therapistId`, therapistId);
        if (therapistId) this.loadTherapistById(therapistId);
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.therapistId !== this.props.therapistId){
            let therapistId = this.props.therapistId;
            console.log(`TherapistsAsync -> componentDidUpdate -> therapistId`, therapistId);
            if (therapistId) this.loadTherapistById(therapistId);    
        }
    }

    displayAlert(e,message){
        let title = "Success!";
        let icon = "success";
        if(e) {title = "Error!"; icon = "error";}
        swal({title: title, text: message, icon: icon});
      }

    initialTherapists = () => {
        const url = this.initUrl;
        ah.sendGet(url, (e, res) => {
            console.log(`TCL: TherapistsAsync -> initialTherapists -> url,e,res`, url, e, res);
            let options = [];
            res.map((therapist) => {
                options.push({ label: therapist.name, value: therapist._id });
                return therapist;
            })
            this.setState({ defaultOptions: options });
        });
    }

    loadTherapistById = (id) => {
        let url = this.detailsUrl+id;
        ah.sendGet(url, (e, res) => {
            console.log(`TCL: TherapistsAsync -> loadTherapistById -> url,e,res`, url, e, res);
            if (e) { this.displayAlert(true, e); return; }
            this.setState({ selectedtherapist: {'label': res.name, 'value': res._id }});
        });
    }

    searchTherapists = (search, cb) => {
        const url = this.searchUrl + search;
        if (search.length < 3) cb([]);

        ah.sendGet(url, (e, res) => {
            console.log(`TCL: TherapistsAsync -> searchTherapists -> url,e,res`, url, e, res);
            let options = [];
            res.map((therapist) => {
                options.push({ label: therapist.name, value: therapist._id });
                return therapist;
            })
            cb(options);
        });
    }


    handletherapistChange = (selectedtherapist) => {
        console.log("TherapistsAsync -> handletherapistChange -> selectedtherapist", selectedtherapist);
        this.setState({ selectedtherapist });
        this.props.therapistChange(selectedtherapist.value);
    }

    render() {
        return (
            <Async
                cacheOptions
                loadOptions={this.searchTherapists}
                defaultOptions={this.state.defaultOptions}
                value={this.state.selectedtherapist}
                onChange={this.handletherapistChange}
                placeholder="Select therapist"
            //onInputChange={this.handletherapistInputChange}
            />
        )
    }
}