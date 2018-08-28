import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const styles={
    position:"inherit"
}
class SortHeaderList extends Component {
    
    handleHeaderClck = () => {
        
    }

    render(){
        return(<div className="col-md-12">
                    <nav className="nav bg-light">
                        <a className="nav-link  w-40" onClick={this.handleHeaderClck} href="javascript:void(0)">Name <FontAwesomeIcon style={styles} icon="arrow-up"/></a>
                        <a className="nav-link  w-60" href="javascript:void(0)">Date <FontAwesomeIcon  style={styles} icon="arrow-down"/></a>
                    </nav>
                </div>
                )
    }
}

export default SortHeaderList