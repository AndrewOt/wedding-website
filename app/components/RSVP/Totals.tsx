import type { RSVP } from "~/routes/rsvps";

export interface TotalsProps {
  rsvps: RSVP[];
}

export const Totals = ({ rsvps }: TotalsProps) => {
  const totalComing = rsvps.reduce((previousAccumlatorValue, currentRsvp) => {
    return currentRsvp.isAttending
      ? previousAccumlatorValue + currentRsvp.numberOfPeople
      : previousAccumlatorValue;
  }, 0);

  const totalWithAllergies = rsvps.reduce(
    (previousAccumlatorValue, currentRsvp) => {
      if (
        typeof currentRsvp.foodAllergies !== "undefined" &&
        currentRsvp.foodAllergies !== ""
      ) {
        return previousAccumlatorValue + 1;
      }
      return previousAccumlatorValue;
    },
    0
  );

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "5px",
        marginBottom: "15px",
        flexDirection: "column",
      }}
    >
      <h2>Totals</h2>
      <span>Total coming: {totalComing}</span>
      {totalWithAllergies > 0 ? (
        <span>Total with allergies: {totalWithAllergies}</span>
      ) : null}
    </div>
  );
};
