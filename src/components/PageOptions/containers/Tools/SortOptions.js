import React from 'react'
import SortOptionsTemplate from '../../templates/Tools/SortOptionsTemplate.rt'

class SortOptions extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initEvents();
    }

    componentDidUpdate(prevProps, prevState) {
        this.initEvents();
    }

    initEvents() {
        $('.sorting-field').select2({
            "minimumResultsForSearch": Infinity
        }).off("change").on("change", this.sortItems.bind(this, this.props.sortingConfig.type ? this.props.sortingConfig.type : 'asc' ))
    }

    sortItems(type) {
        let sortby = this.refs["sortby"].value;
      
        if(sortby && type && this.props.sortItems) {
            this.props.sortItems(type, sortby);
        }
    }

    render() {
        return SortOptionsTemplate.apply(this)
    }   
}

SortOptions.defaultProps = {
 
}

export default SortOptions;