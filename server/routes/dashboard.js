const express = require("express");
const router = express.Router();
const { getDB } = require("./../db/db");
ObjectId = require("mongodb").ObjectID;

/* Add Dashboard. */
router.post("/add/:id", async function(req, res, next) {
  try {
    const db = getDB();

    const currentUserId = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.params.id) });
    if (!currentUserId) {
      res.status(404).send({
        success: false,
        message: `No user found`
      });
    }
    const boards = db.collection("boards").find();
    const boardId = (await boards.count()) + 1;
    const newBoard = {
      ...req.body,
      boardId,
      issues: [],
      members: [currentUserId._id]
    };
    const newlyInserted = await db.collection("boards").insert(newBoard);
    const dashboard = await db
      .collection("dashboard")
      .findAndModify({ userId: ObjectId(currentUserId._id) }, [], {
        $push: { boards: newlyInserted.insertedIds[0] }
      });
    if (!dashboard.lastErrorObject.updatedExisting) {
      console.log("insert dashboard");
      await db.collection("dashboard").insert({
        userId: ObjectId(req.params.id),
        boards: [newlyInserted.insertedIds[0]]
      });
    }
    res.send(dashboard);
  } catch (ex) {
    res.send(ex);
  }
});

/* Get Dashboard List */
router.get("/getList/:id", async function(req, res, next) {
  try {
    const db = getDB();
    const userId = ObjectId(req.params.id);
    const currentUserId = await db.collection("users").findOne({ _id: userId });
    if (!currentUserId) {
      res.send("User Id not matched");
    }

    const dashboard = await db
      .collection("dashboard")
      .findOne({ userId: userId });
    const boardIds = dashboard.boards.map(function(board) {
      return {
        _id: board
      };
    });
    const boards = await db
      .collection("boards")
      .find({
        $or: boardIds
      })
      .toArray();
    res.send(boards);
  } catch (ex) {
    res.send(ex);
  }
});

module.exports = router;
