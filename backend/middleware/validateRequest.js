const validateRequest = (validator) => {
    return (req, res, next) => {
      const { isValid, errors } = validator(req.body);
      
      if (!isValid) {
        return res.status(400).json({ errors });
      }
      
      next();
    };
  };
  
  module.exports = validateRequest;