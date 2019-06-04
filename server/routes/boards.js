const express = require('express');
const router = express.Router();
const database = require('../db/db');
const ObjectId = require("mongodb").ObjectID;

router.get('/:id/', async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({
      success : false,
      message : `${req.params.id} should be number`
    })
  }
  const db = database.getDB();
  try {
    const [board] = await db.collection('boards').find({ boardId: id }).toArray();
    if (!board) {
      res.status(400).send({
        success : false,
        message : `No boards found with id :${id}`
      })
    }
    const { lifeCycles, issues } = board;
    const lmap = {}
    lifeCycles.forEach((lc) => {
      lmap[lc] = [];
    })
    const issueIdList = issues.map((id) => ObjectId(id));
    const issuesfromcoll = await db.collection('issues').find({ _id: { $in: issueIdList } }).toArray();
    issuesfromcoll.forEach((issue) => {
      const { lifeCycle } = issue;
      lmap[lifeCycle].push(issue);
    });
    const response = { "lifeCycles": lmap }
    res.status(200).send(response);

  } catch (exception) {
    console.log(exception);
    res.status(500).send(exception);
  }
}
);

module.exports = router;
