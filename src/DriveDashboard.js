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
import Breadcrumbs from './components/DriveHeader/containers/Breadcrumbs';
library.add( faHdd,faFile, faFolder, faPlus, faEdit,faTrash, faStar, faClock, faCaretDown, faCaretRight );

//const API ="https://drive-js-server.herokuapp.com/filesfolders/";
// const API ="http://localhost:3001/filesfolders";
const API ="http://127.0.0.1:8000/"
const FILE_DIRECTORY = "filedirectory/"
const CREATE_FOLDER = "createdirectory/"
const FILE_UPLOAD_URL ="uploadfile/";
//const API ="http://192.168.43.208:3001/filesfolders";

class DriveDashboard extends Component {
  constructor(props){
    super(props);

    this.state={
        filesandfolders:[],
        filesandfoldersFiltered:[],
        breadcrumbs:{
          id:[],
          title:[]
        },
        showMsgFolderCreated:false,
        optionClicked: 'drive',
        optionActivated: 'mydrive',
        loading: true,
        itemID: '',
        uploadProgress:0,          
          styles:{
            width:'0%',
          },
        id:1
    }
    this.showItemsOfRootFolder = this.showItemsOfRootFolder.bind(this)
    this.driveExplorerItemClicked = this.driveExplorerItemClicked.bind(this)
  }

  componentDidMount(){
    axios.get(API+FILE_DIRECTORY)
    .then( (response) => {   
      this.setState(
      {        
        filesandfolders: response.data,
        loading:false,
        itemID:response.data[0].id,
        breadcrumbs:{
          title:[response.data[0].title],
          id:[response.data[0].id]
        }
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
      }
    )
  }

  // CREATE folder block
  handleCreateFolderFormSubmit = (Form) => {
    this.addNewFolderElement(Form);
  };

  addNewFolderElement = (Form) => {
    console.log(Form)
    const ff = Form;
    
    ff.icon = 'folder'
    ff.title = Form.name;
    ff.dateCreated= "2018-07-18";
    ff.detailsLink='#'
    ff.star=false
    ff.deleted=false
    ff.hasChildren=false
    ff.children=[]

    axios.post(API + CREATE_FOLDER, {
        idTargetDirectory: this.state.itemID,
        targetDirectory: this.state.breadcrumbs.title, // current or target directory
        icon: ff.icon,
        directoryName: ff.title,
        star: false,
        deleted: false,
    })
    .then((response) => {
      ff.id = response.data.id
      const newElement = [ff]
      this.handleDriveExplorerItemClick(this.state.itemID, newElement)
    })
    .catch(function (error){
      console.log(error);
    })

    
    this.setState(
      {
        id:this.state.id+1,
      }
    )

  };

  //FILE upload block
  handleFileUploadFormSubmit = (Form) => {
    this.addNewFileElement(Form);
  };

  addNewFileElement = (Form) => {
    console.log(Form)
    const ff = Form;
    
    ff.icon = 'file'
    ff.title = Form.name;
    ff.dateCreated= "2018-07-18";
    ff.detailsLink='#'
    ff.star=false
    ff.deleted=false
    ff.hasChildren=false
    ff.children=[]

    this.fileUpload(Form)
        .then((response)=>{
          ff.id = response.data.id
          const newElement = [ff]
          this.handleDriveExplorerItemClick(this.state.itemID, newElement)
          // this.props.onFormSubmit(this.state.file)
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error)
        })

    // axios.post(API + CREATE_FOLDER, {
    //     idTargetDirectory: this.state.itemID,
    //     targetDirectory: this.state.breadcrumbs, // current or target directory
    //     icon: ff.icon,
    //     directoryName: ff.title,
    //     star: false,
    //     deleted: false,
    // })
    // .then((response) => {
    //   ff.id = response.data.id
    //   const newElement = [ff]
    //   this.handleDriveExplorerItemClick(this.state.itemID, newElement)
    // })
    // .catch(function (error){
    //   console.log(error);
    // })

    
    // this.setState(
    //   {
    //     id:this.state.id+1,
    //   }
    // )

  };

  fileUpload(file){
    const url = API + FILE_UPLOAD_URL;
    const formData = new FormData();
    formData.append('file',file)
    const targetDirectory = JSON.stringify(this.state.breadcrumbs.title);
    formData.append('idTargetDirectory', this.state.itemID)
    formData.append('targetDirectory', targetDirectory) // current or target directory)
    const config = {
        headers: {
          "Access-Control-Allow-Origin": '*',
          'Content-Type': 'mutipart/form-data;',
        },
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
          console.log(percentCompleted)
          this.setState({
            uploadProgress:percentCompleted,
            styles:{
              width:percentCompleted+'%',
            }
          })
        }
    }       
    return axios.post(url, formData, config)
  }

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

