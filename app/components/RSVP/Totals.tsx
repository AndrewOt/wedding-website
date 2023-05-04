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
        typeof currentRsvp.foodAllergies !== "undefined" ||
        currentRsvp.foodAllergies !== ""
      ) {
        return previousAccumlatorValue + 1;
      }
      return previousAccumlatorValue;
    },
    0
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>Total coming: {totalComing}</span>
      <span>Total with allergies: {totalWithAllergies}</span>
    </div>
  );
};
