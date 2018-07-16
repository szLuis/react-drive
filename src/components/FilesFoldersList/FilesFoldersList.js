import React, { Component } from 'react';
import ListElement from './ListView/containers/ListElement';
import FolderForm from '../DriveHeader/containers/FolderForm';



class FilesFoldersList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const totalListElements = this.props.filesandfolders.length;
        const listElementComponents = this.props.filesandfolders.map((filefolder) => (
            <ListElement 
                key={filefolder.id}
                id={filefolder.id}
                icon={filefolder.icon}
                title={filefolder.title}
                dateCreated={filefolder.dateCreated}
                details={filefolder.details}
                star={filefolder.star}
                onFormSubmit={this.props.onFormSubmit}
                onListElementDelete={this.props.onListElementDelete}
                onListElementStar={this.props.onListElementStar}
            />
        ));
        if (totalListElements ===0){
            return (
                <div className="col-md-9">
                    <div class="p-3 mb-2 bg-white text-dark font-italic">No elements in the list</div>
                </div>
            )
        }

        return (
            <div className="col-md-9">
                <ul className="list list-group list-attrs">
                    {listElementComponents}
                </ul>
            </div>
        )
    }
}

export default FilesFoldersList;