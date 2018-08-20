import React, {Component} from 'react';

export class FileUploadForm extends Component{
    constructor(props) {
        super(props);
        this.state ={
          file:null,            
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
      }
      onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.props.onFileUploadFormSubmit(this.state.file)
        
      }
      onChange(e) {
        this.setState({
          file:e.target.files[0],
        })
        
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
                        <div className={this.props.uploadProgress > 0 &&  this.props.uploadProgress < 99 ? 'progress visible': 'progress invisible'} >
                          <div className='progress-bar' role="progressbar" style={this.props.styles} aria-valuenow={this.props.uploadProgress} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className={this.props.uploadProgress===100 ? 'alert alert-success visible' : 'alert alert-success invisible'} role="alert">
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