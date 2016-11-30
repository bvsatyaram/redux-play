import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('creates a CREATE_COURSE_SUCCESS action', () => {
      const course = {id: 'clean-code', title: 'Clean Code'};
      const action = courseActions.createCourseSuccess(course);
      const expectedAction = {type: types.CREATE_COURSE_SUCCESS, course: course};

      expect(action).toEqual(expectedAction);
    });
  });
});
