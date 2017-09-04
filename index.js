const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport'); //Doesn't export anything so we can just require it to make sure it's ran

mongoose.connect(keys.mongoURI); //2nd part is to squish the warning in the terminal 

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app); //Calls the export from authRoutes function and passes the app as the parameter

const PORT = process.env.PORT || 5000;
app.listen(PORT);
