import express from "express";

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/doctor/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});
router.get("/doctor/signup", function (req, res, next) {
  res.render("register", { title: "Register" });
});
router.get("/doctor/dashboard", function (req, res, next) {
  res.render("dashboard", { title: "Dashboard" });
});

export default router;
