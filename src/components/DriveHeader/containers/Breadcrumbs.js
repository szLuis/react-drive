import React from 'react'
import BreadcrumbsTemplate from '../templates/BreadcrumbsTemplate.rt'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Breadcrumbs extends React.Component {

    render() {
        return BreadcrumbsTemplate.apply(this)
    }   
}

export default Breadcrumbs;