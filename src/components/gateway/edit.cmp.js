import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import {toast} from "react-toastify";

export default class EditPeripheral extends Component {
    constructor(props) {
        super(props);
        this.onChangeSerialNumber = this.onChangeSerialNumber.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeIpAddres = this.onChangeIpAddres.bind(this);
        this.onChangePeripheral = this.onChangePeripheral.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            serial: '',
            name: '',
            ipaddress: '',
            peripheral: [],
            options: []
        };
    }

    componentDidMount = () => {
        axios.get('http://localhost:4000/gateway/findBy/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    serial: response.data.serial,
                    name: response.data.name,
                    ipaddress: response.data.ipaddress,
                    peripheral: response.data.peripheral
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('http://localhost:4000/peripheral')
            .then(response => {
                this.setState({options: response.data});

            })
            .catch(function (error) {
                console.log(error);
            })
    };

    onChangeSerialNumber = (event) => {
        this.setState({
            serial: event.target.value
        });

    };

    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    };

    onChangeIpAddres = (event) => {
        this.setState({
            ipaddress: event.target.value
        })
    };

    onChangePeripheral = (event) => {
        this.setState({
            peripheral: event
        })

    };

    onSubmit = (event) => {
        event.preventDefault();
        const obj = {
            serial: this.state.serial,
            name: this.state.name,
            ipaddress: this.state.ipaddress,
            peripheral: this.state.peripheral
        };
        axios.post('http://localhost:4000/gateway/update/' + this.props.match.params.id, obj)
            .then(res => {
                console.log(res.data);
                toast.success("Success Update !", {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true
                });
                this.props.history.push('/gateway/listing');
            })
            .catch(function (e) {
                toast.error(e.toString(), {
                    hideProgressBar: true
                });
            });


    };

    render() {
        let options = this.state.options;
        let optionItems = [];
        for (let i = 0; i < options.length; i++) {
            optionItems.push({
                value: options[i]._id,
                label: options[i].vendor
            })
        }
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">Edit Gateway</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Serial Number: </label>
                        <input
                            type="text"
                            required={true}
                            className="form-control"
                            value={this.state.serial}
                            onChange={this.onChangeSerialNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gateway Name: </label>
                        <input type="text"
                               className="form-control"
                               required={true}
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>IP Address: </label>
                        <input type="text"
                               className="form-control"
                               required={true}
                               maxLength="15"
                               value={this.state.ipaddress}
                               onChange={this.onChangeIpAddres}
                        />
                    </div>
                    <div className="form-group">
                        <label>Peripheral: </label>
                        <Select value={this.state.peripheral} options={optionItems}
                                onChange={this.onChangePeripheral} isMulti/>

                    </div>
                    <div className="form-group">
                        <div layout="row">
                            <button type="submit" value="Register" className="btn btn-primary fa fa-save"> Save</button>
                            <Link style={{marginLeft: 5}} to={"/gateway/listing"} className="btn btn-dark fa fa-close">
                                Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}