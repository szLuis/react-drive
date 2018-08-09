import React, {Component} from 'react';
import axios from 'axios';

const API ="http://127.0.0.1:8000/uploadfile/";
const FORM_TYPE = 'file'

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
        }       
        return axios.post(url, formData, config)
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
