import React, { Component } from "react"
import DriveItemElement from './DriveItemElement'

class DriveExplorer extends Component{
     
    
    getChildrenElements = (items, parents) => {
        let result = [];
        let resultChild = []
        let path = []
        let childPath =[]
        let pathItem={
            id:[],
            title:[]
        }
        let pathChildItem={
            id:[],
            title:[]
        }
        
        const elements = items.map((item) => {
            path = []
            pathItem={
                id:[],
                title:[]
            }
            pathItem.id = item.id
            pathItem.title = item.title
            
            if (parents===undefined){                
                path=path.concat(pathItem)
            }else{
               path=path.concat(parents,pathItem)
            }
            result = []
            
            if (item.hasChildren){   
                
                 
                let childrenElementsFiltered = item.children.filter(ff => ff.icon === 'folder')
                    childrenElementsFiltered.map((child) => {
                        pathChildItem={
                            id:[],
                            title:[]
                        }                      
                                                
                        pathChildItem.id = child.id
                        pathChildItem.title = child.title  
                         
                        childPath=[] 
                        childPath=childPath.concat(path, pathChildItem)
                        
                        // 
                        if (child.hasChildren){ 
                            const childElementsFiltered = child.children.filter(ff => ff.icon === 'folder')
                            resultChild = resultChild.concat (this.getChildrenElements(childElementsFiltered, childPath));
                        } 
                        result = result.concat (<DriveItemElement
                                                    path={childPath}
                                                    id={child.id.toString()}
                                                    key={child.id}
                                                    deleted={child.deleted}
                                                    title={child.title}
                                                    children={resultChild} 
                                                    onItemClick={this.props.onItemClick}
                                                    optionActivated={this.props.optionActivated}
                                                />)
                                        
                        resultChild =[]
                        
                    })
                    
            }else{
                
                // path = path.concat(parents, pathItem)
                return (<DriveItemElement
                            path={path}
                            id={item.id.toString()}
                            key={item.id}
                            deleted={item.deleted}
                            title={item.title} 
                            onItemClick={this.props.onItemClick}
                            optionActivated={this.props.optionActivated}
                        />)
                    
            }           
            
            return(<DriveItemElement
                        path={path}
                        id={item.id.toString()}
                        key={item.id}
                        title={item.title}
                        deleted={item.deleted}
                        children={result} 
                        onItemClick={this.props.onItemClick}
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