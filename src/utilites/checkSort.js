const checkSort = (sortStatus, tickets, newTickets) => {
  const activeSorts = Object.entries(sortStatus)
    .slice(1)
    .reduce((acc, sort, index) => {
      const [_, val] = sort;
      if (val) {
        acc.push([index]);
      }

      return acc;
    }, [])
    .flat();

  return [
    ...tickets.filter((ticket) => {
      const [seg1, seg2] = ticket.segments;
      const countStopsSeg1 = seg1.stops.length;
      const countStopsSeg2 = seg2.stops.length;
      return activeSorts.includes(countStopsSeg1, countStopsSeg2);
    }),
  ];
};

export { checkSort };
