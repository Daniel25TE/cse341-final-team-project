const mongodb = require('../data/database.js');

const COLLECTIONS = ["Autobiography", "Fantasy", "Mystery", "romance"];

// True or False Helper
const parseStatusOption = (status) => {
  if (typeof status === 'boolean') return status;
  if (typeof status === 'string') {
    const value = status.toLowerCase();
    if (value === 'true') return true;
    if (value === 'false') return false;
  }
  return undefined;
};

const searchBooks = async (req, res) => {
  //#swagger.tags = ['Search']
  try {
    const { author, title, status } = req.query;
    const query = {};

    if (author) query.author = { $regex: author, $options: 'i' };
    if (title) query.title = { $regex: title, $options: 'i' };

    // Only apply status filter when it is explicitly "true" or "false"
    const parsedStatus = parseStatusOption(status);
    if (typeof parsedStatus === 'boolean') {
      query.status = parsedStatus;
    }

    const db = mongodb.getDatabase();
    console.log('Searching database:', db.databaseName);
    console.log('Search query:', query);
    
    const allResults = await Promise.all(
      COLLECTIONS.map(async (collection) => {
        try {
          const count = await db.collection(collection).countDocuments();
          console.log(`Collection ${collection} has ${count} documents`);
          
          const results = await db.collection(collection).find(query).toArray();
          console.log(`Found ${results.length} results in ${collection}`);
          return results.map(book => ({ ...book, genre: collection }));
        } catch (err) {
          console.error(`Error searching collection ${collection}:`, err.message);
          return [];
        }
      })
    );
    const books = allResults.flat();
    console.log(`Total books found: ${books.length}`);
    res.status(200).json(books);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  searchBooks
};
