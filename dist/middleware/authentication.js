"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generateAccessToken(user) {
    const payload = {
        email: user.email,
        id: user.id,
    };
    const secret = process.env.secret || "default_secret";
    const options = { expiresIn: "1h" };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
exports.generateAccessToken = generateAccessToken;
function verifyAccessToken(token) {
    const secret = process.env.secret || "default_secret";
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return { success: true, data: decoded };
    }
    catch (error) {
        return { success: false, data: error.message };
    }
}
function authenticateToken(req, res, next) {
    //const authHeader = req.header("Authorization");
    const token = req.session.token;
    const userId = req.session.userId;
    if (!token) {
        res.redirect("/login");
    }
    const verification = verifyAccessToken(token);
    if (!verification.success) {
        res.redirect("/login");
    }
    next();
}
exports.authenticateToken = authenticateToken;
