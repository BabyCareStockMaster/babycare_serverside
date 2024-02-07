const express = require('express');
const router = require('./routes');
const port = 4000
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.listen(port, () => {
console.log(`Server is running on port ${port}`)
})