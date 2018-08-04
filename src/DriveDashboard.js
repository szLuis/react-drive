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

//const API ="https://drive-js-server.herokuapp.com/filesfolders/";
const API ="http://localhost:3001/filesfolders";
//const API ="http://192.168.43.208:3001/filesfolders";

class DriveDashboard extends Component {
  constructor(props){
    super(props);

    this.state={
        filesandfolders:[],
        newListElement:[],
        optionClicked: 'drive',
        loading: true,
        itemID:''
    }
  }



  componentDidMount(){
    axios.get(API)
    .then( (response) => {     
	console.log('files and folders keys')
	const objfilefolder = response.data
      console.log(Object.entries(objfilefolder)) 
Object.entries(objfilefolder).forEach(([key, value]) => console.log(`${key}: ${value}`));
      this.setState(
      {        
        filesandfolders: response.data,
        loading:false,
      })}
    )
    .catch( (error) => {
      this.setState({
        loading:true,
      })
      console.log(error);
    })
    
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

  // CREATE folder block
  handleCreateFormSubmit = (FolderForm) => {
    this.createFolderForm(FolderForm);
  };

  createFolderForm = (FolderForm) => {
    const ff = FolderForm;
    ff.id = this.state.filesandfolders.length + 31;
    ff.icon = 'folder';
    ff.title = FolderForm.folderName;
    ff.dateCreated= "2018-07-18";
    ff.detailsLink='#';
    ff.star=false;
    ff.deleted=false;
    ff.hasChildren= false;
    ff.children=[];

    this.setState({      
      newListElement: [ff],
      //filesandfolders: this.state.filesandfolders.concat(ff),
    })
    this.handleDriveExplorerItemClick(this.state.itemID)
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
    this.setState({
      optionClicked: 'starred',
    })
  }

  handleRecentsOptionClick = () => {
    this.setState({   
      optionClicked: 'recents',
    })
  }

  handleTrashOptionClick = () => {
    this.setState({
      optionClicked: 'trash',
    })
  }

  handleDriveExplorerItemClick = (itemID) => {
    //const values = this.getObjects(this.state.filesandfolders, 'id', itemID)
    //console.log(values[0].children)
    this.setState({
      optionClicked: 'folder',
      itemID:itemID,
    })
    //if (typeof values == 'object') {
    // this.setState({
    //   filesandfolders:values[0].children
    // })
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
              filesandfolders={this.state.filesandfolders}
              itemID={this.state.itemID}
              loading={this.state.loading}
              newListElement={this.state.newListElement}
            />
          </div>
      </div>
    );
  }
}

export default DriveDashboard;
