import { Component } from 'react';
import ToggleableFormTemplate from '../templates/ToggleableForm.rt';
import onClickOutside from 'react-onclickoutside';

const FORM_TYPE = 'folder'

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
        this.props.onFormSubmit(FolderForm, FORM_TYPE);
        this.setState({ isOpen:false});
    }

    handleClickOutside(){
        this.setState({
            isOpen: false,
        })
    }

    render(){
        return ToggleableFormTemplate.apply(this);
    }
}

export default onClickOutside(ToggleableForm);