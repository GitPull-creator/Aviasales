import { format, addMinutes } from "date-fns";

import classes from "./Ticket.module.scss";

function Ticket({ price, carrier, segments }) {
  const formatPrice = price.toLocaleString();
  const logo = `https://pics.avs.io/99/36/${carrier}.png`;

  const renderTicketContent = (segmentsData) =>
    segmentsData.map((segment) => {
      const { origin: from, destination: to, stops, date, duration } = segment;

      const start = format(new Date(date), "hh:mm");
      const finish = format(addMinutes(new Date(date), duration), "hh:mm");
      const formatDuration = `${Math.floor(duration / 60)}ч ${duration % 60}м`;
      const title = `${from} - ${to}`;
      const stopsCount = stops.length;
      const stopsCities = stops.join(", ");

      const totalStops = (count) => {
        switch (count) {
          case 0:
            return "Без пересадок";

          case 1:
            return "1 пересадка";

          default:
            return `${count} пересадки`;
        }
      };

      return (
        <div key={title} className={classes.Ticket__segment}>
          <p className={classes.Ticket__content}>
            <span className={classes.Ticket__title}>{title}</span>
            {`${start} - ${finish}`}
          </p>
          <p className={classes.Ticket__content}>
            <span className={classes.Ticket__title}>В пути</span>
            {formatDuration}
          </p>
          <p className={classes.Ticket__content}>
            <span className={classes.Ticket__title}>
              {totalStops(stopsCount)}
            </span>
            {stopsCities}
          </p>
        </div>
      );
    });

  const elements = renderTicketContent(segments);

  return (
    <div className={classes.Ticket}>
      <header className={classes.Ticket__header}>
        <span className={classes.Ticket__price}>{`${formatPrice} P`}</span>
        <img className={classes.Ticket__logo} src={logo} alt="Logo" />
      </header>
      <div>{elements}</div>
    </div>
  );
}

export default Ticket;
