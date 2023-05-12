/* eslint-disable no-return-assign */
const totalDuration = (data) =>
  data.segments.reduce((acc, prev) => acc + prev.duration, 0);

let newTickets = {};

const checkFilter = (checkedFilter, ticketsData) => {
  switch (checkedFilter) {
    case "cheap":
      return (newTickets = [
        ...ticketsData.sort((prev, next) => prev.price - next.price),
      ]);

    case "fast":
      return (newTickets = [
        ...ticketsData.sort(
          (prev, next) => totalDuration(prev) - totalDuration(next)
        ),
      ]);

    case "optimal":
      return (newTickets = [
        ...ticketsData.sort((prev, next) => {
          const optimalPrev = prev.price + totalDuration(prev);
          const optimalNext = next.price + totalDuration(next);

          return optimalPrev - optimalNext;
        }),
      ]);

    default:
      return newTickets;
  }
};

export { checkFilter };
