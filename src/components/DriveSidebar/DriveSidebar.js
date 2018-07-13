import React, {Component} from 'react';
import DriveStorageInfo from './DriveStorageInfo/containers/DriveStorageInfo';
import DriveOptionsList from './DriveOptionsList/containers/DriveOptionsList';
import DriveExplorer from './DriveExplorer/containers/DriveExplorer';


class DriveSidebar extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="col-md-3">
                <ul className="list list-group list-attrs" >
                    <DriveExplorer/>
                    <DriveOptionsList/>
                    <DriveStorageInfo/>
                </ul>
            </div>
        );
    }
}

export default DriveSidebar;