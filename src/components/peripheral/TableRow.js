import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    remove = () => {
        if (window.confirm('Are you sure you want to remove?')) {
            axios.get('http://localhost:4000/peripheral/delete/' + this.props.obj._id)
                .then(res => {
                    toast.success("Success Deleted !", {
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: true
                    });
                    this.props.parent.componentDidMount();
                    console.log(res)
                })
                .catch(err => toast.error(err.toString(), {
                    hideProgressBar: true
                }));
        }
    };

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.uid}
                </td>
                <td>
                    {this.props.obj.vendor}
                </td>
                <td>
                    {this.props.obj.date}
                </td>
                <td>
                    {true === this.props.obj.status ? "Online" : "Offline"}
                </td>
                <td>
                    <Link to={"/peripheral/edit/" + this.props.obj._id} rel="tooltip" title="Details"
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