import { Component } from 'react';
import ToggleableFormTemplate from '../templates/ToggleableFormTemplate.rt';
import onClickOutside from 'react-onclickoutside';

class ToggleableForm extends Component{
    constructor(props){
        super(props);
        
        this.state={
            folderFormIsOpen:false,
            fileUploadFormIsOpen:false,
        }

        this.toggleFolderForm = this.toggleFolderForm.bind(this)
        this.toggleFileUploadForm = this.toggleFileUploadForm.bind(this)
        this.handleFileUploadFormClose = this.handleFileUploadFormClose.bind(this)
        this.handleFolderFormClose = this.handleFolderFormClose.bind(this)
    }

    toggleFolderForm(e){
        this.setState(prevState => ({
            folderFormIsOpen: !prevState.folderFormIsOpen,
            fileUploadFormIsOpen: false,
        }))
    }

    toggleFileUploadForm(e){
        this.setState(prevState => ({
            fileUploadFormIsOpen: !prevState.fileUploadFormIsOpen,    
            folderFormIsOpen: false,   
        }))
    }

    handleFileUploadFormClose = () => {
        this.setState({ fileUploadFormIsOpen:false});
    }

    handleFolderFormClose = () => {
        this.setState({ folderFormIsOpen:false});
    }

    handleFileUploadFormSubmit = (FileUploadForm) => {
        this.props.onFileUploadFormSubmit(FileUploadForm)
    }

    handleFolderFormSubmit = (FolderForm) => {
        this.props.onFolderFormSubmit(FolderForm);
        this.setState({ folderFormIsOpen:false});
    }

    handleClickOutside(){
        this.setState({
            folderFormIsOpen: false,
            fileUploadFormIsOpen: false,
        })
    }

    render(){
        return ToggleableFormTemplate.apply(this);
    }
}

export default onClickOutside(ToggleableForm);