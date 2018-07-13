import React, { Component } from 'react';
import DriveOptionsListTemplate from '../templates/DriveOptionsListTemplate.rt'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DriveOptionsList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return DriveOptionsListTemplate.apply(this);
        // return (<div >

        // <ul className="list-group">
        //   <li className="list-group-item">
        //    Storage <FontAwesomeIcon icon="hdd"  pull="right"/>
        //   </li>
        //   <div className="progress list-group-item">
        //     <div className="progress-bar" role="progressbar" stylecss="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
        // </div>
        // <h6>250 MB  used of 1000 MB available</h6>
        // </ul>
        
        // </div>);
    }
}

export default DriveOptionsList;