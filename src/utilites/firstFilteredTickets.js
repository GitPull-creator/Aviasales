import { checkFilter } from "./checkFilter";
import { checkSort } from "./checkSort";

const firstFilteredTickets = (filter, sort, tickets) => {
  let newTickets = checkFilter(filter, tickets);

  if (!sort.all) {
    newTickets = checkSort(sort, tickets, newTickets);
  }

  return newTickets;
};

export { firstFilteredTickets };
