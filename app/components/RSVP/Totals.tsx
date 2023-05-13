import type { RSVP } from "~/routes/rsvps";

export interface TotalsProps {
  rsvps: RSVP[];
}

export const Totals = ({ rsvps }: TotalsProps) => {
  const totalComingCeremony = rsvps.reduce((previousAccumlatorValue, currentRsvp) => {
    return currentRsvp.isAttendingCeremony
      ? previousAccumlatorValue + currentRsvp.numberOfPeople
      : previousAccumlatorValue;
  }, 0);

  const totalComingReception = rsvps.reduce((previousAccumlatorValue, currentRsvp) => {
    return currentRsvp.isAttendingReception
      ? previousAccumlatorValue + currentRsvp.numberOfPeople
      : previousAccumlatorValue;
  }, 0);

  const grandTotal = rsvps.reduce((previousAccumlatorValue, currentRsvp) =>
    previousAccumlatorValue + currentRsvp.numberOfPeople, 0);

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
      <span>Total invited: {grandTotal}</span>
      <span>Total coming to the ceremony: {totalComingCeremony}</span>
      <span>Total coming to the reception: {totalComingReception}</span>
    </div>
  );
};
