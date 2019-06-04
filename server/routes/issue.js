const express = require('express');
const router = express.Router();
const database = require('../db/db');
const ObjectId = require("mongodb").ObjectID;

router.post('/:id/',async (req,res,next) => {
  const id = parseInt(req.params.id);
  const {lifeCycle} = req.body;
  if (isNaN(id)) {
    res.status(400).send({
      success : false,
      message : `${req.params.id} should be number`
    })
  }
  const db = database.getDB();
  try {
    const issue = await db.collection('issues').updateOne({ issueId: id },{$set : {lifeCycle : lifeCycle}});
    if (!issue) {
      res.status(400).send({
        success : false,
        message : `No issues found with id :${id}`
      })
    }
    res.status(200).send({success : true, issue});
  } catch(ex) {
    res.status(500).send(ex);
  }  
});

module.exports = router;