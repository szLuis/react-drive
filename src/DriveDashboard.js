import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/theme.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHdd, faFile, faFolder, faPlus, faEdit, faTrash, faStar, faClock, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import DriveHeader from './components/DriveHeader/DriveHeader';
import DriveSidebar from './components/DriveSidebar/DriveSidebar';
import FilesFoldersList from './components/FilesFoldersList/FilesFoldersList' ;
import axios from 'axios';
library.add( faHdd,faFile, faFolder, faPlus, faEdit,faTrash, faStar, faClock, faCaretDown, faCaretRight );

const API ="https://drive-js-server.herokuapp.com/filesfolders/";
//const API ="http://localhost:3001/filesfolders";
//const API ="http://192.168.43.208:3001/filesfolders";

class DriveDashboard extends Component {
  constructor(props){
    super(props);

    this.state={
        filesandfolders:[],
        filesandfoldersFiltered:[],
        // newListElement:[],
        optionClicked: 'drive',
        loading: true,
        itemID: '',
        id:1
    }
    this.showItemsOfRootFolder = this.showItemsOfRootFolder.bind(this)
    this.driveExplorerItemClicked = this.driveExplorerItemClicked.bind(this)
  }

  componentDidMount(){
    axios.get(API)
    .then( (response) => {   
	//console.log('files and folders keys')
	//const objfilefolder = response.data
      //console.log(Object.entries(objfilefolder)) 
//Object.entries(objfilefolder).forEach(([key, value]) => console.log(`${key}: ${value}`));
      this.setState(
      {        
        filesandfolders: response.data,
        loading:false,
        itemID:response.data[0].id,
      })
    })
    .then(() => {
      this.showItemsOfRootFolder()
    })
    .catch( (error) => {
      this.setState({
        loading:false,
      })
      console.log(error);
    })
    
  }

