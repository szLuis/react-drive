import React from 'react'
import SecondaryOptionsTemplate from '../templates/SecondaryOptionsTemplate.rt'


class SecondaryOptions extends React.Component {

    constructor(props) {
        super(props);
    }

    onSearchAction(e) {
        const keySearch= e.currentTarget.value;
        if(this.props.onSearchAction) {
            this.props.onSearchAction(keySearch)
        }
    }

  
    render() {
        return SecondaryOptionsTemplate.apply(this)
    }   
}

SecondaryOptions.defaultProps = {
  
}

export default SecondaryOptions;