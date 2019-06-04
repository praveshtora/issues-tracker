const express = require("express");
const router = express.Router();
// const emailService = require("../service/email");
const database = require("../db/db");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("successfully connected");
});

// router.post("/invite", async (req, res, next) => {
//   const { email, boardId } = req.body;
//   try {
//     const success = await emailService("pravesh.tora@gmail.com");
//     const db = database.getDB();
//     const board = await db.collection("boards").findOne({ boardId });
//     if (board) {
//       const {members} = board;
//       members.push({name : "Vikalp"})
//     }
//     const updatedBoard = await db.collection("boards").updateOne({boardId},{$set :{members : members}});
    
//   } catch (ex) {
//     res.status(500).send({ success: false });
//   }
// });
module.exports = router;
