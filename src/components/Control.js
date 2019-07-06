import React, { Component } from 'react';
import Search from'./../components/Search';
import Sort from'./../components/Sort';


class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                {/* Search */}
                <Search></Search>
                {/* Sort */}
                <Sort></Sort>
            </div>
        );
    }
}
export default Control;