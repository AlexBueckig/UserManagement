/**
 * Created by Alex on 25.10.2016.
 */

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import users from './routes/users';
import auth from './routes/auth';

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3030, () => console.log('Server running on localhost:3030'));