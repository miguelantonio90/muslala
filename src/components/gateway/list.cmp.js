import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TableRow from './TableRow';

export default class ListGateway extends Component {
    constructor(props) {
        super(props);
        this.state = {gateway: [], peripheral: []};
    }

    componentDidMount = () => {
        axios.get('http://localhost:4000/gateway')
            .then(response => {
                this.setState({gateway: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })


    };

    tabRow = () => {
        let parent = this;
        return this.state.gateway.map(function (object, i) {
            return <TableRow obj={object} key={i} parent={parent}/>;
        });
    };

    render() {
        return (
            <div style={{marginTop: 10}} className="content table-responsive table-full-width">
                <h3 align="center">Gateway List</h3>
                <Link to={'/gateway/create'} className="btn btn-primary fa fa-plus"> Create</Link>
                <table className="table table-hover" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Name</th>
                        <th>IP Adress</th>
                        <th colSpan="3">Action</th>
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


