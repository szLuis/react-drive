import React, { Component } from 'react';
import ListElement from './ListView/containers/ListElement';



class FilesFoldersList extends Component{
    constructor(props){
        super(props);
    }

    //return an array of objects according to key, value, or key and value matching
    getObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] === 'object') {
                objects = objects.concat(this.getObjects(obj[i], key, val));    
            } else 
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i === key && obj[i] === val || i === key && val === '') { //
                objects.push(obj);
            } else if (obj[i] === val && key === ''){
                //only add if the object is not already in the array
                if (objects.lastIndexOf(obj) === -1){
                    objects.push(obj);
                }
            }
        }
        return objects;
    }

    render(){
        const totalListElements = this.props.filesandfolders.length;
        let filesandfoldersfiltered = this.props.filesandfolders.filter(ff => ff.deleted === false ); //no filter applied
        if (this.props.optionClicked === 'folder'){
            const values = this.getObjects(this.props.filesandfolders, 'id', this.props.itemID);    
            filesandfoldersfiltered = values[0].children;
        }else if (this.props.optionClicked === 'starred')
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
     

        if (this.props.loading){
            return (
                <div className="col-md-9">
                    <div className="p-3 mb-2 bg-white text-dark font-italic">Loading...</div>
                </div>
            )
        }else if (totalListElements ===0){
            return (
                <div className="col-md-9">
                    <div className="p-3 mb-2 bg-white text-dark font-italic">No elements in the list</div>
                </div>
            )
        }else{
            return (
                <div className="col-md-9">
                    <ul className="list list-group list-attrs">
                        {listElementComponents}
                    </ul>
                </div>
            )
        }
    }
}

export default FilesFoldersList;