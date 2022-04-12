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

import {firestoreAsset} from "./setup";
import {getAuth, sendEmailVerification} from "@firebase/auth";
import {validateFirebaseIdToken} from "./middleware";

const express = require("express");
const router = express.Router();

router.post("/newuser", async (req:any, res:any)=>{
  console.log(`request body is ${JSON.stringify(req.body)}`);
  //   res.send({data: "OK"});
  const avatar=await firestoreAsset.doc(req.body.avatarId).get();
  if (!avatar.data()) {
    console.log("No Data");
    return res.send({data: "No data"}); // response.error(res, 404, message.NO_ASSET_FOUND);
  } else {
    console.log("asset is", avatar.data());
    return res.send({data: avatar.data()});
    // response.success(res, 302, message.ASSET_FOUND, avatar.data());
  }
});
router.get("/verify-email", validateFirebaseIdToken, async (req:any, res:any)=>{
  console.log(`request body is ${JSON.stringify(req.body)}`);
  //   res.send({data: "OK"});
  // const avatar=await firestoreAsset.doc(req.body.avatarId).get();
  // if (!avatar.data()) {
  //   console.log("No Data");
  //   return res.send({data: "No data"}); // response.error(res, 404, message.NO_ASSET_FOUND);
  // } else {
  //   console.log("asset is", avatar.data());
  //   return res.send({data: avatar.data()});
  //   // response.success(res, 302, message.ASSET_FOUND, avatar.data());
  // }
  const auth =await getAuth();
  await sendEmailVerification(auth.currentUser!)
      .then(() => {
        return res.send({data: true});
      }).catch((error)=>{
        return res.send({data: false});
      });
});

export = router;


// <script type="module">
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyCpKHKUY4GdP4fVTuKmNEJVQZ7LqDXo8U8",
//     authDomain: "test-69192.firebaseapp.com",
//     databaseURL: "https://test-69192.firebaseio.com",
//     projectId: "test-69192",
//     storageBucket: "test-69192.appspot.com",
//     messagingSenderId: "1039485515250",
//     appId: "1:1039485515250:web:19f089ca9a57a5543fe76b"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
// </script>

