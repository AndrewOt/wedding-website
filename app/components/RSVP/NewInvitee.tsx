import { Form } from '@remix-run/react';
import { useEffect, useRef } from 'react';

export interface NewInviteeProps {
  errors: { message: string };
}

export default ({ errors }: NewInviteeProps) => {
  let formRef = useRef<HTMLFormElement>(null);
  let nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (errors === undefined) {
      formRef.current?.reset();
      nameRef.current?.focus();
    }
  });

  return (
    <div style={{ marginLeft: '5px' }}>
      <h2>Add an Attendee</h2>
      {errors?.message?.length > 0 ? errors.message : null}

      <Form replace ref={formRef} method="post">
        <div style={{ display: 'flex', flexDirection: 'column', width: '40vw' }}>
          <label>Invitee's Name</label>
          <input ref={nameRef} type="text" placeholder="Invitee's Name" id="inviteeName" name="inviteeName" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Number of Attendees</label>
          <input style={{ width: '5vw' }} type="number" id="numberOfPeople" name="numberOfPeople" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Are they coming to the ceremony?</label>
          <input style={{ width: '5rem', transform: 'translateX(-1.5rem)' }} type="checkbox" id="isAttendingCeremony" name="isAttendingCeremony" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Are they coming to the reception?</label>
          <input style={{ width: '5rem', transform: 'translateX(-1.5rem)' }} type="checkbox" id="isAttendingReception" name="isAttendingReception" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Are they coming to the rehersal?</label>
          <input style={{ width: '5rem', transform: 'translateX(-1.5rem)' }} type="checkbox" id="isAttendingRehersal" name="isAttendingRehersal" />
        </div>

        <input type="submit" value="Add New Invitee" />
      </Form>
    </div>
  )
}
