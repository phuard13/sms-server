import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './route/index';
import dbConnection from './config/dbconnection';

dotenv.config();

const app = express();

dbConnection();

const BASE_URI = '/api/v1/';


app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(BASE_URI, router);

app.get('/', (req, res) => {
  res.json({
    message: 'app now live',
  });
});


app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  });
  next();
});

export default app;
