let errorHandler = async (err, req, res, next) => {
  let status = err.status;
  let name = err.name;
  let message = err.message;

  if (message === 'jwt malformed' || message === 'invalid signature') {
    res.status(401).json({ message: 'Error authentication' });
    return;
  }

  switch (name) {
    case 'SequelizeValidationError':
      let msg = err.errors.map((el) => {
        return el.message;
      });
      res.status(400).json({
        message: msg,
      });
      break;
    case 'SequelizeUniqueConstraintError':
      let msg2 = err.errors.map((el) => {
        return el.message;
      });
      res.status(400).json({
        message: msg2,
      });
      break;
    case 'missingData':
      res.status(404).json({
        message: 'Data not found',
      });
      break;
    case 'invalidInput':
      res.status(400).json({ message });
      break;
    case 'validationError':
      res.status(401).json({ message });
      break;
    case 'invalidToken':
      res.status(401).json({ message: 'Error authentication' });
      break;
    case 'forbidden':
      res.status(403).json({ message: 'Forbidden' });
      break;
    case 'MissingFile':
      res.status(400).json({ message });
      break;
    case 'forbidden':
      res.status(403).json({ message: 'Forbidden' });
      break;
    default:
      res.status(500).json({
        message: 'Internal server error',
      });
      break;
  }
};

module.exports = errorHandler;
