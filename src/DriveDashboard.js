import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/theme.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHdd, faFile, faFolder, faPlus, faEdit, faTrash, faStar, faClock, faCaretDown, faCaretRight, faArrowDown, faArrowUp, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import DriveHeader from './components/DriveHeader/DriveHeader';
import DriveSidebar from './components/DriveSidebar/DriveSidebar';
import FilesFoldersList from './components/FilesFoldersList/FilesFoldersList' ;
import axios from 'axios';
import Breadcrumbs from './components/DriveHeader/containers/Breadcrumbs';
import SortHeaderList from './components/FilesFoldersList/ListView/containers/SortHeaderList'
import moment from 'moment'
library.add( faHdd,faFile, faFolder, faPlus, faEdit,faTrash, faStar, faClock, faCaretDown, faCaretRight, faArrowDown, faArrowUp, faArrowRight );

const API ="https://drive-js-server2.herokuapp.com/"; //** Online */
// const API ="http://127.0.0.1:8000/"  //*** local */
const STAR = "star/"
const TRASH = "trash/"
const RENAME = "rename/"
const FILE_DIRECTORY = "filedirectory/"
const CREATE_FOLDER = "createdirectory/"
const FILE_UPLOAD_URL ="uploadfile/";

class DriveDashboard extends Component {
  constructor(props){
    super(props);

    this.state={
        filesandfolders:[],
        filesandfoldersFiltered:[],
        breadcrumbs:{
          id:'',
          title:''
        },
        showMsgFolderCreated:false,
        optionClicked: 'folder',
        optionActivated: "0",
        loading: true,
        itemID: "0",
        uploadProgress:0,          
          styles:{
            width:'0%',
          },
        id:1
    }
    this.driveExplorerItemClicked = this.driveExplorerItemClicked.bind(this)
  }

