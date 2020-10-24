const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if arg is missed', () => {
    const emp1 = new Employee({ firstName: 'John', lastName: 'Doe' });
    const emp2 = new Employee({ firstName: 'John', department: 'Marketing' });
    const emp3 = new Employee({ lastName: 'Doe', department: 'Marketing' });
    const cases = [ emp1, emp2, emp3 ];
    for(let emp of cases) {
      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if arg is not a string', () => {
    const emp1 = new Employee({ firstName: [], lasName: 'Doe', department: 'Marketing' });
    const emp2 = new Employee({ firstName: 'John', lasName: [], department: 'Marketing' });
    const emp3 = new Employee({ firstName: 'John', lasName: [], department: [] });
    const cases = [emp1, emp2, emp3];
    for(let emp of cases) {
      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should not throw an error if all arg are okay', () => {
    const emp = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing'});
    emp.validate(err => {
      expect(err).not.to.exist;
    })
  });
  
  after(() => {
    mongoose.models = {};
  });
});