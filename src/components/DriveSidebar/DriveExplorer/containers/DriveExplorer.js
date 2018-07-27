import React, { Component } from "react"
import DriveItemElement from './DriveItemElement'

class DriveExplorer extends Component{
    constructor(props){
        super(props)
        
    }   
    
    

    render(){
        const itemElementsFiltered =  this.props.filesandfolders.filter(ff => ff.icon === 'folder')
        const itemElements = itemElementsFiltered.map((item) => {
       
            
            if (item.hasChildren){
                const childrenElementsFiltered =  item.children.filter(ff => ff.icon === 'folder')
                const childrenElements =childrenElementsFiltered.map((child) => {
                    return <DriveItemElement
                    id={child.id}
                    key={child.id}
                    title={child.title}
                    
                />
                })

                console.log(childrenElements)
                return <DriveItemElement
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    children={childrenElements}
                    
                />
            }else{
                console.log(item.title);
                return <DriveItemElement
                    id={item.id}
                    key={item.id}
                    title={item.title}                    
                    />
            }
            
        })
        console.log(itemElements)
        return (
            <div> <li class="list-group-item borderless"  id="0">Drive<ul className="list-group ">
                {itemElements}
                </ul>
                </li>
            </div>            
        )
    }
}

export default DriveExplorer