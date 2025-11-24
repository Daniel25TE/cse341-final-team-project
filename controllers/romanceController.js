const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    //#swagger.tags = ['Romance']
    const romance = await mongodb
      .getDatabase()
      .collection('romance')
      .find()
      .toArray();

    res.status(200).json(romance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Romance']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid romance id to find a Romance novel.');
  }

  const romanceId = new ObjectId(req.params.id);
  try {
    const romance = await mongodb
      .getDatabase()
      .collection('Romance')
      .findOne({ _id: romanceId });

    if (!romance) {
      return res.status(404).json({ message: 'Romance not found' });
    }

    res.status(200).json(romance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRomance = async (req, res) => {
  //#swagger.tags = ['Romance']
  const romance = {
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
      .collection('romance')
      .insertOne(romance);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Romance novel created successfully',
        romanceId: response.insertedId,
        romance: romance
      });
    } else {
      res.status(500).json({
        error: response.error || 'Some error occurred while creating the Romance novel.'
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRomance = async (req, res) => {
  //#swagger.tags = ['Romance']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid romance id to update a Romance novel.');
  }

  const romanceId = new ObjectId(req.params.id);
  const romance = {
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
      .collection('romance')
      .replaceOne({ _id: romanceId }, romance);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'romance updated successfully' });
    } else {
      res
        .status(404)
        .json({ message: 'Romance novel not found or no changes applied' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRomance = async (req, res) => {
  //#swagger.tags = ['Romance']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid id to delete a Romance novel.');
  }

  const romanceId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .collection('romance')
      .deleteOne({ _id: romanceId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Romance novel deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Romance novel not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createRomance,
  updateRomance,
  deleteRomance
};