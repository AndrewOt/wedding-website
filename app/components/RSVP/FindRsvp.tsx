import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import { IRsvpTest } from "~/routes/_index";

// See _index.tsx file for route action

const LoadingInvitation = () => <div className="find-status find-status-animate">Loading</div>

export const FindRsvp = () => {
  const { state } = useNavigation();
  const rsvpAction = useActionData<IRsvpTest>();
  const [ceremonyYes, setCeremonyYes] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [receptionYes, setReceptionYes] = useState(false);
  const [updateStatusMessage, setUpdateStatusMessage] = useState('');
  const [choicePanelDisplay, setChoicePanelDisplay] = useState('none');
  const [findResultMessage, setFindResultMessage] = useState<string>('');

  useEffect(() => {
    setShowLoading(false);
    if (rsvpAction?.action === 'Find') {
      if (rsvpAction.isInvited) {
        setChoicePanelDisplay('block');
        setFindResultMessage('We found your invite! 🎉');
      } else {
        setChoicePanelDisplay('none');
        setFindResultMessage("I'm sorry, we could not find your invite.");
      }
    } else if (rsvpAction?.action === 'Save choice') {
      if (rsvpAction.successfulUpdate && rsvpAction.isAttending) {
        setUpdateStatusMessage('Got it saved! Excited you can make it! 😀');
      } else if (rsvpAction.successfulUpdate && !rsvpAction.isAttending) {
        setUpdateStatusMessage("Got it saved. We are so sad you won't be able to be there 😢");
      }

      setTimeout(() => { setUpdateStatusMessage(''); }, 3000);
    }
  }, [rsvpAction]);

  return (
    <div>
      <h1>RSVP 📨</h1>
      <Form method="post">
        <h4>Find your invitation by typing your name exactly as it is addressed on your invitation envelope</h4>
        <div className="find-container">
          <input id="nameInput" type="text" name="inviteeName" className="text-box" placeholder="Please type your name here" />
          <input name="_action" className="button" type="submit" value="Find" disabled={state === 'submitting'} />
        </div>

        {showLoading ? <LoadingInvitation /> : <span className="find-status">{findResultMessage}</span>}

        <div style={{ display: choicePanelDisplay }}>
          <div className="find-rsvp-form-input">
            <span className="find-rsvp-form-header">Will you be attending the ceremony?</span>
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
          </div>

          <div style={{ display: ceremonyYes ? 'block' : 'none' }} className="find-rsvp-form-input">
            <span className="find-rsvp-form-header">Will you be attending the reception?</span>
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

          <input
            type="submit"
            name="_action"
            className="button"
            value="Save choice"
            disabled={state === 'submitting'}
          />
          <span className="find-status">{updateStatusMessage}</span>
        </div>
      </Form>
    </div>
  );
};
