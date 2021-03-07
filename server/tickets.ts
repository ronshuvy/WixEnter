import { sortKeys as comparatorStrategy, Ticket, PAGE_SIZE } from "../client/src/api";
import { tempData } from "./temp-data";
import express from "express";

const router = express.Router();

// @desc     Get tickets list
// @access   Public
// @ts-ignore
router.get("/", [], (req, res) => {
  const searchInput: string = req.query.superSearch;
  const sortKey: string = req.query.sortBy;
  const page: number = req.query.page || 1;

  const filteredTickets: Ticket[] = filterTickets(searchInput);
  const sortedTickets: Ticket[] = sortTickets(filteredTickets, sortKey);
  return res.send(paginateTickets(sortedTickets, page));
});

function filterTickets(searchInput: string) {
  if (!searchInput || searchInput.length == 0) return tempData;

  let [key, content] = SplitByFirstOccurrence(searchInput, ":");

  if (key.length == 0) {
    return tempData.filter((t) =>
      (t.title.toLowerCase() + t.content.toLowerCase()).includes(content.toLowerCase())
    );
  }

  let [val, search] = SplitByFirstOccurrence(content, " ");
  if (val.length == 0 && key.length != 0) [val, search] = [search, val];

  let filterFunc: (t: Ticket) => boolean;
  switch (key) {
    case "from":
      filterFunc = (t: Ticket) => t.userEmail === val;
      break;
    case "before":
      filterFunc = (t: Ticket) => t.creationTime <= new Date(val).getTime();
      break;
    case "after":
      filterFunc = (t: Ticket) => t.creationTime >= new Date(val).getTime();
      break;
    default:
      filterFunc = () => true;
  }

  return tempData.filter(
    (t) =>
      (t.title.toLowerCase() + t.content.toLowerCase()).includes(search.toLowerCase()) &&
      filterFunc(t)
  );
}

function sortTickets(tickets: Ticket[], sortKey: string) {
  if (sortKey && comparatorStrategy[sortKey]) {
    tickets.sort(comparatorStrategy[sortKey]);
  }
  return tickets;
}

function paginateTickets(tickets: Ticket[], page: number) {
  return tickets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}

function SplitByFirstOccurrence(str: string, separator: string) {
  let index = str.indexOf(separator);
  return [str.substr(0, index), str.substr(index + 1)];
}

module.exports = router;
