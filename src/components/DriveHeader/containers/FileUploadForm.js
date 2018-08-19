import React, {Component} from 'react';
import axios from 'axios';

const API ="http://127.0.0.1:8000/uploadfile/";
const FORM_TYPE = 'file'

export class FileUploadForm extends Component{
    constructor(props) {
        super(props);
        this.state ={
          file:null,
          uploadProgress:0,          
          styles:{
            width:'0%',
          }      
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
      }
      onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.props.onFormSubmit(this.state.file, FORM_TYPE)
        this.fileUpload(this.state.file)
        .then((response)=>{
          this.props.onFormSubmit(this.state.file, FORM_TYPE)
          console.log(response.data);
        }).catch((error) => {
          console.log(error)
        })
      }
      onChange(e) {
        this.setState({
          file:e.target.files[0],
        })
        
      }
      fileUpload(file){
        const url = API;
        const formData = new FormData();
        formData.append('file',file)
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

    render() {
        return (
          <div className="container ">
                <div className="row ">
                    <div className="col"></div>
                    <div className="col-md-6">
                        <form onSubmit={this.onFormSubmit}>
                          <div className="form-group">
                              <label htmlFor="fileName">Upload File: </label>
                              <input type="file" className="form-control" onChange={this.onChange} />
                              <button type="submit" className="btn btn-success" disabled={!this.state.file} >Upload</button>
                              <button type="button" className="btn btn-primary mr-2" onClick={this.props.onFormClose}>Cancel</button>
                          </div>
                        </form>
                        <div className={this.state.uploadProgress > 0 &&  this.state.uploadProgress < 99 ? 'progress visible': 'progress invisible'} >
                          <div className='progress-bar' role="progressbar" style={this.state.styles} aria-valuenow={this.state.uploadProgress} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className={this.state.uploadProgress===100 ? 'alert alert-success visible' : 'alert alert-success invisible'} role="alert">
                          File upload completed!
                        </div>
                    </div>
                  <div className="col"></div>
                  
              </div>
          </div>
          
          
       )
    }
}

export default FileUploadForm;
/* <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form> */