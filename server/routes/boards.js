const express = require("express");
const router = express.Router();
const database = require("../db/db");
const ObjectId = require("mongodb").ObjectID;

router.get("/:id/", async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({
      success: false,
      message: `${req.params.id} should be number`
    });
  }
  const db = database.getDB();
  try {
    const [board] = await db
      .collection("boards")
      .find({ boardId: id })
      .toArray();
    if (!board) {
      res.status(400).send({
        success: false,
        message: `No boards found with id :${id}`
      });
    }
    const { lifeCycles, issues } = board;
    const lmap = {};
    lifeCycles.forEach(lc => {
      lmap[lc] = [];
    });
    const issueIdList = issues.map(id => ObjectId(id));
    const issuesfromcoll = await db
      .collection("issues")
      .find({ _id: { $in: issueIdList } })
      .toArray();
    issuesfromcoll.forEach(issue => {
      const { lifeCycle } = issue;
      lmap[lifeCycle].push(issue);
    });
    const response = { lifeCycles: lmap };
    res.status(200).send(response);
  } catch (exception) {
    console.log(exception);
    res.status(500).send(exception);
  }
});

/* Add Issue */
router.post("/issue/add/:id/", async (req, res, next) => {
  const db = database.getDB();

  try {
    const board = await db
      .collection("boards")
      .findOne({ boardId: req.params.id });

    const issue = {
      ...req.body,
      comments: [],
      lifeCycle: board.lifeCycles[0]
    };
    const newlyInserted = await db.collection("issues").insert(issue);
    const dashboard = await db
      .collection("boards")
      .findAndModify({ boardId: req.params.id }, [], {
        $push: { issues: newlyInserted.insertedIds[0] }
      });
    res.send({ success: true, message: "Issue added successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
