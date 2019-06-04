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
    const response = { success : true, "lifeCycles": lmap }
    res.status(200).send(response);
  } catch (exception) {
    console.log(exception);
    res.status(500).send(exception);
  }
});

/* Add Issue */
router.post("/issue/add/:id/", async (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  const db = database.getDB();

  try {
    const board = await db
      .collection("boards")
      .findOne({ boardId: parseInt(req.params.id) });

    if (!board) {
      res.status(404).send({
        success: false,
        message: `No board found`
      });
    }

    const issue = {
      ...req.body,
      comments: [],
      lifeCycle: req.body.lifeCycleName
    };
    const newlyInserted = await db.collection("issues").insert(issue);
    const dashboard = await db
      .collection("boards")
      .findAndModify({ boardId: parseInt(req.params.id) }, [], {
        $push: { issues: newlyInserted.insertedIds[0] }
      });
    res.send({ success: true, message: "Issue added successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});
/*END Add Issue */

/* Add Comment*/
router.post("/issue/:id/addcomment/", async (req, res, next) => {
  const db = database.getDB();

  try {
    const issue = await db
      .collection("issues")
      .findOne({ _id: ObjectId(req.params.id) });

    if (!issue) {
      res.status(404).send({
        success: false,
        message: `No issue found`
      });
    }
    const comment = {
      ...req.body,
      createdAt: Date.now()
    };
    const newlyInserted = await db.collection("comments").insert(comment);
    const dashboard = await db
      .collection("issues")
      .findAndModify({ _id: ObjectId(req.params.id) }, [], {
        $push: { comments: newlyInserted.insertedIds[0] }
      });
    res.send({ success: true, message: "Comment added successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});
/*END Add Comment */

module.exports = router;
