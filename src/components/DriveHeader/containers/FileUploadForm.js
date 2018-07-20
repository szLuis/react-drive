import React, {Component} from 'react';
import {post} from 'axios';

const API ="http://127.0.0.1:8000/uploadfile";

class FileUploadForm extends Component{
    constructor(props) {
        super(props);
        this.state ={
          file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
      }
      onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
          console.log(response.data);
        })
      }
      onChange(e) {
          console.log('changed');
        this.setState({file:e.target.files[0]})
      }
      fileUpload(file){
        const url = API;
        // const formData = new FormData();
        // formData.append('file',file)
        const formData = {file: this.state.file}
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Access-Control-Allow-Origin': 'uploadfile',
                'method': 'POST'
            }
        }
        //return  post(url, formData, config)
        return  post(url, formData, config)
                .then(response => console.log(response))
    }

    render() {
        return (
          <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" onChange={this.onChange} />
            <button type="submit">Upload</button>
          </form>
       )
    }
}

export default FileUploadForm;