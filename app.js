const express = require('express');
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const port = 4000
const app = express()
const path = require('path');
const cron = require('node-cron');
const WarehouseStockController = require('./controller/warehouseStockController');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)
// cron.schedule('*/5 * * * * *', () => {
//     WarehouseStockController.checkEmptyStock()
//     WarehouseStockController.checkSurplusStock()
// })
cron.schedule('0 12 * * *', () => {
    console.log('Running the task at 12 PM every day!');
    // Place your task logic here
    WarehouseStockController.checkEmptyStock()
    WarehouseStockController.checkSurplusStock()
  }, {
    timezone: 'Asia/Jakarta' // Change 'Your/Timezone' to your desired timezone
  });
app.use(errorHandler)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
