const express = require("express");
const router = express.Router();
const { getDB } = require("./../db/db");
ObjectId = require("mongodb").ObjectID;

/* Sign in */
router.post("/", async function(req, res, next) {
  try {
    const db = getDB();
    const user = { ...req.body };
    const currentUser = await db
      .collection("users")
      .findOne({ email: user.email });
    if (!currentUser || currentUser.password !== user.password) {
      res.status(200).send({
        success: false,
        message: "Please check your username or password"
      });
    } else {
      res.send({
        success: true,
        message: "sign in successfully",
        data: currentUser._id
      });
    }
  } catch (ex) {
    res.status(500).send(ex);
  }
});

module.exports = router;
