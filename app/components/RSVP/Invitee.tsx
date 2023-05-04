import type { RSVP } from "~/routes/rsvps";

interface InviteeProps {
  rsvp: RSVP;
}

export const Invitee = ({ rsvp }: InviteeProps) => {
  return (
    <div key={rsvp.inviteeName}>
      <span>Name: {rsvp.inviteeName}</span>
      <span>isAttending: {rsvp.isAttending}</span>
      <span>num guests: {rsvp.numberOfPeople}</span>
      <span>food allergies: {rsvp.foodAllergies}</span>
    </div>
  );
};
