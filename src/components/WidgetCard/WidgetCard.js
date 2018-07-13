import React from 'react'

class WidgetCard extends React.Component {

	constructor(props, context) {
		super(props, context);	
	}

	componentDidMount() {

	}
	
    render() {  
    	const noItemsClass = this.props.noItems ? 'card-no-items no-padding' :  '';
    	const noPadding = this.props.noPadding ? 'p-0' :  '';
    	const id = this.props.id ?  this.props.id : null;

    	return (
		    <div id={id} className={"card " + noItemsClass } >

		     	{ this.props.loading &&  (

				     	<div className="card-loading">
			                 <div>
			                    <div className="text-center">
			                        <i className='fa fa-spin fa-circle-o-notch'></i>
			                    </div>
		                        <div className="text-center ">
		                        	<h2>{this.props.loadingText}</h2>   
		                        </div>
			                 </div>
		              	</div>
		     		)
		     		 
              	}

              	{ this.props.showHeader && (
			            <div className="card-header">
			                <div className="d-flex justify-content-between align-items-center">
								<div>
					                <img className="card-title-icon" src={this.props.iconImg} alt=""/>
					                <h4 className="card-title"> {this.props.title} </h4>
								</div>	
								<div> 
									 { this.props.cardOptions && this.props.cardOptions() }
								</div>
			                </div>
			            </div>
              		)
              	}

	            <div className={"card-block " + noPadding}>
		            { this.props.widgetOptions &&

		            	<div className="widget-options">
		            		{ this.props.widgetOptions}
		            	</div>
		            }
	            	<div>
	           			{ this.props.children }
	           		</div>
	            </div>
	    	</div>
	    )
    }

}
WidgetCard.defaultProps = {
  showHeader: true,
  noPadding: false
};

export default WidgetCard;