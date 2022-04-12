"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeid = exports.validatePokerIdToken = exports.validateFirebaseIdToken = exports.validateFirebaseAdminIdToken = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-len */
const admin = require("firebase-admin");
// import * as functions from "firebase-functions";
const jwt = require("jsonwebtoken");
exports.validateFirebaseAdminIdToken = async (req, res, next) => {
    console.log("Check if request is authorized with Firebase ID token");
    if ((!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) &&
        !(req.cookies && req.cookies.__session)) {
        console.error("No Firebase ID token was passed as a Bearer token in the Authorization header.", "Make sure you authorize your request by providing the following HTTP header:", "Authorization: Bearer <Firebase ID Token>", "or by passing a \"__session\" cookie.");
        res.status(403).send("Unauthorized");
        return;
    }
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        console.log("Found \"Authorization\" header");
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split("Bearer ")[1];
    }
    else if (req.cookies) {
        console.log("Found \"__session\" cookie");
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    }
    else {
        // No cookie
        res.status(403).send("Unauthorized");
        return;
    }
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log("ID Token correctly decode", decodedIdToken);
        console.log("ID Token correctly decoded", decodedIdToken.uid);
        console.log("ID Token correctly decoded", decodedIdToken);
        if (decodedIdToken.uid !== "TsY69UHPprUd75nG5S4mtHuNmoj2") {
            throw new Error("Unauthorized");
        }
        else {
            req.body.user = decodedIdToken;
            next();
            return;
        }
    }
    catch (error) {
        console.error("Error while verifying Firebase ID token:", error);
        res.status(403).send("Unauthorized");
        return;
    }
};
exports.validateFirebaseIdToken = async (req, res, next) => {
    console.log("Check if request is authorized with Firebase ID token", req.headers.authorization);
    console.log("req.headers.authorization", req.headers.authorization);
    if ((!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) &&
        !(req.cookies && req.cookies.__session)) {
        console.error("No Firebase ID token was passed as a Bearer token in the Authorization header.", "Make sure you authorize your request by providing the following HTTP header:", "Authorization: Bearer <Firebase ID Token>", "or by passing a \"__session\" cookie.");
        res.status(403).send("Unauthorized");
        return;
    }
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        console.log("Found \"Authorization\" header");
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split("Bearer ")[1];
    }
    else if (req.cookies) {
        console.log("Found \"__session\" cookie");
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    }
    else {
        // No cookie
        res.status(403).send("Unauthorized", req.headers.authorization);
        return;
    }
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log("ID Token correctly decoded", decodedIdToken);
        req.body.user = decodedIdToken;
        next();
        return;
    }
    catch (error) {
        console.error("Error while verifying Firebase ID token:", error);
        res.status(403).send("Unauthorized", error);
        return;
    }
};
// async function verifyTokenPoker(token:string) {
//   const decodedIdToken = await jwt.verify(token, POKER_AUTH_SECRET!);
//   console.log("decodedIdToken", decodedIdToken);
//   if (!decodedIdToken) return false;
//   return decodedIdToken;
// }
exports.validatePokerIdToken = async (req, res, next) => {
    console.log("Check if request is authorized with Firebase ID token");
    if ((!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) &&
        !(req.cookies && req.cookies.__session)) {
        console.error("No Firebase ID token was passed as a Bearer token in the Authorization header.", "Make sure you authorize your request by providing the following HTTP header:", "Authorization: Bearer <Firebase ID Token>", "or by passing a \"__session\" cookie.");
        res.status(403).send("Unauthorized");
        return;
    }
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        console.log("Found \"Authorization\" header");
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split("Bearer ")[1];
    }
    else if (req.cookies) {
        console.log("Found \"__session\" cookie");
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    }
    else {
        // No cookie
        res.status(403).send("Unauthorized");
        return;
    }
    try {
        jwt.verify(idToken, "60dd74d04d900ad0c8596a36", (err, decodedIdToken) => {
            if (err) {
                console.log("err", err);
            }
            console.log("ID Token correctly decoded", decodedIdToken);
            console.log("idd", decodedIdToken);
            req.body.user = decodedIdToken;
            req.body.uid = "3j9edj3edi93";
        });
        next();
        return;
    }
    catch (error) {
        console.error("Error while verifying Firebase ID token:", error);
        res.status(403).send("Unauthorized");
        return;
    }
};
async function makeid() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 13; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
exports.makeid = makeid;
//# sourceMappingURL=middleware.js.map