  handleDriveExplorerItemClick = (itemID, newElement, pathIDs) => {
    this.driveExplorerItemClicked(itemID, newElement, pathIDs)
  }

  driveExplorerItemClicked = (itemID, newElement, pathIDs) => {

      const itemIdInteger = parseInt(itemID,10) //id value is integer so it needs to be converted before
      let values = this.getObjects(this.state.filesandfolders, 'id', itemIdInteger);
      let showMsg = true
      let filesandfoldersfiltered =[];
      
        if (newElement !== undefined  && values[0].hasChildren){
          values[0].children =values[0].children.concat(newElement)
          filesandfoldersfiltered = values[0].children
      }else if (newElement !== undefined  && !values[0].hasChildren){
          values[0].hasChildren=true;
          values[0].children = newElement
          filesandfoldersfiltered = values[0].children
      }else{
          showMsg=false
          filesandfoldersfiltered = values[0].children
      }
      //fill breadcrumbs data
      let ids = []
      let titles = []
      
      if (pathIDs!==undefined){
        ids = pathIDs.map((path) =>{
          return path.id
        })
        titles = pathIDs.map((path) =>{
          return path.title
        })
      }

      this.setState({
        optionClicked: 'folder',
        filesandfoldersFiltered:filesandfoldersfiltered,
        breadcrumbs:{
          title: titles,
          id: ids,
        },
        optionActivated:itemID,
        showMsgFolderCreated:showMsg,
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
      optionActivated:itemID.toString() ,
      breadcrumbs:{
        title: this.state.breadcrumbs.title.concat(values[0].title),
        id: this.state.breadcrumbs.id.concat(values[0].id)
      },
      
      itemID:itemID,
    })

}

handleBreadcrumbClick = (breadcrumbId) =>{
  this.clickBreadcrumbItem(breadcrumbId)
}

clickBreadcrumbItem = (itemID) => {

  // get children for folder clicked 
  const itemIdInteger = parseInt(itemID,10) 
  let values = this.getObjects(this.state.filesandfolders, 'id',itemIdInteger);
  let filesandfoldersfiltered =[];
    
  filesandfoldersfiltered = values[0].children
  const indexToStartRemoving = this.state.breadcrumbs.id.indexOf(itemIdInteger) + 1
  // console.log("index" + this.state.breadcrumbs.id.indexOf(itemIdInteger))

  // console.log("value searched " + itemIdInteger)
  this.state.breadcrumbs.id.splice(indexToStartRemoving)
  this.state.breadcrumbs.title.splice(indexToStartRemoving)

  this.setState({
    // optionClicked: 'folder',
    filesandfoldersFiltered:filesandfoldersfiltered,
    breadcrumbs:{
      title: this.state.breadcrumbs.title,
      id: this.state.breadcrumbs.id,
    },
    optionActivated:itemID,
    itemID:itemID,
  })

}
  

  render() {
    
    return (<div className="container">
          <DriveHeader 
            showMsgFolderCreated={this.state.showMsgFolderCreated} 
            onFileUploadFormSubmit={this.handleFileUploadFormSubmit} 
            onFolderFormSubmit={this.handleCreateFolderFormSubmit}
            uploadProgress={this.state.uploadProgress}
            styles={this.state.styles}
          />

          <Breadcrumbs 
            breadcrumbs={this.state.breadcrumbs} 
            appName="Drive" 
            imageURL="assets/img/drive-icon.png"
            onBreadcrumbClick={this.handleBreadcrumbClick}
          /> 
          <div className="row">
            <DriveSidebar 
              onStarredOptionClick={this.handleStarredOptionClick}
              onRecentsOptionClick={this.handleRecentsOptionClick}
              onTrashOptionClick={this.handleTrashOptionClick}
              onDriveExplorerItemClick={this.handleDriveExplorerItemClick}
              filesandfolders={this.state.filesandfolders}
              optionActivated={this.state.optionActivated}
              
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
