// The memory-cads resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");

// @route       GET api/v1/memory-cards
// @desc        GET all memorys cards for a user by search term and order
// @access      Public

router.get("/", (req, res) => {
   console.log(req.query);
   const { userId, searchTerm, order } = req.query;
   let constructedSearchTerm;
   if (searchTerm === "" || searchTerm === undefined) {
      constructedSearchTerm = "%%";
   } else {
      constructedSearchTerm = `%${searchTerm}%`;
   }
   /* https://www.npmjs.com/package/mysql#escaping-query-values */

   db.query(selectAllCards, [
      userId,
      constructedSearchTerm,
      constructedSearchTerm,
      order,
   ])
      .then((dbRes) => {
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
