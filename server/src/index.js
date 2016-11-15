/**
 * Created by Alex on 25.10.2016.
 */

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import users from './routes/users';
import auth from './routes/auth';
import projects from './routes/projects';

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/projects', projects);

app.get('*', (req, res) => {
    if (req.originalUrl.endsWith('.js') || req.originalUrl.endsWith('.css') || req.originalUrl.endsWith('.ico') || req.originalUrl.endsWith('.ttf') || req.originalUrl.endsWith('.woff') || req.originalUrl.endsWith('.woff2'))
        res.sendFile(__dirname + '/www' + req.originalUrl);
    else
        res.sendFile(__dirname + '/www/index.html');
});

app.listen(3030, () => console.log('Server running on localhost:3030'));