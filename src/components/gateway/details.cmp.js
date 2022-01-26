import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class DetailsGateway extends Component {
    constructor(props) {
        super(props);
        this.state = {gateway: []};
    }

    componentDidMount = () => {
        axios.get('http://localhost:4000/gateway/findBy/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    serial: response.data.serial,
                    name: response.data.name,
                    ipaddress: response.data.ipaddress,
                    peripheral: response.data.peripheral
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    tabRow = () => {
        if (this.state.peripheral) {
            return this.state.peripheral.map(function (obj, i) {
                return <tr key={i}>
                    <td align="center">{obj.label}
                    </td>
                </tr>

            })

        }
    };

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3 align="center">Details</h3>
                <div className="row">
                    <div className="col-md-6">
                        <p><b> Serial Number: </b> {this.state.serial}</p>
                        <p><b> Name: </b> {this.state.name}</p>
                        <p><b> IP Address: </b> {this.state.ipaddress}</p>
                    </div>
                    <div className="col-md-6">
                        <h4 align="center">Peripheral Device</h4>
                        <table className="table table-hover">
                            <thead align="center">
                            <tr>
                                <th>Vendor</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.tabRow()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Link to={"/gateway/listing"} className="btn btn-dark fa fa-close"> Close</Link>
            </div>
        )
    }
}