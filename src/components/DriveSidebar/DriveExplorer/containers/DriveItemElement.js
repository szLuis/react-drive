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
        this.props.onItemClick(this.props.id, undefined,this.props.path) // undefined newelement
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