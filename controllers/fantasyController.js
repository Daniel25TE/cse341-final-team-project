const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const fantasy = await mongodb
      .getDatabase()
      .collection('Fantasy')
      .find()
      .toArray();

    res.status(200).json(fantasy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid fantasy id to find a fantasy novel.');
  }

  const fantasyId = new ObjectId(req.params.id);
  try {
    const fantasy = await mongodb
      .getDatabase()
      .collection('Fantasy')
      .findOne({ _id: fantasyId });

    if (!fantasy) {
      return res.status(404).json({ message: 'Fantasy book not found' });
    }

    res.status(200).json(fantasy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createFantasy = async (req, res) => {
  const fantasy = {
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
      .collection('Fantasy')
      .insertOne(fantasy);

    if (response.acknowledged) {
        res.status(201).json({
        message: 'Fantasy novel created successfully',
        fantasyId: response.insertedId
      });
    } else {
      res.status(500).json({
        error: response.error || 'Some error occurred while creating the Fantasy novel.'
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFantasy = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid fantasy id to update a Fantasy novel.');
  }

  const fantasyId = new ObjectId(req.params.id);
  const fantasy = {
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
      .collection('Fantasy')
      .replaceOne({ _id: fantasyId }, fantasy);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Fantasy novel updated successfully' });
    } else {
      res
        .status(404)
        .json({ message: 'Fantasy novel not found or no changes applied' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFantasy = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid id to delete a Fantasy novel.');
  }

  const fantasyId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .collection('Fantasy')
      .deleteOne({ _id: fantasyId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Fantasy novel deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Fantasy novel not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createFantasy,
  updateFantasy,
  deleteFantasy
};