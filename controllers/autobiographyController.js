const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags = ['Autobiography']
    //#swagger.summary = 'Get all autobiography books'
    //#swagger.description = 'Returns a list of all autobiography books stored in the database.'

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
    //#swagger.summary = 'Get a single autobiography book by ID'
    //#swagger.description = 'Finds and returns an autobiography book using its MongoDB ObjectId.'
    //#swagger.parameters['id'] = { description: 'Autobiography book ID' }

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
    //#swagger.summary = 'Create a new autobiography book'
    //#swagger.description = 'Creates a new autobiography book using the data provided in the request body.'
    //#swagger.parameters['Autobiography'] = {
    //    in: 'body',
    //    description: 'Autobiography book data',
    //    schema: {
    //        title: 'Example Title',
    //        author: 'Example Author',
    //        publishDate: '2024-01-01',
    //        publisher: 'Example Publisher',
    //        price: 19.99,
    //        bio: 'Short description of the book',
    //        status: 'Available'
    //    }
    //}
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
    //#swagger.summary = 'Update an existing autobiography book'
    //#swagger.description = 'Updates an existing autobiography book by replacing all fields with the new data.'
    //#swagger.parameters['id'] = { description: 'Autobiography book ID to update' }
    //#swagger.parameters['Autobiography'] = {
    //    in: 'body',
    //    description: 'Updated autobiography book data',
    //    schema: {
    //        title: 'Updated Title',
    //        author: 'Updated Author',
    //        publishDate: '2024-01-01',
    //        publisher: 'Updated Publisher',
    //        price: 29.99,
    //        bio: 'Updated biography text',
    //        status: 'Checked Out'
    //    }
    //}

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
    //#swagger.summary = 'Delete an autobiography book'
    //#swagger.description = 'Deletes an autobiography book using its MongoDB ObjectId.'
    //#swagger.parameters['id'] = { description: 'ID of the autobiography book to delete' }

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