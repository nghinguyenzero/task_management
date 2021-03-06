import React, { Component } from 'react';
import Search from './../components/Search';
import Sort from './../components/Sort';

export default class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                {/* Search */}
                <Search
                    onSearch={this.props.onSearch}
                ></Search>
                {/* Sort */}
                <Sort
                    onSort={this.props.onSort}
                    sortBy={this.props.sortBy}
                    sortValue={this.props.sortValue}
                ></Sort>
            </div>
        );
    }
}