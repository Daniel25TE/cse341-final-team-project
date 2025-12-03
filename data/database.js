const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            const urlParts = process.env.MONGODB_URL.split('/');
            const dbNameFromUrl = urlParts.length > 3 ? urlParts[3].split('?')[0] : 'finalProject';
            database = client.db('finalProject');
            
            // Log database name and available collections for debugging
            console.log('MongoDB connection successful');
            console.log('Database name:', database.databaseName);
            console.log('Database name from URL (if different):', dbNameFromUrl);
            
            // List collections to verify they exist
            database.listCollections().toArray()
                .then(collections => {
                    console.log('Available collections:', collections.map(c => c.name));
                })
                .catch(err => console.log('Could not list collections:', err.message));
            
            callback(null, database);
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err.message);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;  
};

module.exports = {
    initDb,
    getDatabase
};