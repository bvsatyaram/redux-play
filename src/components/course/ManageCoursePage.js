import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saveInProgress: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;

    return this.setState({course});
  }

  courseFormIsValid() {
    let isValid = true;
    let errors = {};

     if (this.state.course.title.length < 5) {
       errors.title = 'Title must be at least 5 characters long.';
       isValid = false;
     }

     this.setState({errors});
     return isValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if(!this.courseFormIsValid()) {
      return;
    }

    this.setState({saveInProgress: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirectToIndex())
      .catch(error => {
        toastr.error(error);
        this.setState({saveInProgress: false});
      });
  }

  redirectToIndex() {
    this.setState({saveInProgress: false});
    this.context.router.push('/courses');
    toastr.success('Course saved successfully');
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        errors={this.state.errors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        allAuthors={this.props.authors}
        saving={this.state.saveInProgress}/>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const arr = courses.filter(course => {return course.id == id;});
  return ((arr.length > 0) ? arr[0] : null);
}

function mapStateToProps(state, ownProps) {
  let course;
  const courseId = ownProps.params.id;

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  } else {
    course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
