import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const styles={
    position:"inherit"
}
class SortHeaderList extends Component {
    constructor(props){
        super(props)

        this.state={
            sortByNameUp:true,
            sortByDateUp:null
        }
    }
    
    handleSortNameHeaderClick = () => {
        this.setState({
            sortByNameUp:!this.state.sortByNameUp
        })
        this.props.onSortNameHeaderClick(this.state.sortByNameUp)        
    }
    handleSortDateHeaderClick = () => {
        console.log('SortDateHeader Clicked')
    }

    render(){
        return(<div className="col-md-12">
                    <nav className="nav bg-light">
                        <a className="nav-link  w-40" onClick={this.handleSortNameHeaderClick} href="javascript:void(0)">Name <FontAwesomeIcon style={styles} icon={this.state.sortByNameUp?"arrow-up":"arrow-down"} /></a>
                        <a className="nav-link  w-60"onClick={this.handleSortDateHeaderClick} href="javascript:void(0)">Date <FontAwesomeIcon  style={styles} icon="arrow-down"/></a>
                    </nav>
                </div>
                )
    }
}

export default SortHeaderList