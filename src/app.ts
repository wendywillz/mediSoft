import { config } from "dotenv";
import createError from "http-errors";
import express from "express";  
import { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
// import logger from "morgan";
import mongoose from "mongoose";

import indexRouter  from "./routes/index";
import adminRouter  from "./routes/admin";
import doctorRouter  from "./routes/doctor";

config();

const database = process.env.DATABASE_URL as string;


mongoose.connect(database)
  .then(() => {
    console.log("Connected to MonogoDB Successfully...");
  }).catch((err) => {
    console.log("Error Connecting to MongoDB...");
    throw err;
});


const app = express();

app.set('views', path.join(__dirname, '..', 'views'));

app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'public')));

app.use(
  session({
    secret: `${process.env.secret}`,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Cache-Control", "no-store, must-revalidate");
  next();
});


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/doctor', doctorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // res.status(err.status || 500);
  res.render('error');
});

export default app;