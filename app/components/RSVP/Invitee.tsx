import type { CSSProperties } from "react";
import type { RSVP } from "~/routes/rsvps";

interface InviteeProps {
  rsvp: RSVP;
  isLast: boolean;
  isStripped: boolean;
}

export const Invitee = ({ rsvp, isStripped, isLast }: InviteeProps) => {
  const { inviteeName, isAttending, foodAllergies, numberOfPeople } = rsvp;
  const styles: CSSProperties = {
    display: "flex",
    paddingLeft: "5px",
    flexDirection: "column",
    backgroundColor: isStripped ? "#dcdcdc" : "#fff",
  };

  if (!isLast) {
    styles.borderBottom = "1px solid #000";
  }

  return (
    <div key={inviteeName} style={styles}>
      <span>Name: {inviteeName}</span>
      <span>isAttending: {isAttending ? "yes" : "no"}</span>
      <span>num guests: {numberOfPeople}</span>
      {typeof foodAllergies !== "undefined" && foodAllergies.length > 0 ? (
        <span>food allergies: {foodAllergies}</span>
      ) : null}
    </div>
  );
};
