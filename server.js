
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 4200;

const app = express();

const DIST = path.resolve(__dirname, 'build');

app.use(express.static(DIST));

app.use('*', (req, res) => res.sendFile(path.resolve(DIST, 'index.html')));


app.listen(port, () => console.log(`=========> ${port}`));
