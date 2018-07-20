import { Component } from 'react';
import DriveStorageInfoTemplate from '../templates/DriveStorageInfoTemplate.rt'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DriveStorageInfo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return DriveStorageInfoTemplate.apply(this);
    }
}

export default DriveStorageInfo;