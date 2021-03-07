import { sortKeys as comparatorStrategy } from "../client/src/api";
import { tempData } from "./temp-data";
import express from "express";

const router = express.Router();

const PAGE_SIZE = 20;

// @desc     Get tickets list
// @access   Public
// @ts-ignore
router.get("/", [], (req, res) => {
  const searchVal: string = String(req.query.superSearch);
  const sortKey: string = String(req.query.sortBy);
  const page: number = Number(req.query.page) || 1;
  console.log("1");

  filterTickets(searchVal);
  sortTickets(sortKey);
  return res.send(paginateTickets(page));
});

function filterTickets(searchVal: string) {}

function sortTickets(sortKey: string) {
  if (sortKey && comparatorStrategy[sortKey]) {
    tempData.sort(comparatorStrategy[sortKey]);
  }
}

function paginateTickets(page: number) {
  return tempData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}

module.exports = router;
