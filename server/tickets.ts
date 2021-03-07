import {
  sortKeys as comparatorStrategy,
  Ticket,
  PAGE_SIZE,
  searchFilters,
} from "../client/src/api";
import { tempData } from "./temp-data";
import express from "express";
import binarySearch from "binary-search";

const router = express.Router();
const ticketsToWords: Map<Ticket, string[]> = createKeywords();

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
  // No filter is needed for an empty input
  if (!searchInput || searchInput.length == 0) return tempData;

  // Apply superSearch if searchInput is a single word
  if (!searchInput.includes(" ") && !searchInput.includes(":")) return superSearch(searchInput);

  let tickets = tempData;

  let [key, text] = SplitByFirstOccurrence(searchInput, ":");

  // Attempt to apply search filter
  if (key.length !== 0) {
    let [val, search] = SplitByFirstOccurrence(text, " ");

    if (val.length == 0 && key.length != 0) [val, search] = [search, val];
    text = search;

    let filterFunc = searchFilters[key];
    if (filterFunc) tickets = tempData.filter((t) => filterFunc(t, val));
    if (text.length == 0) return tickets;
  }

  return tickets.filter((t) =>
    (t.title.toLowerCase() + t.content.toLowerCase()).includes(text.toLowerCase())
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

function createKeywords() {
  let keywords: Map<Ticket, string[]> = new Map();

  for (const ticket of tempData) {
    let words1 = ticket.title.split(" ");
    let words2 = ticket.content.split(" ");
    let words = [...words1, ...words2].map((w) => w.toLowerCase());

    words.sort();
    keywords.set(ticket, words);
  }

  return keywords;
}

function superSearch(word: string) {
  word = word.toLowerCase();
  let matchedTickets: Ticket[] = [];

  for (const ticket of tempData) {
    let keywords = ticketsToWords.get(ticket);
    // @ts-ignore
    if (binarySearch(keywords, word, (s1: string, s2: string) => s1.localeCompare(s2)) >= 0) {
      matchedTickets.push(ticket);
    }
  }

  return matchedTickets;
}

function SplitByFirstOccurrence(str: string, separator: string) {
  let index = str.indexOf(separator);
  return [str.substr(0, index), str.substr(index + 1)];
}

module.exports = router;
