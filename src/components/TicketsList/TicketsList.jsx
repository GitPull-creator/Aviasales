import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { fetchTickets, ticketsFetched } from "../../actions";
import { checkFilter } from "../../utilites/checkFilter";
import { checkSort } from "../../utilites/checkSort";
import { firstFilteredTickets } from "../../utilites/firstFilteredTickets";
import Ticket from "../Ticket";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";

import classes from "./TicketsList.module.scss";

function TicketsList() {
  const [numberOfTickets, setNumberOfTickets] = useState(5);
  const [firstPack, setFirstPack] = useState([]);

  const { searchId } = useSelector((state) => state.id);
  const { tickets } = useSelector((state) => state.tickets);
  const { activeFilter } = useSelector((state) => state.filter);
  const { sortStatus } = useSelector((state) => state.sort);
  const { searchStatus, tiketsLoadingStatus } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setFirstPack(tickets);
  }, [firstPack, tickets]);

  useEffect(() => {
    if (searchId && !searchStatus) {
      dispatch(fetchTickets(searchId, tickets));
    }
    if (searchStatus) {
      dispatch(ticketsFetched());
    }
  }, [searchId, tickets, searchStatus]);

  const filteredTicketsSelector = createSelector(
    (state) => state.filter.activeFilter,
    (state) => state.sort.sortStatus,
    (state) => state.tickets.tickets,
    (filter, sort, ticketsData) => {
      let newTickets = useMemo(
        () => checkFilter(filter, ticketsData),
        [filter, ticketsData]
      );
      if (!sort.all) {
        newTickets = checkSort(sort, tickets, newTickets);
      }
      return newTickets;
    }
  );

  const addTickets = () => {
    setNumberOfTickets(numberOfTickets + 5);
  };

  const rendreTickets = (data, num) => {
    const rendreData = data.slice(0, num).map((ticket) => {
      const { price, carrier, segments } = ticket;
      return (
        <Ticket
          key={`${carrier}_${price}_${segments[0].duration}`}
          price={price}
          carrier={carrier}
          segments={segments}
        />
      );
    });

    const error = tiketsLoadingStatus === "error" ? <ErrorMessage /> : null;

    const rendreNoTickets =
      !data.length && searchStatus && tiketsLoadingStatus !== "error" ? (
        <h2>Рейсов, подходящих под заданные фильтры, не найдено</h2>
      ) : null;

    const rendreBtn =
      data.length && tiketsLoadingStatus !== "error" ? (
        <button
          type="button"
          className={classes.TicketsList__btn}
          onClick={addTickets}
        >
          Показать еще 5 билетов!
        </button>
      ) : null;

    return (
      <>
        {error}
        {rendreNoTickets}
        {rendreData}
        {rendreBtn}
      </>
    );
  };

  const filtredTickects = useSelector(filteredTicketsSelector);
  const firstPackTickets = rendreTickets(
    firstFilteredTickets(activeFilter, sortStatus, firstPack),
    numberOfTickets
  );
  const allTickets = rendreTickets(filtredTickects, numberOfTickets);

  const loader =
    !searchStatus && tiketsLoadingStatus !== "error" ? <Spinner /> : null;
  const elements = searchStatus ? allTickets : firstPackTickets;

  return (
    <ul className={classes.TicketsList}>
      {loader}
      {elements}
    </ul>
  );
}

export default TicketsList;
