import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import axios from 'axios';
import {toast} from "react-toastify";

export default class CreatePeripheral extends Component {
    constructor(props) {
        super(props);
        this.onChangeUID = this.onChangeUID.bind(this);
        this.onChangeVendor = this.onChangeVendor.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            uid: '',
            vendor: '',
            date: new Date(),
            status: 0
        };
    }

    onChangeUID = event => {
        this.setState({
            uid: event.target.value
        });
    };
    onChangeVendor = event => {
        this.setState({
            vendor: event.target.value
        });
    };
    onChangeDate = event => {
        this.setState({
            date: event
        });
    };
    onChangeStatus = event => {
        this.setState({
            status: event.value
        });
    };
    onSubmit = event => {
        event.preventDefault();
        const obj = {
            uid: this.state.uid,
            vendor: this.state.vendor,
            date: this.state.date,
            status: this.state.status
        };
        axios.post('http://localhost:4000/peripheral/create', obj)
            .then(res => {
                console.log(res.data);
                toast.success("Success Create !", {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true
                });
                this.setState({
                    uid: '',
                    vendor: '',
                    date: new Date(),
                    status: ''
                })
            })
            .catch(function (error) {
                toast.error(error.toString(), {
                    hideProgressBar: true
                });
            });
    };

    render() {
        let optionItems = [
            {label: "Online", value: 1},
            {label: "Offline", value: 0},

        ];
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">New Peripheral</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>UID: </label>
                        <input
                            type="Number"
                            className="form-control"
                            required={true}
                            value={this.state.uid}
                            onChange={this.onChangeUID}
                        />
                    </div>
                    <div className="form-group">
                        <label>Vendor: </label>
                        <input
                            type="text"
                            className="form-control"
                            required={true}
                            value={this.state.vendor}
                            onChange={this.onChangeVendor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            name="startDate"
                            dateFormat="MM/dd/yyyy" dropdownMode="select"/>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label>Status: </label>
                            <Select options={optionItems} onChange={this.onChangeStatus}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-group">
                            <div layout="row">
                                <button type="submit" className="btn btn-primary fa fa-save"> Save</button>
                                <Link style={{marginLeft: 5}} to={"/peripheral/listing"}
                                      className="btn btn-dark fa fa-close"> Cancel</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}