  showItemsOfRootFolder(){
    this.driveExplorerItemClicked(this.state.itemID)
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
        if ((i === key && obj[i] === val) || (i === key && val === '')) { //
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

  handleAddElementToFilesAndFolders = (newList) => {
    this.setState(
      {
        filesandfolders:newList,
        // newListElement:[]
      }
    )
  }

  // CREATE folder block
  handleCreateFormSubmit = (Form, type) => {
    this.addNewElement(Form, type);
  };

  addNewElement = (Form, type) => {
    console.log(Form)
    const ff = Form;
    
    ff.id = (this.state.id + 31).toString();
    ff.icon = type
    ff.title = Form.name;
    // ff.title = FolderForm.folderName;
    ff.dateCreated= "2018-07-18";
    ff.detailsLink='#';
    ff.star=false;
    ff.deleted=false;
    ff.hasChildren= false;
    ff.children=[];

    // this.setState({      
      
    //   //filesandfolders: this.state.filesandfolders.concat(ff),
    // })
    const newElement = [ff]
    // const newList = this.addNewObjectToFilesAndFolders(this.state.filesandfolders, 'id', this.state.itemID, newElement )
    // this.handleAddElementToFilesAndFolders(newList)
    this.setState(
      {
        // newListElement: [ff],
        id:this.state.id+1,
      }
    )
    this.handleDriveExplorerItemClick(this.state.itemID, newElement)
    // const listOfElements = this.getObjects(this.state.filesandfolders, 'id', this.state.itemID);    
    // const newListOfElements = listOfElements[0].children.concat(ff)
    
    // console.log(FolderForm;
    // axios.post(API, {
    //     id: ff.id,
    //     icon: ff.icon,
    //     title: ff.title,
    //     dateCreated: ff.dateCreated,
    //     detailsLink: '#',
    //     star: false,
    //     deleted: false,
    // })
    // .then((response) => {
    //   this.setState({      
    //     newListElement: ff,
    //     //filesandfolders: this.state.filesandfolders.concat(ff),
    //   })
    // })
    // .catch(function (error){
    //   console.log(error);
    // })
  };

  // UPDATE folder block
  handleUpdateFormSubmit = (FolderFormAtts) => {
    this.updateFolderForm(FolderFormAtts);
  }

  updateFolderForm = (FolderFormAtts) => {
    axios.patch(API + '/' + FolderFormAtts.id, {
      title:FolderFormAtts.folderName
    })
    .then((response) => {
      this.setState({
        filesandfolders: this.state.filesandfolders.map((filefolder) =>{
          if (filefolder.id === FolderFormAtts.id){
            return Object.assign({}, filefolder, {
              title: FolderFormAtts.folderName,            
            });
          } else {
            return filefolder;
          }
        })
      });
    })
    .catch((error) => {
      console.log(error);
    })
 
  }

  // DELETE element block
  handleListElementDelete = (itemId) => {
    this.deleteListElement(itemId);
  }

  deleteListElement = (itemId) => {
    axios.patch(API + '/' + itemId, {
      deleted:true
    })
    .then( (response) => {
      console.log(response);
      this.setState({
        filesandfolders: this.state.filesandfolders.map((filefolder) =>{
          if (filefolder.id === itemId){
            return Object.assign({}, filefolder, {
              deleted: true,            
            });
          } else {
            return filefolder;
          }
        })
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // STAR element block
  handleListElementStar = (itemId) => {
    this.starListElement(itemId);
  }

  starListElement = (itemId) => {
    axios.patch(API + '/' + itemId,{
      star: true,
    })
    .then( (response) => {
      console.log(response);
      this.setState({
        filesandfolders: this.state.filesandfolders.map((filefolder) =>{
          if (filefolder.id === itemId){
            console.log(itemId);
            return Object.assign({}, filefolder, {
              star: !filefolder.star,        
              deleted: false,    
            });
          } else {
            return filefolder;
          }
        })
      })
    })
    .catch((error) => {
      console.log(error);
    })
    
  }

  // CLICK event handlers for drive side bar
  handleStarredOptionClick = () => {
     //
    const elementsFiltered = this.state.filesandfolders.filter(ff => ff.star === true && ff.deleted===false)
    this.setState({
      optionClicked: 'starred',
      filesandfoldersFiltered : elementsFiltered
    })
  }

  getDateDaysAgo = (days) => {
    const d = new Date();
    const mes = d.getMonth() - 3 ;
    const dia = d.getDate() - days;
    console.log(dia)
    const daysBack = d.getFullYear() + '-' + mes + '-' + dia;
    const dateDaysAgo = Date.parse(daysBack);
    
    return dateDaysAgo
  }

  handleRecentsOptionClick = () => {
    const dateDaysAgo = this.getDateDaysAgo(5)
    console.log(dateDaysAgo)
    const elementsFiltered= this.state.filesandfolders.filter(ff => Date.parse(ff.dateCreated) >= dateDaysAgo && ff.deleted===false);
    this.setState({   
      optionClicked: 'recents',
      filesandfoldersFiltered : elementsFiltered
    })
  }

  handleTrashOptionClick = () => {
    const elementsFiltered = this.state.filesandfolders.filter(ff => ff.deleted === true );
    this.setState({
      optionClicked: 'trash',
      filesandfoldersFiltered : elementsFiltered
    })
  }

  handleDriveExplorerItemClick = (itemID, newElement) => {
    //const values = this.getObjects(this.state.filesandfolders, 'id', itemID)
    //console.log(values[0].children)
    // this.setState({
    //   optionClicked: 'folder',
    //   itemID:itemID,
    // })
    this.driveExplorerItemClicked(itemID, newElement)
    //if (typeof values == 'object') {
    // this.setState({
    //   filesandfolders:values[0].children
    // })
  }

  driveExplorerItemClicked = (itemID, newElement) => {

            // get children for folder clicked 
            let values = this.getObjects(this.state.filesandfolders, 'id',itemID);
            // let newFolderObject = [];
            let filesandfoldersfiltered =[];
            
            // if (newElement !== undefined){
            //   console.log('newElement.length')
            //   console.log(newElement)
            // }
            //console.log(values[0].hasChildren)
            // newListElement is the new one to add to all objects in the current path
            //if (this.state.newListElement.length > 0  && values[0].hasChildren){
              if (newElement !== undefined  && values[0].hasChildren){
                // console.log('has children and add new element')
                values[0].children =values[0].children.concat(newElement)
                filesandfoldersfiltered = values[0].children
                // console.log('new files and folders ')                
                // newFolderObject = this.addNewObjectToFilesAndFolders(this.state.filesandfolders, 'id', itemID, newElement)
                // console.log(newFolderObject)
                // this.onAddElementToFilesAndFolders(newFolderObject)
            //}else if (this.state.newListElement.length > 0 && !values[0].hasChildren){
            }else if (newElement !== undefined  && !values[0].hasChildren){
                // console.log('NO has children and new element Added')
                // console.log('this.props.newListElement')
                // console.log(newElement)
                values[0].hasChildren=true;
                values[0].children = newElement
                filesandfoldersfiltered = values[0].children
                
                // console.log('new files and folders ')                
                // const newFolderObject = this.addNewObjectToFilesAndFolders(this.state.filesandfolders, 'id', itemID, newElement)
                // console.log(newFolderObject)
                // this.state.onAddElementToFilesAndFolders(newFolderObject)
            }else{
              
                filesandfoldersfiltered = values[0].children
            }
            // console.log('filesandfoldersfiltered')
            // console.log(filesandfoldersfiltered)
        
        
        this.setState({
          optionClicked: 'folder',
          filesandfoldersFiltered:filesandfoldersfiltered,
          itemID:itemID,
        })
        
  }

  handleDoubleClickListElement = (listElementId) =>{
    this.doubleClickListElement(listElementId)
  }

  doubleClickListElement = (itemID) => {

    // get children for folder clicked 
    let values = this.getObjects(this.state.filesandfolders, 'id',itemID);
    let filesandfoldersfiltered =[];
      
    filesandfoldersfiltered = values[0].children

    this.setState({
      //optionClicked: 'folder',
      filesandfoldersFiltered:filesandfoldersfiltered,
      itemID:itemID,
    })

}
  

  render() {
    
    return (<div className="container">
          <DriveHeader onFormSubmit={this.handleCreateFormSubmit} />
          {/* <Breadcrumbs appName="Drive" imageURL="assets/img/drive-icon.png"/> */}
          <div className="row">
            <DriveSidebar 
              onStarredOptionClick={this.handleStarredOptionClick}
              onRecentsOptionClick={this.handleRecentsOptionClick}
              onTrashOptionClick={this.handleTrashOptionClick}
              onDriveExplorerItemClick={this.handleDriveExplorerItemClick}
              filesandfolders={this.state.filesandfolders}
            />
            <FilesFoldersList 
              optionClicked={this.state.optionClicked}
              onListElementStar={this.handleListElementStar} 
              onListElementDelete={this.handleListElementDelete} 
              onFormSubmit={this.handleUpdateFormSubmit} 
              filesandfolders={this.state.optionClicked === 'drive'? this.state.filesandfolders : this.state.filesandfoldersFiltered}
              itemID={this.state.itemID}
              loading={this.state.loading}
              // newListElement={this.state.newListElement}
              onAddElementToFilesAndFolders={this.handleAddElementToFilesAndFolders}
              onDoubleClickListElement={this.handleDoubleClickListElement}
            />
          </div>
      </div>
    );
  }
}

export default DriveDashboard;
