import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToggleableDriveContextualMenuTemplate from '../templates/ToggleableDriveContextualMenuTemplate.rt';
import onClickOutside from 'react-onclickoutside';


class ToggleableDriveContextualMenu extends Component  {
    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
        }

        this.toggleMenu = this.toggleMenu.bind(this);

    }
    toggleMenu(){
        this.setState({
            isOpen:!this.state.isOpen,

        })
    }

    handleClickOutside(){
        this.setState({
            isOpen: false,
        })
    }

    render(){
        return ToggleableDriveContextualMenuTemplate.apply(this);
    }
}

export default onClickOutside(ToggleableDriveContextualMenu);