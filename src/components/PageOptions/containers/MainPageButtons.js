import React from 'react'
import MainPageButtonsTemplate from '../templates/MainPageButtonsTemplate.rt'

class MainPageButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    onQuickAction() {
        if(this.props.onQuickAction) {
            this.props.onQuickAction()
        }
    }

    onBulkAction() {
        if(this.props.onBulkAction) {
            this.props.onBulkAction()
        }
    }

    render() {
        return MainPageButtonsTemplate.apply(this)
    }   
}

MainPageButtons.defaultProps = {
    showQuick: true,
    showFull: true,
    showBulk: true,
    disableTurboLinks: false
}

export default MainPageButtons;