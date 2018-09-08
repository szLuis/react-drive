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
    
    handleSortNameHeaderClick = (e) => {
        e.preventDefault()
        this.setState({
            sortByNameUp:!this.state.sortByNameUp
        })
        this.props.onSortNameHeaderClick(this.state.sortByNameUp)        
    }
    handleSortDateHeaderClick = (e) => {
        e.preventDefault()
        this.setState({
            sortByDateUp:!this.state.sortByDateUp
        })
        this.props.onSortDateHeaderClick(this.state.sortByDateUp)  
    }

    render(){
        return(<div className="col-md-12">
                    <nav className="nav bg-light">
                        <a className="nav-link  w-50" onClick={this.handleSortNameHeaderClick} href="">Name <FontAwesomeIcon style={styles} icon={this.state.sortByNameUp?"arrow-up":"arrow-down"} /></a>
                        <a className="nav-link  w-30" onClick={this.handleSortDateHeaderClick} href="">Date <FontAwesomeIcon style={styles} icon={this.state.sortByDateUp?"arrow-up":"arrow-down"} /></a>
                    </nav>
                </div>
                )
    }
}

export default SortHeaderList