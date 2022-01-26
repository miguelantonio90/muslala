import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.state = {
            show: false
        };
    }

    remove = () => {
        if (window.confirm('Are you sure you want to remove?')) {
            axios.get('http://localhost:4000/gateway/delete/' + this.props.obj._id)
                .then(res => {
                    toast.success("Success Deleted !", {
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: true
                    });
                    this.props.parent.componentDidMount();
                    console.log(res);
                })
                .catch(err => toast.error(err.toString(), {
                    hideProgressBar: true
                }))
        }

    };

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.serial}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.ipaddress}
                </td>
                <td>
                    <Link to={"/gateway/details/" + this.props.obj._id} rel="tooltip" title="Details"
                          className="btn btn-sm btn-info fa fa-info"/>
                </td>
                <td>
                    <Link to={"/gateway/edit/" + this.props.obj._id} rel="tooltip" title="Edit"
                          className="btn btn-sm btn-primary fa fa-edit"/>
                </td>
                <td>
                    <button onClick={this.remove} rel="tooltip" title="Remove"
                            className="btn btn-sm btn-danger fa fa-minus"/>
                </td>
            </tr>
        );
    }
}

export default TableRow;