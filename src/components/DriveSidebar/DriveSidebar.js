import React, {Component} from 'react';
import DriveStorageInfo from './DriveStorageInfo/containers/DriveStorageInfo';
import DriveOptionsList from './DriveOptionsList/containers/DriveOptionsList';
import DriveExplorer from './DriveExplorer/containers/DriveExplorer';


class DriveSidebar extends Component{
    constructor(props){
        super(props)

        this.state = {
            optionActivated: 'mydrive',
        }
        this.handleSidebarOptionClick = this.handleSidebarOptionClick.bind(this)
        this.sidebarOptionClicked = this.sidebarOptionClicked.bind(this)
    }

    handleSidebarOptionClick = ( (option) =>{
        this.sidebarOptionClicked(option)
    })

    sidebarOptionClicked = ( (option) => {        
        this.setState({
            optionActivated:option.target.id,
        })
    })

    render() {
        return (
            <div className="col-md-3">
                <ul className="list list-group list-attrs" >
                    <DriveExplorer 
                        onItemClick={this.props.onDriveExplorerItemClick}
                        filesandfolders={this.props.filesandfolders}
                        onOptionClick={this.handleSidebarOptionClick}
                        optionActivated={this.state.optionActivated}
                    />
                    <DriveOptionsList 
                        onOptionClick={this.handleSidebarOptionClick}
                        onStarredOptionClick={this.props.onStarredOptionClick} 
                        onRecentsOptionClick={this.props.onRecentsOptionClick} 
                        onTrashOptionClick={this.props.onTrashOptionClick} 
                        optionActivated={this.state.optionActivated}
                    />
                    <DriveStorageInfo/>
                </ul>
            </div>
        );
    }
}

export default DriveSidebar;