import { Component } from 'react'
import DriveItemElementTemplate from '../templates/DriveItemElementTemplate.rt'

class DriveItemElement extends Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen:false,
        }
        this.handleItemClick = this.handleItemClick.bind(this)
    }
    
    handleItemClick = (e) => {
        console.log('item clicked' + e.target.id)
        
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