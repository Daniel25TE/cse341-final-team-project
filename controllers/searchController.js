const mongodb = require('../data/database.js');

const COLLECTIONS = ["Autobiography", "Fantasy", "Mystery", "romance"];


const searchBooks = async (req, res) => {
  //#swagger.tags = ['Search']
  try {
    const { author, title, status } = req.query;
    const query = {};
    if (author) query.author = { $regex: author, $options: 'i' };
    if (title) query.title = { $regex: title, $options: 'i' };
    if (typeof status !== 'undefined') query.status = (status === 'true' || status === true);

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
