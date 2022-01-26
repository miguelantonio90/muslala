import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TableRow from './TableRow';

export default class ListPeripheral extends Component {
    constructor(props) {
        super(props);
        this.state = {peripheral: []};
    }

    componentDidMount = () => {
        axios.get('http://localhost:4000/peripheral')
            .then(response => {
                this.setState({peripheral: response.data});

            })
            .catch(function (error) {
                console.log(error);
            })
    };

    tabRow = () => {
        let parent = this;
        return this.state.peripheral.map(function (object, i) {
            return <TableRow obj={object} key={i} parent={parent}/>;
        });
    };

    render() {
        return (
            <div style={{marginTop: 10}} className="content table-responsive table-full-width">
                <h3 align="center">Peripheral List</h3>
                <Link to={'/peripheral/create'} className="btn btn-primary fa fa-plus"> Create</Link>
                <table className="table table-hover" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>UID</th>
                        <th>Vendor</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}