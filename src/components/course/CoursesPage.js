import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      course: {title: ""}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave(event) {
    const course = this.state.course;
    this.props.createCourse(course);

    course.title = '';
    this.setState({course: course});
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input type="text"
               value={this.state.course.title}
               onChange={this.onTitleChange}
        />
        <input type="submit"
               value="Save"
               onClick={this.onClickSave}
        />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  createCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {courses: state.courses};
}

function mapDispatchToProps(dispatch) {
  return {
    createCourse: course => dispatch(courseActions.createCourse(course))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
