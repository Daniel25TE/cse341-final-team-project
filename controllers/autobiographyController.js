const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  //#swagger.tags = ['Autobiography']
  try {
    const Autobiography = await mongodb
      .getDatabase()
      .collection('Autobiography')
      .find()
      .toArray();

    res.status(200).json(Autobiography);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Autobiography']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid Autobiography id to find a Autobiography Book.');
  }

  const AutobiographyId = new ObjectId(req.params.id);
  try {
    const Autobiography = await mongodb
      .getDatabase()
      .collection('Autobiography')
      .findOne({ _id: AutobiographyId });

    if (!Autobiography) {
      return res.status(404).json({ message: 'Autobiography book not found' });
    }

    res.status(200).json(Autobiography);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAutobiography = async (req, res) => {
  //#swagger.tags = ['Autobiography']
  const Autobiography = {
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
      .collection('Autobiography')
      .insertOne(Autobiography);

    if (response.acknowledged) {
        res.status(201).json({
        message: 'Autobiography book created successfully',
        AutobiographyId: response.insertedId
      });
    } else {
      res.status(500).json({
        error: response.error || 'Some error occurred while creating the Autobiography book.'
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAutobiography = async (req, res) => {
  //#swagger.tags = ['Autobiography']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid Autobiography id to update a Autobiography book.');
  }

  const AutobiographyId = new ObjectId(req.params.id);
  const Autobiography = {
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
      .collection('Autobiography')
      .replaceOne({ _id: AutobiographyId }, Autobiography);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Autobiography book updated successfully' });
    } else {
      res
        .status(404)
        .json({ message: 'Autobiography book not found or no changes applied' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAutobiography = async (req, res) => {
  //#swagger.tags = ['Autobiography']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid id to delete a Autobiography book.');
  }

  const AutobiographyId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .collection('Autobiography')
      .deleteOne({ _id: AutobiographyId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Autobiography book deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Autobiography book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAutobiography,
  updateAutobiography,
  deleteAutobiography
};