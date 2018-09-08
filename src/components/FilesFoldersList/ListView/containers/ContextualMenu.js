import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
const styles={
    display: "block",
}
export class ContextualMenu extends Component{
    handleClickOutside(){
        this.setState({
            isOpen: false,
        })
    }

    handleClick = () => {
        console.log('action clicked')
    }

    render(){
        return (<div className="dropdown dropdown-menu-right" onClick={this.toggleMenu}>
                    <div className="dropdown-menu" rt-if="this.state.isOpen" style={styles}  aria-labelledby="dropdownMenuButton">
                        <button type="button" onClick={this.handleClick}  className="dropdown-item"  >Action</button>
                        <a className="dropdown-item" href="">Upload a file</a>
                        <a className="dropdown-item" href="">Create a folder</a>
                    </div>
                </div>)
    }
}

export default onClickOutside(ContextualMenu)
