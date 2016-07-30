import React from 'react';
import DeleteButton from '../buttons/button-delete';
import ButtonSubscribe from '../buttons/button-subscribe';
import FieldDisplay from '../fields/field-display';
import FieldEdit from '../fields/field-edit';

//receives courseId and courseName
export default class CourseTeacher extends React.Component{

	constructor(){
		super();
		this.state = {
			fieldIsInEditMode: false,
			isSubscribed: false
		}

	}
	
	//receives courseId and courseName
	render(){
		let displaySubscr = this._displaySubscrButton();
		if (this.state.fieldIsInEditMode === false) {
			return (<div className="courseContainer">
						<FieldDisplay id={this.props.courseId} text={this.props.courseName} 
						onEdit={this._handleEdit.bind(this)} />
						{displaySubscr}
						<DeleteButton id={this.props.courseId} onDelete={this.props.onDelete} /></div>);
		} else {
			return (<div className="courseContainer"><FieldEdit id={this.props.courseId} text={this.props.courseName} 
						onSave={this._handleSave.bind(this)} onChange = {this.props.onChange} />
						<DeleteButton id={this.props.courseId} onDelete={this.props.onDelete} /></div>);
		}
	}

	_displaySubscrButton(){
		let cookie = document.cookie;
		if (cookie !== "" && this.state.isSubscribed === false) {
			return (<ButtonSubscribe subscribeUser = {this.props.subscribeUser} courseId = {this.props.courseId}
						handleSubscribe = {this._handleSubscribe.bind(this)} />);
		}
	}

	_handleSubscribe(){
		this.setState({isSubscribed: true});
	}

	//receives courseId and courseName
	_handleEdit(){
		this.setState({fieldIsInEditMode: true});
	}

	//receives courseId and courseName
	_handleSave(){
		this.setState({fieldIsInEditMode: false});
	}
}