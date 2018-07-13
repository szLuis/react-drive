import React from 'react'
import NoItemsCardTemplate from '../templates/NoItemsCardTemplate.rt'

class NoItemsCard extends React.Component {

	constructor(props, context) {
		super(props, context);	
	}

    render() {  
		//var template = require("../templates/NoItemsCardTemplate.rt")
    	return NoItemsCardTemplate.apply(this);
			
	    
    }

}

export default NoItemsCard;