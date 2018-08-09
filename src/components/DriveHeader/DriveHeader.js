import React, { Component } from 'react';
// import ToggleableDriveContextualMenu from './containers/ToggleableDriveContextualMenu';
import ToggleableForm from './containers/ToggleableForm';
import FileUploadForm from './containers/FileUploadForm';
import SearchBox from './containers/SearchBox';

class DriveHeader extends Component{
    // constructor(props){
    //     super(props);


    // }
    render(){
        return(<div className="row">
                <div className="col-md-12">
                    {/* <ToggleableDriveContextualMenu isOpen="true"/> */}
                        <SearchBox />
                        <ToggleableForm onFormSubmit={this.props.onFormSubmit} />
                        <FileUploadForm onFormSubmit={this.props.onFormSubmit} />
                    </div>
            </div>
        )
    }
}


export default DriveHeader;