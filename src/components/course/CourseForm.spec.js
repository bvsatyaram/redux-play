import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import CourseForm from './CourseForm';

const setup = (saving = false) => {
  const props = {
    course: {},
    allAuthors: [],
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props} />);
};

describe('CourseForm', () => {
  it('renders from and h1', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('has "Save" as label for submit button when not saving', () => {
    const wrapper = setup();
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('has "Saving..." as label for submit button when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
