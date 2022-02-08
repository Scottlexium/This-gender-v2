const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/routes');
const methodOverride = require('method-override');
const path = require('path');
dotenv.config();
app.use(bodyparser.json())
app.use(methodOverride('_method'));
app.use(bodyparser.urlencoded({ extended: false }))
app.use(router);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'view');

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    app.listen(port);
console.log(`listening on http://localhost:${port}`);
}).catch(err => console.log(err));



