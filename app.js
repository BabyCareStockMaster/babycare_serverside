const express = require('express');
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const port = 4000
const app = express()
const path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.use(errorHandler)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.listen(port, () => {
console.log(`Server is running on port ${port}`)
})