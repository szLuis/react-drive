import React, { Component } from "react"
import DriveItemElement from './DriveItemElement'

class DriveExplorer extends Component{
     
    
    getChildrenElements = (items, parents) => {
        let result = [];
        let resultChild = []
        let path = []
        let childPath =[]
        let pathItem={
            // id:[],
            title:[]
        }
        let pathChildItem={
            // id:[],
            title:[]
        }
        
        // console.log("parents->" )
        // console.log( parents)
        const elements = items.map((item) => {
            // pathItem['id'] = item.id
            // pathItem['title'] = item.title
            pathItem.id = item.id
            pathItem.title = item.title
            // console.log('pathItem')
            // console.log(pathItem)
            // console.log('parents')
            // console.log(parents)
            if (parents===undefined){                
                path=path.concat(pathItem)
                // path = pathItem
            }else{
               path=path.concat(parents,pathItem)
            }
            // console.log('path')
            // console.log(path)
            
            // if (parents===undefined){                
            //     path = path.concat( item.title)
            // }else{
            //     path = path.concat(parents,  item.title)
            // }
                
            result = []
            childPath = []
            //checking if item has children     
            if (item.hasChildren){   
                
                
                let childrenElementsFiltered = item.children.filter(ff => ff.icon === 'folder')
                    childrenElementsFiltered.map((child) => {
                        pathChildItem={
                            id:[],
                            title:[]
                        }
                           
                        childPath=[] 
                        // pathChildItem['id'] = child.id
                        // pathChildItem['title'] = child.title   
                        pathChildItem.id = child.id
                        pathChildItem.title = child.title   

                        // childPath=childPath.concat(path, {title:child.title, id:child.id})
                        childPath=childPath.concat(path, pathChildItem)
                        // path.push(pathChildItem)
                        // console.log('path')
                        // console.log(path[0])

                        if (child.hasChildren){ 
                            const childElementsFiltered = child.children.filter(ff => ff.icon === 'folder')
                            
                            resultChild = resultChild.concat (this.getChildrenElements(childElementsFiltered, childPath));
                        } 
                        
                        result = result.concat (<DriveItemElement
                                                    path={childPath}
                                                    id={child.id.toString()}
                                                    key={child.id}
                                                    title={child.title}
                                                    children={resultChild} 
                                                    onItemClick={this.props.onItemClick}
                                                    onOptionClick={this.props.onOptionClick}
                                                    optionActivated={this.props.optionActivated}
                                                />)
                                        
                        resultChild =[]
                    })
                    
            }else{
                
                path = path.concat(parents, pathItem)
                // path.push(pathItem)
                return (<DriveItemElement
                            path={path}
                            id={item.id.toString()}
                            key={item.id}
                            title={item.title} 
                            onItemClick={this.props.onItemClick}
                            onOptionClick={this.props.onOptionClick}
                            optionActivated={this.props.optionActivated}
                        />)
                    
            }           
            
            return(<DriveItemElement
                        path={path}
                        id={item.id.toString()}
                        key={item.id}
                        title={item.title}
                        children={result} 
                        onItemClick={this.props.onItemClick}
                        onOptionClick={this.props.onOptionClick}
                        optionActivated={this.props.optionActivated}
                    />)
        })
        return elements;
    }
    

    render(){
        const itemElementsFiltered =  this.props.filesandfolders.filter(ff => ff.icon === 'folder')
        const itemElements = this.getChildrenElements(itemElementsFiltered);
        return (
            <div> 
                <ul className="list-group">
                    {itemElements}
                </ul>                
            </div>            
        )
    }
}

export default DriveExplorer