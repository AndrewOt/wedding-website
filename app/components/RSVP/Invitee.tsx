import { CSSProperties } from "react";
import type { RSVP } from "~/routes/rsvps";
import { InviteDetails } from "./InviteeDetails";

interface InviteeProps {
  rsvp: RSVP;
  isLast: boolean;
  isStripped: boolean;
}

export const Invitee = ({ rsvp, isStripped, isLast }: InviteeProps) => {
  const {
    id,
    inviteeName,
    numberOfPeople,
    isAttendingCeremony,
    isAttendingRehersal,
    isAttendingReception,
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
      <InviteDetails header="Name" body={inviteeName} rsvpId={id} fieldName="inviteeName" />
      <InviteDetails
        rsvpId={id}
        body={isAttendingCeremony}
        fieldName="isAttendingCeremony"
        header="Are they coming to the ceremony?"
      />
      <InviteDetails
        rsvpId={id}
        body={isAttendingReception}
        fieldName="isAttendingReception"
        header="Are they coming to the reception?"
      />
      <InviteDetails
        rsvpId={id}
        body={isAttendingRehersal}
        fieldName="isAttendingRehersal"
        header="Are they coming to the rehersal dinner?"
      />
      <InviteDetails
        rsvpId={id}
        fieldName="numberOfPeople"
        header="How many were invited?"
        body={numberOfPeople.toString()}
      />
    </div>
  );
};
