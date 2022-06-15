const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const cookieSession = require('cookie-session');

const users_router = require('./routes/users');
const scanners_router = require('./routes/scanners');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({ signed: false }));

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is listening on port ${process.env.PORT || 8080}`);
})

app.use('/', users_router);
app.use('/', scanners_router);


// Steps we are doing before deployment:

app.use('/', express.static(path.join(__dirname, 'client/pi-guard/build')))

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './client/pi-guard/build', 'index.html'))
})