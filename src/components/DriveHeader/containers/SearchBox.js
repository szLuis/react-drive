import { Component } from 'react'
import SearchBoxTemplate from '../templates/SearchBoxTemplate.rt'

export class SearchBox extends Component{

    

    handleOnChange = (e) =>
    {
        this.props.onSearchBoxChange(e)
        
    }

    render(){
        return SearchBoxTemplate.apply(this)
    }
}

export default SearchBox