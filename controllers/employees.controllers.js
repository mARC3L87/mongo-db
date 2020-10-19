const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand).populate('department');
    if(!emp) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(emp);
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const emp = await Employee.findById({ _id: req.params.id }).populate('department');
    if(!emp) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(emp);
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName, lastName, department });
    await newEmployee.save();
    res.json({ message: 'Ok' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const emp = await Employee.findById({ _id: req.params.id });
    if(emp) {
      await Employee.updateOne({ _id: req.params.id }, { $set: { firstName, lastName, department }});
      res.json({ message: 'Ok' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const emp = await Employee.findById({ _id: req.params.id});
    if(emp) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ok' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err});
  }
};