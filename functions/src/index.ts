
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

import * as functions from "firebase-functions";
// import cron from "node-cron";
import * as express from "express";
import * as newuser from "./user";
import {firestoreUsers} from "./setup";

const cors = require("cors")({origin: true});
const app = express();
require("dotenv").config();

app.use(cors);
// const router = express.Router();
// app.use("/user/", assetRouter);
// app.use(validateFirebaseIdToken);


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
app.use("/user", newuser);
// app.post("/newuser", async (req:any, res:any)=>{
//   console.log(`request body is ${JSON.stringify(req.body)}`);
//   res.send({data: "OK"});
// });
console.log("app running...");

export const onCreateUsers = functions.auth.user()
    .onCreate(async (snapshot, context) => {
      console.log(`onCreate snapshot is ${JSON.stringify(snapshot)} | context is ${JSON.stringify(context)}`);
      const wallet = {gold: 10000, silver: 10000};
      try {
      // const profile= {
      //   Character_id: "",
      //   DataRegistration: "",
      //   email_id: snapshot.email,
      //   FirstName: "",
      //   FullName: snapshot.displayName,
      //   LastActivity: "",
      //   LastName: "",
      //   Phone: snapshot.phoneNumber,
      //   user_id: snapshot.uid,
      //   portal_entry: false,
      // };
        let currentHash=0;
        firestoreUsers.doc(snapshot.uid);
        console.log(snapshot.displayName);
        const profile=(await firestoreUsers.select("profile").get());
        profile.forEach((p)=>{
          console.log(p.id, "=>", p.data());
        });
        const namesFound=await firestoreUsers.where("profile.Name", "==", snapshot.displayName).get();
        // console.log(namesFound, Math.max(...namesFound.hash));
        // currentHash=Math.max(...namesFound.hash)?Math.max(...namesFound.hash)+1:0;
        // console.log("names", namesFound);
        let max=0;
        namesFound.forEach((doc)=>{
          console.log(doc.data().profile.hash);
          max=Math.max(max, doc.data().profile.hash);
          console.log("inside", max);
        });
        console.log("outside", max, snapshot.displayName+"#"+currentHash);
        currentHash=max?max+1:1;
        await firestoreUsers.doc(snapshot.uid).set({
          profile: {
            Character_id: "",
            DataRegistration: "",
            email_id: snapshot.email,
            FirstName: "",
            Name: snapshot.displayName,
            FullName: snapshot.displayName+"#"+currentHash,
            LastActivity: "",
            LastName: "",
            Phone: snapshot.phoneNumber,
            user_id: snapshot.uid,
            portal_entry: false,
            hash: currentHash?currentHash:1,
          },
          Registered_event: [],
          avatars: [],
          quest: [],
          emotes: {},
          inventoryOwned: {},
          PrimaryWallet: "",
          wallet: wallet,
          transactions: [
            {
              coin_type: "gold", // "gold",
              actions: "deposit", // "deposit",
              amount: 10000,
              description: "amount in Player creation",
              time: new Date().toLocaleString("en-GB", {timeZone: "Asia/Kolkata"}),
            },
            {
              coin_type: "silver", // "gold",
              actions: "deposit", // "deposit",
              amount: 10000,
              description: "amount in Player creation",
              time: new Date().toLocaleString("en-GB", {timeZone: "Asia/Kolkata"}),
            },
          ],
        });
        console.log("data is saved");
      } catch (error) {
        console.log("erros in saving data", error);
      }
    });

exports.app = functions.https.onRequest(app);

