import React, { Component } from 'react';
// import ToggleableDriveContextualMenu from './containers/ToggleableDriveContextualMenu';
import ToggleableForm from './containers/ToggleableForm';

class DriveHeader extends Component{
    render(){
        return(<div className="row">
                <div className="col-md-12">
                    {/* <ToggleableDriveContextualMenu isOpen="true"/> */}
                        <ToggleableForm 
                            showMsgFolderCreated={this.props.showMsgFolderCreated} 
                            onFileUploadFormSubmit={this.props.onFileUploadFormSubmit} 
                            onFolderFormSubmit={this.props.onFolderFormSubmit} 
                            onSearchBoxChange={this.props.onSearchBoxChange}
                            uploadProgress={this.props.uploadProgress}
                            styles={this.props.styles}
                        />
                    </div>
            </div>
        )
    }
}


export default DriveHeader;