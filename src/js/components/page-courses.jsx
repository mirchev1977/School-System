import React from 'react';
import jQuery from 'jquery';
// import Course from './course';
import ButtonCreate from './button-create';
import FieldEdit from './field-edit';
import CourseTeacher from './course-teacher';


export default class PageCourses extends React.Component{

	constructor(){
		super();

		this.state = {
			courses: [],
			isCreatingNew: false
		};
	}

	render(){
		let courses = this._getCourses();
		let editField = this._revealNewCourseField();

		return (<div className="courses-container">
					<h1>Hello World From Page Courses.</h1>
					{editField}
					{courses}
				</div>);
	}


	_createNewCourse(){
		this.setState({isCreatingNew: true});
		console.log(this.state.isCreatingNew);
	}

	_revealNewCourseField(){
		if (!this.state.isCreatingNew) {
			return <ButtonCreate createNew={this._createNewCourse.bind(this)} />;
		} else {
			return <FieldEdit onSave={this._saveNewCourse.bind(this)}/>
		}
	}

	_saveNewCourse(courseName){
		jQuery.ajax({
		  method: 'POST',
		  url: '/api/courses',
		  headers: {
                'Authorization': 'bearerU2FsdGVkX185JuJ70Oq38E0Y4Ip96ozN2/kHBGkL2lwUQtbSfdOoVA7'+
                '2oFCvAQL9lYcIJdrNvOuOHt37UtQRUaqEuHKCuyeVS9o35/j4EMo6vhA2sx13yIQDg9ZSZsVc'
            },
            data: "name=" + courseName,
		  success: () => {
		  	this.setState({isCreatingNew:false});
		  }
		});
	}

	_getCourses(){
		return this.state.courses.map((course) => 
		{ return <CourseTeacher courseId={course.id} onDelete = {this._deleteCourse.bind(this)}
		courseName={course.name} onChange={this._handleFieldChange.bind(this)} key={course.id} />});
	}

	_handleFieldChange(courseId, courseText){
		this._updateCourseDb('/api/courses/' + courseId, courseText);
		let courses = this.state.courses;
		courses = courses.slice();
		let current = courses[courseId];
		current.name = courseText;
		courses[courseId] = current;
	}


	componentWillMount() {
		this._fetchCourses();
	}


	componentDidMount() {
		this._timer= setInterval(
		() => this._fetchCourses(),
		10000);
	}

	componentWillUnmount() {
		clearInterval(this._timer);
	}


	_fetchCourses() {
		jQuery.ajax({
		  method: 'GET',
		  url: this.props.apiUrl,
		  success: (courses) => {
		    this.setState({courses});
		  }
		});
	}

	_deleteCourseDb(url) {
		jQuery.ajax({
		  method: 'DELETE',
		  url: url,
		  headers: {
                'Authorization': 'bearerU2FsdGVkX185JuJ70Oq38E0Y4Ip96ozN2/kHBGkL2lwUQtbSfdOoVA7'+
                '2oFCvAQL9lYcIJdrNvOuOHt37UtQRUaqEuHKCuyeVS9o35/j4EMo6vhA2sx13yIQDg9ZSZsVc'
            },
		  success: () => {
		    this._fetchCourses();
		  }
		});
	}

	_updateCourseDb(url, courseText) {
		jQuery.ajax({
		  method: 'PUT',
		  url: url,
		  headers: {
                'Authorization': 'bearerU2FsdGVkX185JuJ70Oq38E0Y4Ip96ozN2/kHBGkL2lwUQtbSfdOoVA7'+
                '2oFCvAQL9lYcIJdrNvOuOHt37UtQRUaqEuHKCuyeVS9o35/j4EMo6vhA2sx13yIQDg9ZSZsVc'
            },
            data: "name=" + courseText,
		  success: () => {
		  }
		});
	}

	_deleteCourse(courseId){
		let courses = this.state.courses.filter(function(course){
			return course.id !== courseId;
		});

		this._deleteCourseDb('/api/courses/' + courseId);

		this.setState({courses: courses});
	}

}

PageCourses.propTypes = {
  apiUrl: React.PropTypes.string.isRequired
}