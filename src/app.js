require('dotenv').config();

import express from 'express';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';

import * as usersRouter from './routes/user';
import * as ingredientRouter from './routes/ingredient';
import * as inventoryRouter from './routes/inventory';

import errorHandler from './middlewares/errorHandler';

const app = express();

async function mongoConnect() {
  await mongoose.connect(process.env.DB_URI);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoConnect()
  .catch(err => console.log(err));

app.use('/ingredient', ingredientRouter);
app.use('/user', usersRouter);
app.use('/inventory', inventoryRouter);


app.get('*', (req, res, next) => {
  // res.sendFile(path.join(__dirname,'index.html'));
  res.status(200);
  res.json({ message: 'hello react' });
});
// error handler
app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`App is now listening at http://localhost:${process.env.PORT}!`);
})

module.exports = app;
