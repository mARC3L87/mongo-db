const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should throw error if no "name" arg', () => {
    const dep = new Department({});
    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw error if "name" has minLength less then 5 and maxLength greater then 20', () => {
    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip'];
    for(let name of cases) {
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not throw an error if "name" is okey', () => {
    const cases = ['Management', 'Human Resources'];
    for(let name of cases) {
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
});