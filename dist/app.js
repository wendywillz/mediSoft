"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
// import logger from "morgan";
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const admin_1 = __importDefault(require("./routes/admin"));
const doctor_1 = __importDefault(require("./routes/doctor"));
(0, dotenv_1.config)();
const database = process.env.DATABASE_URL;
mongoose_1.default.connect(database)
    .then(() => {
    console.log("Connected to MonogoDB Successfully...");
}).catch((err) => {
    console.log("Error Connecting to MongoDB...");
    throw err;
});
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
// app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
app.use((0, express_session_1.default)({
    secret: `${process.env.secret}`,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");
    next();
});
app.use('/', index_1.default);
app.use('/admin', admin_1.default);
app.use('/doctor', doctor_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
