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
        console.log('DriveExplorer item clicked' + e.target.id)
        
        this.props.onItemClick(e.target.id)
        this.driveExplorerItemActive(e)
    }

    driveExplorerItemActive = (e) => {
        this.props.onOptionClick(e)
    }

    handleCaretClick = (e) => {
        console.log('caret clicked' + e.target.id)
        
        this.setState({
            isOpen:!this.state.isOpen,
        })
        console.log(this.state.isOpen)
    }

    render(){
        return DriveItemElementTemplate.apply(this)
    }
}

export default DriveItemElement