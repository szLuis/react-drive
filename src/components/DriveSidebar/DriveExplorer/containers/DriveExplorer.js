import React, { Component } from "react"
import DriveItemElement from './DriveItemElement'

class DriveExplorer extends Component{
    constructor(props){
        super(props)        
       
    }  
    
    getChildrenElements = (items) => {
        let result = [];
        let resultChild = []
        const elements = items.map((item) => {
            //checking if item has children     
            if (item.hasChildren){                
                result = []
                let childrenElementsFiltered = item.children.filter(ff => ff.icon === 'folder')
                    childrenElementsFiltered.map((child) => {
                        if (child.hasChildren){ 
                            const childElementsFiltered = child.children.filter(ff => ff.icon === 'folder')
                            resultChild = resultChild.concat (this.getChildrenElements(childElementsFiltered));
                        } 
                        result = result.concat (<DriveItemElement
                                                    id={child.id}
                                                    key={child.id}
                                                    title={child.title}
                                                    children={resultChild} 
                                                    onItemClick={this.props.onItemClick}
                                                />)
                                        
                        resultChild =[]
                    })
                    
            }else{
                
                return (<DriveItemElement
                            id={item.id}
                            key={item.id}
                            title={item.title} 
                            onItemClick={this.props.onItemClick}
                        />)
                    
            }            
            
            return(<DriveItemElement
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        children={result} 
                        onItemClick={this.props.onItemClick}
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