import type { CSSProperties } from "react";
import type { RSVP } from "~/routes/rsvps";
import { DataDisplay } from "./DataDisplay";

interface InviteeProps {
  rsvp: RSVP;
  isLast: boolean;
  isStripped: boolean;
}

export const Invitee = ({ rsvp, isStripped, isLast }: InviteeProps) => {
  const {
    inviteeName,
    numberOfPeople,
    isAttendingCeremony,
    isAttendingReception
  } = rsvp;

  const styles: CSSProperties = {
    display: "flex",
    paddingLeft: "5px",
    flexDirection: "column",
    borderTop: "1px solid #000",
    backgroundColor: isStripped ? "#dcdcdc" : "#fff",
  };

  if (isLast) {
    styles.borderBottom = "1px solid #000";
  }

  return (
    <div key={inviteeName} style={styles}>
      <DataDisplay header="Name" body={inviteeName} />
      <DataDisplay
        header="Are they coming to the ceremony?"
        body={isAttendingCeremony ? "yes" : "no"}
      />
      <DataDisplay
        header="Are they coming to the reception?"
        body={isAttendingReception ? "yes" : "no"}
      />
      <DataDisplay
        header="How many were invited?"
        body={numberOfPeople.toString()}
      />
    </div>
  );
};
