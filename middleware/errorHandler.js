const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    console.log(err.message)
    return res.status(400).json({ error: 'Field already exists', message: err.errors[0].message });
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
  if(err.name === 'UsernotFound'){
    return res.status(404).json({ error: 'User not found' });
  }
  if(err.name === 'warehouseNotFound'){
    return res.status(404).json({ error: 'Warehouse not found' });
  }
  if(err.name ==='orderNotFound'){
    return res.status(404).json({ error: 'Order not found' });
  }
  if(err.name === 'productNotFound'){
    return res.status(404).json({ error: 'Product not found' });
  }
  if(err.name === 'stockNotFound'){
    return res.status(404).json({ error: 'Stock not found' });
  }
  if(err.name === 'invalidQuantity'){
    return res.status(400).json({ error: 'Invalid Quantity' });
  }
  if(err.name === 'invalidPrice'){
    return res.status(400).json({ error: 'Invalid Price' });
  }
  return res.status(500).json({ message: err.message || 'Internal Server Error' });
}

module.exports = errorHandler;