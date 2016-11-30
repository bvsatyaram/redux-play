import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage Course Page', () => {
  it('sets error message when saved with empty title', () => {
    const props = {
      authors: [],
      course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''},
      actions: {saveCourse: () => {return Promise.resolve();}}
    };

    const wrapper = mount(<ManageCoursePage {...props}/>);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    expect(wrapper.state().errors.title).toNotExist();
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters long.');
  });
});
