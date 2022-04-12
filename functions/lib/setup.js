"use strict";
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty */
/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable camelcase */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestoreUsers = exports.firestoreAsset = void 0;
const admin = require("firebase-admin");
const serviceAccount = require("../test-69192-firebase-adminsdk-wec8e-892b8e0814.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const firestoreDb = admin.firestore();
exports.firestoreAsset = firestoreDb.collection("avatar");
exports.firestoreUsers = firestoreDb.collection("Users");
//# sourceMappingURL=setup.js.map