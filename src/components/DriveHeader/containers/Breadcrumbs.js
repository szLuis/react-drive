import React from 'react'
import BreadcrumbsTemplate from '../templates/BreadcrumbsTemplate.rt'

class Breadcrumbs extends React.Component {

    handleBreadcrumbClick = (e) => {
        this.props.onBreadcrumbClick(e.target.id)
    }

    render() {
        return BreadcrumbsTemplate.apply(this)
    }   
}

export default Breadcrumbs;