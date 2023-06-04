import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import type { IRsvpTest } from "~/routes/_index";

// See _index.tsx file for route action

const LoadingInvitation = () => (
  <div className="find-status find-status-animate">Loading</div>
);

export const FindRsvp = () => {
  const { state } = useNavigation();
  const rsvpAction = useActionData<IRsvpTest>();
  const [ceremonyYes, setCeremonyYes] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [receptionYes, setReceptionYes] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [updateStatusMessage, setUpdateStatusMessage] = useState("");
  const [choicePanelDisplay, setChoicePanelDisplay] = useState("none");
  const [findResultMessage, setFindResultMessage] = useState<string>("");

  const ONE_DAY = 24 * 60 * 60 * 1000;

  const currentDate = new Date();
  const weddingDate = new Date(2023, 7, 26);
  const diff = Math.ceil(
    (weddingDate.getTime() - currentDate.getTime()) / ONE_DAY
  );

  let daysToGoText = "";

  if (diff > 0) {
    daysToGoText = `(${diff} days to go!!)`;
  }

  useEffect(() => {
    setShowLoading(false);
    if (rsvpAction?.action === "Find") {
      if (rsvpAction.isInvited) {
        setChoicePanelDisplay("block");
        setFindResultMessage("We found your invite!");
        setNumberOfPeople(rsvpAction.numberOfPeople || 0);
      } else {
        setChoicePanelDisplay("none");
        setFindResultMessage("I'm sorry, we could not find your invite.");
      }
    } else if (rsvpAction?.action === "Save choice") {
      if (rsvpAction.successfulUpdate && rsvpAction.isAttending) {
        setUpdateStatusMessage("Got it saved! Excited you can make it!");
      } else if (rsvpAction.successfulUpdate && !rsvpAction.isAttending) {
        setUpdateStatusMessage(
          "Got it saved. We are so sad you won't be able to be there."
        );
      }

      setTimeout(() => {
        setUpdateStatusMessage("");
      }, 3000);
    }
  }, [rsvpAction]);

  return (
    <section className="section find-rsvp-section">
      <h1>Please join us in celebration on</h1>
      <div style={{ textAlign: "center" }}>
        <div>Saturday, August 26th {daysToGoText}</div>
        <div>1:30 pm</div>
        <div>Topeka KS</div>
      </div>

      <h1>RSVP</h1>
      <Form method="post">
        <div style={{ marginBottom: "0.5rem" }}>
          Find your invitation by typing your name exactly as it is addressed on
          your invitation envelope
        </div>
        <input type="hidden" name="rsvpId" value={rsvpAction?.rsvpId} />
        <div className="find-container">
          <input
            type="text"
            id="nameInput"
            name="inviteeName"
            className="text-box find-rsvp-text-box"
            placeholder="Please type your name here"
          />
          <input
            value="Find"
            type="submit"
            name="_action"
            className="button find-rsvp-button"
            disabled={state === "submitting"}
            onClick={() => {
              setShowLoading(true);
            }}
          />
        </div>

        {showLoading ? (
          <LoadingInvitation />
        ) : (
          <span className="find-status">{findResultMessage}</span>
        )}

        <div style={{ display: choicePanelDisplay }}>
          <div className="find-rsvp-form-input">
            <span className="find-rsvp-form-header">
              Will you be attending the ceremony?
            </span>
            <input
              type="radio"
              name="ceremony"
              id="ceremonyYes"
              value="ceremonyYes"
              checked={ceremonyYes}
              onChange={() => {
                setCeremonyYes(true);
              }}
            />
            <label htmlFor="ceremonyYes">Yes</label>
            <input
              type="radio"
              id="ceremonyNo"
              name="ceremony"
              value="ceremonyNo"
              checked={!ceremonyYes}
              onChange={() => {
                setCeremonyYes(false);
                setReceptionYes(false);
              }}
            />
            <label htmlFor="ceremonyNo">No</label>
          </div>

          <div
            style={{ display: ceremonyYes ? "block" : "none" }}
            className="find-rsvp-form-input"
          >
            <span className="find-rsvp-form-header">
              Will you be attending the reception?
            </span>
            <input
              type="radio"
              name="reception"
              id="receptionYes"
              value="receptionYes"
              checked={receptionYes}
              onChange={() => {
                setReceptionYes(true);
              }}
            />
            <label htmlFor="receptionYes">Yes</label>
            <input
              type="radio"
              name="reception"
              id="receptionNo"
              value="receptionNo"
              checked={!receptionYes}
              onChange={() => {
                setReceptionYes(false);
              }}
            />
            <label htmlFor="receptionNo">No</label>
            <div style={{ marginTop: "0.7rem" }}>
              <label htmlFor="numberOfPeople">Number of people coming</label>
              <input
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                value={numberOfPeople}
                className="text-box find-rsvp-text-box"
                onChange={(e) => {
                  const num = Number(e.currentTarget.value);
                  if (typeof num === "number") {
                    setNumberOfPeople(num);
                  }
                }}
              />
            </div>
          </div>

          <input
            type="submit"
            name="_action"
            value="Save choice"
            className="button save-rsvp-button"
            disabled={state === "submitting"}
          />
          <span className="find-status">{updateStatusMessage}</span>
        </div>
      </Form>
    </section>
  );
};
