const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllMystery = async (req, res) => {
  //#swagger.tags = ['Mystery']
  try {
    const mystery = await mongodb
      .getDatabase()
      .collection('Mystery') 
      .find()
      .toArray();

    res.status(200).json(mystery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingleMystery = async (req, res) => {
  //#swagger.tags = ['Mystery']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid id to find a Mystery novel.');
  }

  const mysteryId = new ObjectId(req.params.id);
  try {
    const mystery = await mongodb
      .getDatabase()
      .collection('Mystery')
      .findOne({ _id: mysteryId });

    if (!mystery) {
      return res.status(404).json({ message: 'Mystery book not found' });
    }

    res.status(200).json(mystery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMystery = async (req, res) => {
  //#swagger.tags = ['Mystery']
  const mystery = {
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    publisher: req.body.publisher,
    price: req.body.price,
    bio: req.body.bio,
    status: req.body.status
  };

  try {
    const response = await mongodb
      .getDatabase()
      .collection('Mystery')
      .insertOne(mystery);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json({ message: 'Failed to create Mystery novel.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMystery = async (req, res) => {
  //#swagger.tags = ['Mystery']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid id to update a Mystery novel.');
  }
  
  const mysteryId = new ObjectId(req.params.id);
  const mystery = {
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    publisher: req.body.publisher,
    price: req.body.price,
    bio: req.body.bio,
    status: req.body.status
  };

  try {
    const response = await mongodb
      .getDatabase()
      .collection('Mystery')
      .replaceOne({ _id: mysteryId }, mystery);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Mystery novel updated successfully' });
    } else {
      res
        .status(404)
        .json({ message: 'Mystery novel not found or no changes applied' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMystery = async (req, res) => {
  //#swagger.tags = ['Mystery']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid id to delete a Mystery novel.');
  }

  const mysteryId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .collection('Mystery')
      .deleteOne({ _id: mysteryId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Mystery novel deleted successfully' });
    } else {
      res.status(404).json({ message: 'Mystery novel not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMystery,
  getSingleMystery,
  createMystery,
  updateMystery,
  deleteMystery
};