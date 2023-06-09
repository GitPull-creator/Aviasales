import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchId } from "../../actions";
import SortTickets from "../SortTickets";
import FilterTickets from "../FilterTickets";
import FilterMenu from "../Filter";
import TicketsList from "../TicketsList";
import Header from "../Header";

import classes from "./App.module.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchId());
  }, []);

  return (
    <div className={classes.App}>
      <Header />
      <FilterMenu />
      <main className={classes.App__content}>
        <SortTickets />
        <div className={classes.App__wrapper}>
          <FilterTickets />
          <TicketsList />
        </div>
      </main>
    </div>
  );
}

export default App;
