import express from "express";
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" });
});
router.post("/users",function (req, res, next) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(req.body));
  });
router.get("/users", function (req, res, next) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(req.body));
});

export default router;
