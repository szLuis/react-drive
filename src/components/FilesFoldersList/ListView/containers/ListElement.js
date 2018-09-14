import { Component } from 'react';
import ListElementTemplate from '../templates/ListElementTemplate.rt';

class ListElement extends Component{
    constructor(props){
        super(props);
        this.state={
            editFormOpen: false,
            moveToFormOpen: false,
            // showContextualMenu:false,
        }
        this.handleEditClick = this.handleEditClick.bind(this);
        // this.handleClick=this.handleClick.bind(this);
    }

    // handleClick = (e) => {
    //     e.preventDefault()
    //     if (e.type==='click'){
    //         this.props.onClick(this.props.id)
    //     }else{
    //         this.props.onClick(this.props.id)
    //         this.onContextualMenu()
    //     }
    // }

    // onContextualMenu = () => {
    //    this.setState({
    //        showContextualMenu:true,
    //    })
    // }

    handleMoveToClick = () => {
        this.setState({
            moveToFormOpen:true,
        })
        console.log('BTN MOVE TO CLICKED' + this.props.title)
    }

    handleDoubleClick = () => {
        if (this.props.icon==='folder' && this.props.optionClicked==='folder') 
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