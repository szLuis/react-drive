import React, { Component } from 'react';
import DriveOptionsListTemplate from '../templates/DriveOptionsListTemplate.rt'

class DriveOptionsList extends Component{
    constructor(props){
        super(props);

        this.state = {
            optionActivated: '',
        }
    }

    handleStarClick = (e) => {
        this.props.onStarredOptionClick();
        this.activeOption(e);
        
    }

    handleRecentsClick = (e) => {
        this.props.onRecentsOptionClick();
        this.activeOption(e);        
    }

    handleTrashClick = (e) => {
        this.props.onTrashOptionClick();
        this.activeOption(e);        
    }

    activeOption = (e) => {
        this.setState({
            optionActivated : e.target.id,
        })
    }

    render(){
        return DriveOptionsListTemplate.apply(this);
    }
}

export default DriveOptionsList;