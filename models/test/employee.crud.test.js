const Employee = require('../employee.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getUri();
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmpOne.save();
      const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Smith', department: 'Marketing'});
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      const expectedFirstName = 'John';
      const expectedLastName = 'Doe';
      const expectedDepartment = 'IT';
      expect(employee.firstName).to.be.equal(expectedFirstName);
      expect(employee.lastName).to.be.equal(expectedLastName);
      expect(employee.department).to.be.equal(expectedDepartment);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () =>  {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmpOne.save();
      const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Smith', department: 'Marketing' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "upadateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John', lastName: 'Doe', department: 'IT' }, { $set: { firstName: '=John=', lastName: '=Doe=', department: '=IT=' }});
      const updateEmployee = await Employee.findOne({ firstName: '=John=', lastName: '=Doe=', department: '=IT=' });
      expect(updateEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      employee.firstName = '=John=';
      employee.lastName = '=Doe=';
      employee.department = '=IT=';
      await employee.save();
      const updateEmployee = await Employee.findOne({ firstName: '=John=', lastName: '=Doe=', department: '=IT=' });
      expect(updateEmployee).to.not.be.null;
    });

    it('should properly update mulitple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated', lastName: 'Updated', department: 'Updated' }});
      const employees = await Employee.find({ firstName: 'Updated', lastName: 'Updated', department: 'Updated' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmpOne.save();
      const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Smith', department: 'Marketing' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      const removeEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const removedEmployees = await Employee.find();
      expect(removedEmployees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});