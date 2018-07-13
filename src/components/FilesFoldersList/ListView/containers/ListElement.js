import React, { Component } from 'react';
import ListElementTemplate from '../templates/ListElementTemplate.rt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ListElement extends Component{
    constructor(props){
        super(props);
        this.state={
            editFormOpen: false,
        }
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleEditClick = () => {        
        this.openForm();
    }
    handleDeleteClick = () => {
        this.props.onListElementDelete(this.props.id);
        this.handleFormClose();
    }

    handleFormClose = () => {
        this.setState({
            editFormOpen:false
        });
    }

    handleFormSubmit = (FolderForm) => {
        this.props.onFormSubmit(FolderForm);
        this.setState({ editFormOpen:false});
    }

    openForm = () => {
        this.setState({
            editFormOpen: true,
        })
    }

    render(){
        return ListElementTemplate.apply(this);
    }
}
ListElement.defaultProps={
    icon:'null',
    title:'No elements in the drive yet, add one',
}
export default ListElement;