import React from 'react'
import ViewSwitcherTemplate from '../../templates/Tools/ViewSwitcherTemplate.rt'

class ViewSwitcher extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return ViewSwitcherTemplate.apply(this)
    }   
}

ViewSwitcher.defaultProps = {
 
}

export default ViewSwitcher;