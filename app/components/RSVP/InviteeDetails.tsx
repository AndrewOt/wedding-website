import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { RsvpPatch } from "~/utilities";

export interface DataDisplayProps {
  rsvpId: string;
  header: string;
  fieldName: string;
  body: string | boolean | number;
};

const boolToString = (value: boolean) => value ? "yes" : "no";

export const InviteDetails = ({ header, body, rsvpId, fieldName }: DataDisplayProps) => {
  let inputComponent;
  const shouldBeText = !Number.isNaN(body);
  const formRef = useRef<HTMLFormElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [currentValue, setCurrentValue] = useState(body);
  const { submit, state, Form } = useFetcher<RsvpPatch>();

  const handleBlur = useCallback(() => {
    submit(formRef.current, { replace: true });
  }, []);

  useEffect(() => {
    if (state === "loading") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [state]);

  // text or number field
  if (typeof body === 'string' || typeof body === 'number') {
    inputComponent = (
      <>
        <input type="hidden" name="id" value={rsvpId} />
        <input type="hidden" name="fieldName" value={fieldName} />
        <input type="hidden" name="value" value={currentValue.toString()} />
        <input
          disabled={disabled}
          value={currentValue as number | string}
          type={shouldBeText ? 'text' : 'number'}
          onChange={(e) => {
            setCurrentValue(e.currentTarget.value as string);
          }}
          onBlur={() => {
            if (currentValue !== body) {
              handleBlur();
            }
          }}
        />
      </>
    );
  } else { // checkbox
    inputComponent = (
      <>
        <input type="hidden" name="id" value={rsvpId} />
        <input type="hidden" name="fieldName" value={fieldName} />
        <input type="hidden" name="value" value={currentValue.toString()} />
        <input
          type="checkbox"
          disabled={disabled}
          checked={currentValue as boolean}
          onChange={(e) => {
            setCurrentValue(Boolean(e.currentTarget.value));
          }}
          onBlur={() => {
            if (currentValue !== body) {
              handleBlur();
            }
          }}
        />
        <label>{`(${boolToString(body)})`}</label>
      </>
    );
  }

  return (
    <>
      <h4 className="rsvp-header">{header}</h4>
      <div className="rsvp-body">
        <Form action="/rsvp-update" method="patch" ref={formRef}>
          {inputComponent}
        </Form>
      </div>
    </>
  );
};
