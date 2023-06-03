import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";

export interface NewInviteeProps {
  errors: { message: string };
}

const NewInvitee = ({ errors }: NewInviteeProps) => {
  const { state } = useNavigation();
  let formRef = useRef<HTMLFormElement>(null);
  let nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (errors === undefined) {
      formRef.current?.reset();
      nameRef.current?.focus();
    }
  }, [state]);

  return (
    <div style={{ marginLeft: "5px" }}>
      <h2>Add an Attendee</h2>
      {errors?.message?.length > 0 ? errors.message : null}

      <Form replace ref={formRef} method="post">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40vw",
            marginBottom: "10px",
          }}
        >
          <label>Invitee's Name</label>
          <input
            type="text"
            ref={nameRef}
            id="inviteeName"
            name="inviteeName"
            className="text-box"
          />
        </div>

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            flexDirection: "column",
          }}
        >
          <label>Number of Attendees</label>
          <input
            type="number"
            id="numberOfPeople"
            className="text-box"
            name="numberOfPeople"
            style={{ width: "5vw" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Are they coming to the ceremony?</label>
          <input
            type="checkbox"
            className="text-box"
            id="isAttendingCeremony"
            name="isAttendingCeremony"
            style={{ width: "5rem", transform: "translateX(-1.5rem)" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label>Are they coming to the reception?</label>
          <input
            type="checkbox"
            className="text-box"
            id="isAttendingReception"
            name="isAttendingReception"
            style={{ width: "5rem", transform: "translateX(-1.5rem)" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40vw",
            marginBottom: "10px",
          }}
        >
          <label htmlFor="inviteeAddress">Invitee's Address</label>
          <input
            type="text"
            id="inviteeAddress"
            className="text-box"
            name="inviteeAddress"
            style={{ width: "40vw" }}
          />
        </div>

        <input type="submit" value="Add New Invitee" className="button" />
      </Form>
    </div>
  );
};

export default NewInvitee;
