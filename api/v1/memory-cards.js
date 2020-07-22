// The memory-cads resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");

// @route       GET api/v1/memory-cards
// @desc        GET all memorys cards for a user by search term and order
// @access      Public

router.get("/", (req, res) => {
   db.query(
      selectAllCards(
         "16672b8b-6946-4016-b7b8-f450b911f69e",
         "marsh",
         "`memory_cards`.`created_at` DESC"
      )
   )
      .then((dbRes) => {
         console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
