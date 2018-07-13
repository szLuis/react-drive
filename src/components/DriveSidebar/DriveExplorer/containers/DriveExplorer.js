import { Component } from "react";
import DriveExplorerTemplate from '../templates/DriveExplorerTemplate.rt';

class DriveExplorer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return DriveExplorerTemplate.apply(this);
    }
}

export default DriveExplorer;