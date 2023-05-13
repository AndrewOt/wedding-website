import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { IRsvpTest } from "~/routes/_index";

// See _index.tsx file for route action

export const FindRsvp = () => {
  const rsvpAction = useActionData<IRsvpTest>();
  const [updateStatusMessage, setUpdateStatusMessage] = useState('');
  const [choicePanelDisplay, setChoicePanelDisplay] = useState('none');
  const [findResultMessage, setFindResultMessage] = useState<string>('');
  const [ceremonyYes, setCeremonyYes] = useState(false);
  const [receptionYes, setReceptionYes] = useState(false);

  useEffect(() => {
    if (rsvpAction?.action === 'Find') {
      if (rsvpAction.isInvited) {
        setFindResultMessage('We found your invite!');
        setChoicePanelDisplay('block');
      } else {
        setFindResultMessage("I'm sorry, we could not find your invite.");
        setChoicePanelDisplay('none');
      }
    } else if (rsvpAction?.action === 'Save choice') {
      if (rsvpAction.successfulUpdate && rsvpAction.isAttending) {
        setUpdateStatusMessage('Got it saved! Excited you can make it! 😀');
      } else if (rsvpAction.successfulUpdate && !rsvpAction.isAttending) {
        setUpdateStatusMessage("Got it saved. We are so sad you won't be able to be there 😢");
      }
    }
  }, [rsvpAction]);

  return (
    <div>
      <h1>RSVP 📨</h1>
      <Form method="post">
        <h4>Find your invitation by typing your name exactly as it appears on your invitiation</h4>
        <input id="nameInput" type="text" name="inviteeName" placeholder="Please type your name here" />
        <input name="_action" type="submit" value="Find" />

        <h4>{findResultMessage}</h4>

        <div style={{ display: choicePanelDisplay }}>
          <div>
            <h4>Will you be attending the ceremony?</h4>
            <input
              type="radio"
              name="ceremony"
              id="ceremonyYes"
              value="ceremonyYes"
              checked={ceremonyYes}
              onChange={() => { setCeremonyYes(true); }}
            />
            <label htmlFor="ceremonyYes">Yes</label>
            <input
              type="radio"
              id="ceremonyNo"
              name="ceremony"
              value="ceremonyNo"
              checked={!ceremonyYes}
              onChange={() => { setCeremonyYes(false); setReceptionYes(false); }}
            />
            <label htmlFor="ceremonyNo">No</label>

            <div style={{ display: ceremonyYes ? 'block' : 'none' }}>
              <h4>Will you be attending the reception?</h4>
              <input
                type="radio"
                name="reception"
                id="receptionYes"
                value="receptionYes"
                checked={receptionYes}
                onChange={() => { setReceptionYes(true); }}
              />
              <label htmlFor="receptionYes">Yes</label>
              <input
                type="radio"
                name="reception"
                id="receptionNo"
                value="receptionNo"
                checked={!receptionYes}
                onChange={() => { setReceptionYes(false); }}
              />
              <label htmlFor="receptionNo">No</label>
            </div>

            <input type="submit" value="Save choice" name="_action" />
            <h4>{updateStatusMessage}</h4>
          </div>
        </div>
      </Form>
    </div>
  );
};
