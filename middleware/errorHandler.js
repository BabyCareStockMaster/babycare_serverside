const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Email already exists' });
  }
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((error) => error.message);
    return res.status(400).json({ errors });
  }
  if(err.name === 'notFound'){
    return res.status(404).json({ error: 'not found' });
  }
  if(err.name === 'invalidLogin'){
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  if(err.name === 'unauthorized'){
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return res.status(500).json({ error: err.message });
} 

module.exports = errorHandler;