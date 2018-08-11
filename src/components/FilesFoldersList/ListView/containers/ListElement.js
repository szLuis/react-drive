import { Component } from 'react';
import ListElementTemplate from '../templates/ListElementTemplate.rt';

class ListElement extends Component{
    constructor(props){
        super(props);
        this.state={
            editFormOpen: false,
        }
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleDoubleClick = () => {
        if (this.props.icon==='folder')
        this.props.onDoubleClick(this.props.id)
    }

    handleEditClick = () => {        
        this.openForm();
    }
    
    handleDeleteClick = () => {
        this.props.onListElementDelete(this.props.id);
        this.handleFormClose();
    }

    handleStarClick = () => {
        this.props.onListElementStar(this.props.id);
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