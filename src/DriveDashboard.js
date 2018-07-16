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
library.add( faHdd,faFile, faFolder, faPlus, faEdit,faTrash, faStar, faClock );


class DriveDashboard extends Component {
  constructor(props){
    super(props);

    this.state={
        filesandfolders:[],
    }
  }

  componentDidMount(){
      this.setState({filesandfolders: FilesFoldersData});
  }


  handleCreateFormSubmit = (FolderForm) => {
    this.createFolderForm(FolderForm);
  };

  createFolderForm = (FolderForm) => {
    console.log(FolderForm);
    const ff = FolderForm;
    ff.id = "7";
    ff.icon = 'folder';
    ff.title = FolderForm.folderName;
    ff.dateCreated= '2018-05-20';
    ff.detailsLink='';
    console.log(FolderForm);
    this.setState({
      filesandfolders: this.state.filesandfolders.concat(ff),
    });
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
    this.setState({
      filesandfolders: this.state.filesandfolders.filter(ff => ff.id !== itemId),
    })
    // console.log('List element to delete id: ' + itemId);
  }

  handleListElementStar = (itemId) => {
    this.starListElement(itemId);
  }

  starListElement = (itemId) => {
    this.setState({
      filesandfolders: this.state.filesandfolders.map((filefolder) =>{
        if (filefolder.id === itemId){
          return Object.assign({}, filefolder, {
            star: !filefolder.star,            
          });
        } else {
          return filefolder;
        }
      })
    })
  }


  handleStarredOptionClick = () => {
    this.setState({
      filesandfolders: this.state.filesandfolders.filter(ff => ff.star === true)
      })
  }

  handleRecentsOptionClick = () => {
    const d = new Date();
      const mes = d.getMonth() + 1 ;
      const dia = d.getDate() - 10;
      const tenDaysBack = d.getFullYear() + '-' + mes + '-' + dia;
      const daysBack = Date.parse(tenDaysBack);
    this.setState({   
      filesandfolders: this.state.filesandfolders.filter(ff => Date.parse(ff.dateCreated) >= daysBack)
      })
  }

  handleTrashOptionClick = () => {
    this.setState({
      filesandfolders: this.state.filesandfolders.filter(ff => ff.star === true)
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
            />
            <FilesFoldersList 
              onListElementStar={this.handleListElementStar} 
              onListElementDelete={this.handleListElementDelete} 
              onFormSubmit={this.handleUpdateFormSubmit} 
              filesandfolders={this.state.filesandfolders}
            />
          </div>
      </div>
    );
  }
}

export default DriveDashboard;
