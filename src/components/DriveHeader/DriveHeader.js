import React, { Component } from 'react';
// import ToggleableDriveContextualMenu from './containers/ToggleableDriveContextualMenu';
import ToggleableForm from './containers/ToggleableForm';

class DriveHeader extends Component{
    render(){
        return(<div className="row">
                <div className="col-md-12">
                    {/* <ToggleableDriveContextualMenu isOpen="true"/> */}
                        <ToggleableForm showMsgFolderCreated={this.props.showMsgFolderCreated} onFormSubmit={this.props.onFormSubmit} />
                    </div>
            </div>
        )
    }
}


export default DriveHeader;