const mockData = {
  fantasy: [{ _id: '654321012345678901234567', title: 'Fantasy Test' }],
  mystery: [{ _id: '654321012345678901234568', title: 'Mystery Test' }],
  romance: [{ _id: '654321012345678901234569', title: 'Romance Test' }],
  autobiography: [{ _id: '654321012345678901234570', title: 'Autobiography Test' }],
};

const mockCollection = (collectionName) => ({
  find: () => ({
    toArray: jest.fn().mockResolvedValue(mockData[collectionName.toLowerCase()])
  }),
  findOne: jest.fn().mockResolvedValue(mockData[collectionName.toLowerCase()][0])
});

jest.mock('../data/database', () => ({
  getDatabase: jest.fn().mockReturnValue({
    collection: jest.fn(mockCollection)
  }),
  initDb: jest.fn() 
}));

const fantasyController = require('../controllers/fantasyController');
const mysteryController = require('../controllers/mysteryController'); 
const romanceController = require('../controllers/romanceController');
const autobiographyController = require('../controllers/autobiographyController');

// =========================================================================
// MOCK REQUEST & RESPONSE OBJECTS
// =========================================================================
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// =========================================================================
// UNIT TESTS START
// =========================================================================
describe('GET Endpoints Unit Tests', () => {

    // --- FANTASY COLLECTION TESTS ---
    describe('Fantasy Collection', () => {
        const mockFantasyId = mockData.fantasy[0]._id;
        
        test('should return 200 and all Fantasy novels on getAll', async () => {
            const req = {};
            const res = mockRes();
            await fantasyController.getAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData.fantasy);
        });

        test('should return 200 and a single Fantasy novel on getSingle', async () => {
            const req = { params: { id: mockFantasyId } };
            const res = mockRes();
            jest.spyOn(require('mongodb'), 'ObjectId').mockImplementationOnce(() => mockFantasyId);
            
            await fantasyController.getSingle(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData.fantasy[0]);
        });
    });
    
    // --- MYSTERY COLLECTION TESTS ---
    describe('Mystery Collection', () => {
        const mockMysteryId = mockData.mystery[0]._id;
        
        test('should return 200 and all Mystery novels on getAllMystery', async () => {
            const req = {};
            const res = mockRes();
            await mysteryController.getAllMystery(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData.mystery);
        });

        test('should return 200 and a single Mystery novel on getSingleMystery', async () => {
            const req = { params: { id: mockMysteryId } };
            const res = mockRes();
            jest.spyOn(require('mongodb'), 'ObjectId').mockImplementationOnce(() => mockMysteryId);

            await mysteryController.getSingleMystery(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData.mystery[0]);
        });
    });

        // --- AUTOBIOGRAPHY COLLECTION TESTS ---
    describe('Autobiography Collection', () => {
        const mockAutobiographyId = mockData.autobiography[0]._id;
        
        test('should return 200 and all Autobiography novels on getAll', async () => {
            const req = {};
            const res = mockRes();
            await autobiographyController.getAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData.autobiography);
        });

        test('should return 200 and a single Autobiography novel on getSingle', async () => {
            const req = { params: { id: mockAutobiographyId } };
            const res = mockRes();
            jest.spyOn(require('mongodb'), 'ObjectId').mockImplementationOnce(() => mockAutobiographyId);
            
            await autobiographyController.getSingle(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData.autobiography[0]);
        });
    });

    // --- ROMANCE COLLECTION TESTS ---
    describe('Romance Collection', () => {
        const mockRomanceId = mockData.romance[0]._id;
        
        test('should return 200 and all Romance novels on getAll', async () => {
            const req = {};
            const res = mockRes();
            await romanceController.getAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData.romance);
        });

        test('should return 200 and a single Romance novel on getSingle', async () => {
            const req = { params: { id: mockRomanceId } };
            const res = mockRes();
            jest.spyOn(require('mongodb'), 'ObjectId').mockImplementationOnce(() => mockRomanceId);

            await romanceController.getSingle(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData.romance[0]);
        });
    });
});
