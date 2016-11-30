import expect from 'expect';
import courseReducer from './courseReducer';
import * as courseActions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('adds a course to the state when a new course is created', () => {
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ];
    const course = {title: 'C'};
    const action = courseActions.createCourseSuccess(course);
    const newState = courseReducer(initialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('only updates the course that is attempted to update', () => {
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'},
      {id: 'C', title: 'C'}
    ];
    const course = {id: 'B', title: 'Second'};
    const action = courseActions.updateCourseSuccess(course);
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == course.id);
    const untouchedCourse = newState.find(a => a.id == 'C');

    expect(newState.length).toEqual(3);
    expect(updatedCourse.title).toEqual('Second');
    expect(untouchedCourse.title).toEqual('C');
  });
});
