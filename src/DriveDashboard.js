import React, { Component } from 'react';
// import DriveHeader from './components/DriveHeader'
//import Breadcrumbs from './components/Breadcrumbs/containers/Breadcrumbs'

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/theme.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHdd, faFile, faFolder, faPlus, faEdit, faTrash, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import DriveHeader from './components/DriveHeader/DriveHeader';
import DriveSidebar from './components/DriveSidebar/DriveSidebar';
import FilesFoldersList from './components/FilesFoldersList/FilesFoldersList' ;
import FilesFoldersData from './data/filesfoldersdata';
import axios from 'axios';
library.add( faHdd,faFile, faFolder, faPlus, faEdit,faTrash, faStar, faClock );

const API ="http://localhost:3001/filesfolders";

class DriveDashboard extends Component {
  constructor(props){
    super(props);

    this.state={
        filesandfolders:[],
        optionClicked: 'drive',
        loading: true,
    }
  }



  componentDidMount(){
    axios.get(API)
    .then( (response) => this.setState(
      {
        filesandfolders: response.data,
        loading:false,
      })
    )
    .catch( (error) => {
      this.setState({
        loading:true,
      })
      console.log(error);
    })
      
  }


  handleCreateFormSubmit = (FolderForm) => {
    this.createFolderForm(FolderForm);
  };

  createFolderForm = (FolderForm) => {
    // console.log(FolderForm);
    const ff = FolderForm;
    ff.id = "9";
    ff.icon = 'folder';
    ff.title = FolderForm.folderName;
    ff.dateCreated= "2018-07-18";
    ff.detailsLink='#';
    // console.log(FolderForm);
    axios.post(API, {
        id: ff.id,
        icon: ff.icon,
        title: ff.title,
        dateCreated: ff.dateCreated,
        detailsLink: '#',
        star: false,
        deleted: false,
    })
    .then((response) => {
      console.log(response.data);
      this.setState({      
        filesandfolders: this.state.filesandfolders.concat(ff),
      })
    })
    .catch(function (error){
      console.log(error);
    })
  };


  handleUpdateFormSubmit = (FolderFormAtts) => {
    this.updateFolderForm(FolderFormAtts);
  }

  updateFolderForm = (FolderFormAtts) => {
    console.log(FolderFormAtts)  ;
    this.setState({
      filesandfolders: this.state.filesandfolders.map((filefolder) =>{
        if (filefolder.id === FolderFormAtts.id){
          return Object.assign({}, filefolder, {
            title: FolderFormAtts.folderName,            
          });
        } else {
          console.log(filefolder);
          return filefolder;
        }
      })
    });
  }


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
  

  render() {
    
    return (<div className="container">
          <DriveHeader onFormSubmit={this.handleCreateFormSubmit} />
          {/* <Breadcrumbs appName="Drive" imageURL="assets/img/drive-icon.png"/> */}
          <div className="row">
            <DriveSidebar 
              onStarredOptionClick={this.handleStarredOptionClick}
              onRecentsOptionClick={this.handleRecentsOptionClick}
              onTrashOptionClick={this.handleTrashOptionClick}
            />
            <FilesFoldersList 
              optionClicked={this.state.optionClicked}
              onListElementStar={this.handleListElementStar} 
              onListElementDelete={this.handleListElementDelete} 
              onFormSubmit={this.handleUpdateFormSubmit} 
              filesandfolders={this.state.filesandfolders}
              loading={this.state.loading}
            />
          </div>
      </div>
    );
  }
}

export default DriveDashboard;
