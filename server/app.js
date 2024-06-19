const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appRoute = require('./routes/appRoute');
const memRoute = require('./routes/memRoute');
const servRoute = require('./routes/servRoute');
const reqRoute = require('./routes/reqRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/member', memRoute);
app.use('/request', reqRoute);
app.use('/service', servRoute);
app.use('/',appRoute);

mongoose.connect('mongodb://localhost:27017/civilloan')
.then(() => console.log('DB connection successfull'));

app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
});