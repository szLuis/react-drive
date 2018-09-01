import React, { Component } from 'react';
import ListElement from './ListView/containers/ListElement';

class FilesFoldersList extends Component{
    
    render(){
        const filesandfoldersfiltered = this.props.filesandfolders
        const totalListElements = filesandfoldersfiltered.length
        
        const listElementComponents = filesandfoldersfiltered.map((filefolder) => (
            <ListElement 
                key={filefolder.id}
                id={filefolder.id}
                icon={filefolder.icon}
                title={filefolder.title}
                dateCreated={filefolder.dateCreated}
                details={filefolder.details}
                star={filefolder.star}
                onDoubleClick={this.props.onDoubleClickListElement}
                onFormSubmit={this.props.onFormSubmit}
                onListElementDelete={this.props.onListElementDelete}
                onListElementStar={this.props.onListElementStar}
            />
        ));
     

        if (this.props.loading){
            return (
                <div className="col-md-12">
                    <div className="p-3 mb-2 bg-white text-dark font-italic">Loading...</div>
                </div>
            )
        }else if (totalListElements ===0){
            return (
                <div className="col-md-12">
                    <div className="p-3 mb-2 bg-white text-dark font-italic">No elements in the list, add one</div>
                </div>
            )
        }else{
            return (
                <div className="col-md-12">
                    <ul className="list list-group list-attrs">
                        {listElementComponents}
                    </ul>
                </div>
            )
        }
    }
}

export default FilesFoldersList;