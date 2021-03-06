'user strict';

import React from 'react';
import ButtonEdit from '../buttons/button-edit';

//receives id and text
export default class FieldDisplay extends React.Component{

	//receives id and text
	render(){
		return(
			<p className="displayField">{this.props.text}
			<ButtonEdit onEdit={this.props.onEdit} />
			</p>
		);
	}
	
}