import { Component } from 'react';
import DriveOptionsListTemplate from '../templates/DriveOptionsListTemplate.rt'

class DriveOptionsList extends Component{
    
    handleStarClick = (e) => {
        this.props.onStarredOptionClick(e.target.id);
    }

    handleRecentsClick = (e) => {
        this.props.onRecentsOptionClick(e.target.id);
    }

    handleTrashClick = (e) => {
        this.props.onTrashOptionClick(e.target.id);
    }

    render(){
        return DriveOptionsListTemplate.apply(this);
    }
}

export default DriveOptionsList;