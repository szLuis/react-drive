import React, { Component } from 'react';
import ToggleableDriveContextualMenu from './containers/ToggleableDriveContextualMenu';
import ToggleableForm from './containers/ToggleableForm';
import FolderForm from './containers/FolderForm';

class DriveHeader extends Component{
    constructor(props){
        super(props);


    }
    render(){
        return(<div>
            <ToggleableDriveContextualMenu isOpen="true"/>
            <ToggleableForm onFormSubmit={this.props.onFormSubmit} />
            </div>
        )
    }
}

export default DriveHeader;