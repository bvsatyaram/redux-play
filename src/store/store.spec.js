import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
  it('handles creation of course', () => {
    const store = createStore(rootReducer, initialState);
    const course = {title: 'Clean Code'};

    expect(store.getState().courses.length).toEqual(0);

    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    expect(store.getState().courses.length).toEqual(1);
    const actual = store.getState().courses[0];
    const expected = course;
    expect(actual).toEqual(expected);
  });
});
