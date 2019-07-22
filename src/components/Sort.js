import React, { Component } from 'react';

export default class Sort extends Component {

    onCLick = (sortBy, sortValue) => this.props.onSort(sortBy, sortValue)

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    > Sort <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onCLick('name', 1)}>
                            <a role="button" 
                                className={(this.props.sortBy === 'name' && this.props.sortValue === 1) ? 'sort_selected' : ''}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5"> A-Z</span>
                            </a>
                        </li>
                        <li onClick={() => this.onCLick('name', -1)}>
                            <a role="button" 
                                className={(this.props.sortBy === 'name' && this.props.sortValue === -1) ? 'sort_selected' : ''}
                            >
                                <span className="fa fa-sort-alpha-desc pr-5">Z-A</span>
                            </a>
                        </li>
                        <li role="separator" className="divider">
                        </li>
                        <li onClick={() => this.onCLick('status', 1)} >
                            <a role="button" 
                                className={(this.props.sortBy === 'status' && this.props.sortValue === 1) ? 'sort_selected' : ''}
                            >
                                Status: Active
                                </a>
                        </li>
                        <li onClick={() => this.onCLick('status', -1)} >
                            <a role="button" 
                                className={(this.props.sortBy === 'status' && this.props.sortValue === -1) ? 'sort_selected' : ''}
                            >
                                Status: Hide
                                </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
