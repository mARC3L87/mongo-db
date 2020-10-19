const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const pro = await Product.findOne().skip(rand);
    if(pro) {
      res.json(pro);
    } else {
      res.status(404).json({ message: 'Not found'});
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const pro = await Product.findById({ _id: req.params.id });
    if(pro) {
      res.json(pro);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.json({ message: 'Ok' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { name, client } = req.body;
  try {
    const pro = await Product.findById({ _id: req.params.id });
    if(pro) {
      await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
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
    const pro = await Product.findById({ _id: req.params.id});
    if(pro) {
      await Product.deleteOne({ _id: req.params.id});
      res.json({ message: 'Ok' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};