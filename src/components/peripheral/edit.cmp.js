import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {toast} from "react-toastify";

export default class EditPeripheral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            vendor: '',
            date: new Date(),
            status: 0
        };

        this.onChangeUID = this.onChangeUID.bind(this);
        this.onChangeVendor = this.onChangeVendor.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    componentDidMount = () => {
        axios.get('http://localhost:4000/peripheral/findBy/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    uid: response.data.uid,
                    vendor: response.data.vendor,
                    date: new Date(response.data.date),
                    status: response.data.status
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    };

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
        axios.post('http://localhost:4000/peripheral/update/' + this.props.match.params.id, obj)

            .then(res => {
                console.log(res.data);
                toast.success("Success Update !", {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true
                });
                this.props.history.push('/peripheral/listing');
            })
            .catch(function (error) {
                toast.error(error.toString(), {
                    hideProgressBar: true
                });
            });


    };

    render() {
        let options = [
            {label: "Online", value: 1},
            {label: "Offline", value: 0},
        ];
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">Edit Peripheral</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>UID: </label>
                        <input
                            type="Number"
                            className="form-control"
                            value={this.state.uid}
                            onChange={this.onChangeUID}
                        />
                    </div>
                    <div className="form-group">
                        <label>Vendor: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.vendor}
                            onChange={this.onChangeVendor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            dateFormat="DD/MM/YYYY" dropdownMode="select"/>
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <Select options={options} onChange={this.onChangeStatus}/>
                    </div>

                    <div className="form-group">
                        <div layout="row">
                            <button type="submit" value="Register" className="btn btn-primary fa fa-save"> Save</button>
                            <Link style={{marginLeft: 5}} to={"/peripheral/listing"}
                                  className="btn btn-dark fa fa-close"> Cancel</Link>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}