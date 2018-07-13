import React from 'react'
import PageToolsetTemplate from '../templates/PageToolsetTemplate.rt'

class PageToolset extends React.Component {

    constructor(props) {
        super(props);
    }

    onQuickAction() {
        if(this.props.onQuickAction) {
            this.props.onQuickAction()
        }
    }

    render() {
        return PageToolsetTemplate.apply(this)
    }   
}

PageToolset.defaultProps = {
    showQuick: true,
    showFull: true
}

export default PageToolset;