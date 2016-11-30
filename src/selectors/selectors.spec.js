import expect from 'expect';
import {authorsFormattedForDropdown} from './selectors';

describe('authorsFormattedForDropdown', () => {
  it('returns an object that is formatted well for a select tag options', () => {
    const authors = [
      {id: 'bv-satyaram', firstName: "BV", lastName: "Satyaram", extra: "Dummy"},
      {id: 'john-corey', firstName: "John", lastName: "Corey Jr", another: "Placeholder"}
    ];

    const expected = [
      {value: 'bv-satyaram', text: 'BV Satyaram'},
      {value: 'john-corey', text: 'John Corey Jr'}
    ];

    expect(authorsFormattedForDropdown(authors)).toEqual(expected);
  });
});
