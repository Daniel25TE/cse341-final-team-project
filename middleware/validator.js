const validator = require('../helpers/validate');

// Novels validation
const saveValidator = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    publishDate: 'required|date',
    publisher: 'required|string',
    price: 'required|numeric',
    bio: 'required|string',
    status: 'required|boolean'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

 

module.exports = {
  saveValidator
};