  //mount fileDirectory
  componentDidMount(){    
    axios.get(API+FILE_DIRECTORY)
    .then( (response) => {   
      const itemIdInteger = parseInt(0,10) //id value is integer so it needs to be converted before
      let values = this.getObjects(response.data, 'id', itemIdInteger);
      let filesandfoldersfiltered =values[0].children;
      filesandfoldersfiltered = filesandfoldersfiltered.filter(ff => ff.deleted===false)
      // console.log('from didmount')
      this.setState(
      {        
        filesandfolders: response.data,
        filesandfoldersFiltered:filesandfoldersfiltered,
        loading:false,
        itemID:response.data[0].id.toString(),
        breadcrumbs:{
          title:[response.data[0].title],
          id:[response.data[0].id]
        }
      })
    })
    .catch( (error) => {
      this.setState({
        loading:false,
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

//return an array of date objects according to key, value, or key and value matching
getObjectsDate(obj, key, val) {
  var objects = [];
  for (var i in obj) {    
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] === 'object') {
          objects = objects.concat(this.getObjectsDate(obj[i], key, val));    
      } else 
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if ((i === key && obj[i] >= val) || (i === key && val === '')) { //
          objects.push(obj);
      } else if (obj[i] >= val && key === ''){
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
      this.handleDriveExplorerItemClick(this.state.itemID, newElement, undefined)
      setTimeout(this.changeFolderMessageState,5000)
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

  changeFolderMessageState = () => {
    this.setState({
      showMsgFolderCreated:false
    })
  }

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
          this.handleDriveExplorerItemClick(this.state.itemID, newElement, undefined)
          // this.props.onFormSubmit(this.state.file)
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error)
        })    
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

  // UPDATE item name block
  handleUpdateFormSubmit = (formAtts) => {
    this.updateItemName(formAtts)
    // console.log(formAtts.id)
    // console.log(formAtts.name)
    // const targetDirectory = JSON.stringify(this.state.breadcrumbs.title)
    // console.log(targetDirectory)
  }

  updateItemName = (formAtts) => {
    const targetDirectory = JSON.stringify(this.state.breadcrumbs.title)
    axios.post(API + RENAME, {
      id:formAtts.id,
      title:formAtts.name,
      targetDirectory:targetDirectory,
    })
    .then((response) => {
      const filesandfoldersFiltered= this.state.filesandfoldersFiltered.map((filefolder) =>{
        if (filefolder.id === formAtts.id){
          return Object.assign({}, filefolder, {
            title: formAtts.name,            
          });
        } else {
          return filefolder;
        }
      })
      let elementsFiltered =[]
      //filter items that has been deleted
      elementsFiltered = filesandfoldersFiltered.filter(ff => ff.deleted===false)
      this.setState({
        filesandfolders: response.data,
        filesandfoldersFiltered : elementsFiltered,
      })
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
    axios.put(API + TRASH + itemId, {
      deleted:true
    })
    .then( (response) => {
      console.log(response.data);
      //change deleted value to selected item
      const filesandfoldersFiltered = this.state.filesandfoldersFiltered.map((filefolder) =>{
        if (filefolder.id === itemId){
          return Object.assign({}, filefolder, {
            deleted: !filefolder.deleted,            
          });
        } else {
          return filefolder;
        }
      })

      let elementsFiltered =[]
      //filter items that has been deleted
      if (this.state.optionClicked==='trash'){
        elementsFiltered = filesandfoldersFiltered.filter(ff => ff.deleted===true)
      }else{
        elementsFiltered = filesandfoldersFiltered.filter(ff => ff.deleted===false)
      }
      this.setState({
        filesandfolders:response.data,
        filesandfoldersFiltered : elementsFiltered
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
    axios.put(API + STAR + itemId,{
      star: true,
    })
    .then( (response) => {
      //change star value to selected item
      const filesandfoldersFiltered= this.state.filesandfoldersFiltered.map((filefolder) =>{
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
      let elementsFiltered =[]
      //filter items that has been starred and are not deleted
      if (this.state.optionClicked==='starred'){
        elementsFiltered = filesandfoldersFiltered.filter(ff => ff.deleted===false && ff.star===true)
      }else{
        elementsFiltered = filesandfoldersFiltered.filter(ff => ff.deleted===false)
      }
      
      this.setState({
        filesandfolders:response.data,
        filesandfoldersFiltered : elementsFiltered
      })
    })
    .catch((error) => {
      console.log(error);
    })
    
  }


  // CLICK event handler for Starred Option of drive side bar component
  handleStarredOptionClick = (id) => {
    let filesAndFoldersStarred = this.getObjects(this.state.filesandfolders, 'star', true);
    const elementsFiltered = filesAndFoldersStarred.filter(ff => ff.deleted===false)
    this.setState({
      optionClicked: 'starred',
      optionActivated:id,
      filesandfoldersFiltered : elementsFiltered
    })
  }  
  
  // CLICK event handler for Recents Option of drive side bar component
  handleRecentsOptionClick = (id) => {
    let dateDaysAgo = moment().subtract(60, 'days').calendar()
    dateDaysAgo = new Date(dateDaysAgo)
    dateDaysAgo=moment(dateDaysAgo).format("YYYY-MM-DD")

    let filesAndFoldersRecents = this.getObjectsDate(this.state.filesandfolders, 'dateCreated', dateDaysAgo);
    const elementsFiltered= filesAndFoldersRecents.filter(ff => ff.deleted===false && ff.icon==="file");
    this.setState({   
      optionClicked: 'recents',
      optionActivated:id,
      filesandfoldersFiltered : elementsFiltered
    })
  }
  
  // CLICK event handler for Trash Option of drive side bar component
  handleTrashOptionClick = (id) => {
    let elementsFiltered = this.getObjects(this.state.filesandfolders, 'deleted', true);
    // const elementsFiltered = this.state.filesandfolders.filter(ff => ff.deleted === true );
    this.setState({
      optionClicked: 'trash',
      optionActivated:id,
      filesandfoldersFiltered : elementsFiltered
    })
  }

  handleDriveExplorerItemClick = (itemID, newElement, pathIDs) => {
    this.driveExplorerItemClicked(itemID, newElement, pathIDs)
  }

  driveExplorerItemClicked = (itemID, newElement, pathIDs) => {
      const itemIdInteger = parseInt(itemID,10) //id value is integer so it needs to be converted before
      let values = this.getObjects(this.state.filesandfolders, 'id', itemIdInteger);
      let filesandfoldersfiltered =[];
      
      if (newElement !== undefined  && values[0].hasChildren){
          values[0].children =values[0].children.concat(newElement)
          filesandfoldersfiltered = values[0].children
      }else if (newElement !== undefined  && !values[0].hasChildren){
          values[0].hasChildren=true;
          values[0].children = newElement
          filesandfoldersfiltered = values[0].children
      }else{
          filesandfoldersfiltered = values[0].children
      }

      filesandfoldersfiltered = filesandfoldersfiltered.filter(ff => ff.deleted===false)
      //fill breadcrumbs data
      // console.log(pathIDs)
      // console.log('pathIDs.length')
      console.log(filesandfoldersfiltered)
      let ids = []
      let titles = []
      if (pathIDs!==undefined){
        ids = pathIDs.map((path) =>{
          return path.id
        })
        titles = pathIDs.map((path) =>{
          return path.title
        })
      }else{
        ids= this.state.breadcrumbs.id
        titles= this.state.breadcrumbs.title
      }

      this.setState({
        optionClicked: 'folder',
        filesandfoldersFiltered:filesandfoldersfiltered,
        breadcrumbs:{
          title: titles,
          id: ids,
        },
        optionActivated:itemID.toString(),
        itemID:itemID.toString(),
      })
        
  }

  //Double click event handler for list element of file folder list
  handleDoubleClickListElement = (listElementId) =>{
    this.doubleClickListElement(listElementId)
  }

  doubleClickListElement = (itemID) => {

    // get children for folder clicked 
    let values = this.getObjects(this.state.filesandfolders, 'id',itemID);
    let filesandfoldersfiltered =[];
      
    filesandfoldersfiltered = values[0].children
    filesandfoldersfiltered = filesandfoldersfiltered.filter(ff => ff.deleted===false)

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
//Breadcrumb component
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

  let elementsFiltered =[]
  //filter items that has been deleted
  elementsFiltered = filesandfoldersfiltered.filter(ff => ff.deleted===false)

  this.setState({
    optionClicked: 'folder',
    filesandfoldersFiltered:elementsFiltered,
    breadcrumbs:{
      title: this.state.breadcrumbs.title,
      id: this.state.breadcrumbs.id,
    },
    optionActivated:itemID,
    itemID:itemID,
  })

}
//SORT header component block

//sort by name
handleSortNameHeaderClick = (direction) => {
  this.clickSortNameHeader(direction)
}

clickSortNameHeader = (direction) => {
  
  let filesAndFoldersSorted = this.state.filesandfoldersFiltered.sort(this.compare)
  filesAndFoldersSorted=direction?filesAndFoldersSorted:filesAndFoldersSorted.reverse()
  this.setState({
    filesandfoldersFiltered:filesAndFoldersSorted
  })
}
  
compare = (a,b) => {
  if (a.title < b.title)
    return -1
  else if (a.title > b.title)
    return 1
  else
    return 0
}

//sort by date
handleSortDateHeaderClick = (direction) => {
  this.clickSortDateHeader(direction)
}

clickSortDateHeader = (direction) => {
  
  let filesAndFoldersSorted = this.state.filesandfoldersFiltered.sort(this.compareDate)
  filesAndFoldersSorted=direction?filesAndFoldersSorted:filesAndFoldersSorted.reverse()
  this.setState({
    filesandfoldersFiltered:filesAndFoldersSorted
  })
}
  
compareDate = (a,b) => {
  const dateA = new Date(a.dateCreated)
  const dateB = new Date(b.dateCreated)
  return dateA - dateB
}

//SearchBox on change event handler
handleOnSearchBoxChange = (e) => {
  // get children for folder clicked 
  let values = this.getObjects(this.state.filesandfolders, 'title',e.target.value);
  let filesandfoldersfiltered =[];
  console.log(values)
  if (values.length > 0)
    filesandfoldersfiltered = values

  if (filesandfoldersfiltered!==undefined)
  {
    this.setState({
      filesandfoldersFiltered:filesandfoldersfiltered,
    })
  }
   
  console.log(e.target.value)
}

  render() {
    
    return (<div className="container">
          <DriveHeader 
            showMsgFolderCreated={this.state.showMsgFolderCreated} 
            onFileUploadFormSubmit={this.handleFileUploadFormSubmit} 
            onFolderFormSubmit={this.handleCreateFolderFormSubmit}
            onSearchBoxChange={this.handleOnSearchBoxChange}
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
            <div className="col-md-9">
            <SortHeaderList 
              onSortNameHeaderClick={this.handleSortNameHeaderClick} 
              onSortDateHeaderClick={this.handleSortDateHeaderClick}
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
      </div>
    );
  }
}

export default DriveDashboard;
