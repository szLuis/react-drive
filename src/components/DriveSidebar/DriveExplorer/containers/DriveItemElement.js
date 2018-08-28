import { Component } from 'react'
import DriveItemElementTemplate from '../templates/DriveItemElementTemplate.rt'

class DriveItemElement extends Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen:false,
        }
        this.handleDriveExplorerItemClick = this.handleDriveExplorerItemClick.bind(this)
        this.handleCaretClick = this.handleCaretClick.bind(this)
    }
    
    handleDriveExplorerItemClick = (e) => {
        // console.log("..." + this.props.id)
        // console.log('this.props.path')
        // console.log(this.props.path)
        // const pathURL = this.props.path.title
        // const pathIDs = this.props.path.id

        this.props.onItemClick(this.props.id, undefined,this.props.path) // undefined newelement
        this.driveExplorerItemActive(e)
    }

    driveExplorerItemActive = (e) => {
        this.props.onOptionClick(e)
    }

    handleCaretClick = (e) => {
        this.setState({
            isOpen:!this.state.isOpen,
        })
    }

    render(){
        return DriveItemElementTemplate.apply(this)
    }
}

export default DriveItemElement