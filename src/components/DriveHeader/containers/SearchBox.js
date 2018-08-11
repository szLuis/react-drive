import { Component } from 'react'
import SearchBoxTemplate from '../templates/SearchBoxTemplate.rt'

export class SearchBox extends Component{
    render(){
        return SearchBoxTemplate.apply(this)
    }
}

export default SearchBox