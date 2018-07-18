import React, { Component } from 'react';
import ListElement from './ListView/containers/ListElement';
import FolderForm from '../DriveHeader/containers/FolderForm';



class FilesFoldersList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const totalListElements = this.props.filesandfolders.length;
        let filesandfoldersfiltered = this.props.filesandfolders; //no filter applied
        
        if (this.props.optionClicked === 'starred')
            filesandfoldersfiltered = this.props.filesandfolders.filter(ff => ff.star === true && ff.deleted===false);
        else if (this.props.optionClicked === 'recents'){
            const d = new Date();
            const mes = d.getMonth() + 1 ;
            const dia = d.getDate() - 10;
            const tenDaysBack = d.getFullYear() + '-' + mes + '-' + dia;
            const daysBack = Date.parse(tenDaysBack);
            filesandfoldersfiltered= this.props.filesandfolders.filter(ff => Date.parse(ff.dateCreated) >= daysBack && ff.deleted===false);
        }else if (this.props.optionClicked === 'trash'){
            filesandfoldersfiltered = this.props.filesandfolders.filter(ff => ff.deleted === true );
        }
            
        
        const listElementComponents = filesandfoldersfiltered.map((filefolder) => (
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
                    <div className="p-3 mb-2 bg-white text-dark font-italic">No elements in the list</div>
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