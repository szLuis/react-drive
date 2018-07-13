import React, { Component } from 'react';
import ToggleableFormTemplate from '../templates/ToggleableForm.rt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FolderForm } from './FolderForm';

class ToggleableForm extends Component{
    constructor(props){
        super(props);
        
        this.state={
            isOpen:false,
        }

        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,      
        }))
    }

    handleFormClose = () => {
        this.setState({ isOpen:false});
    }

    handleFormSubmit = (FolderForm) => {
        this.props.onFormSubmit(FolderForm);
        this.setState({ isOpen:false});
    }

    render(){
        return ToggleableFormTemplate.apply(this);
    }
}

export default ToggleableForm;