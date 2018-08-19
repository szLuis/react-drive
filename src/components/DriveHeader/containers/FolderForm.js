import React, {Component} from 'react';
// import FolderFormTemplate from '../templates/FolderFormTemplate.rt';

export class FolderForm extends Component{
    constructor(props){
        super(props);

        this.state={
            name:this.props.folderName || '',    
        }

        this.handleFolderNameChange = this.handleFolderNameChange.bind(this);
    }

    
    handleFolderNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    handleSubmit = () => {
        this.props.onFormSubmit({
            id:this.props.id,
            name: this.state.name,
        })
    }




    render(){
        const submitText = this.props.id ? 'Update' : 'Create';   
        const formTitle = this.props.id ? 'Change' : 'Folder';
        return( 
            <div className="container ">
                <div className="row ">
                    <div className="col"></div>
                    <div className="col-md-6">
                        <form>
                        <div className="form-group">
                            <label htmlFor="folderName">{formTitle} name </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="folderName" 
                                value={this.state.name}
                                onChange={this.handleFolderNameChange} 
                                aria-describedby="folderNameHelp" placeholder="e.g pictures"/>
                            <small id="folderNameHelp" className="form-text text-muted">Please add a name.</small>
                        </div>
                        <button className="btn btn-success" disabled={!this.state.name}  onClick={this.handleSubmit}>{submitText}</button>
                        <button className="btn btn-primary mr-2" onClick={this.props.onFormClose}>Cancel</button>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
        // return FolderFormTemplate.apply(this);        
    }
}
