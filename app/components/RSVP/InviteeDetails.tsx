import { useFetcher } from "@remix-run/react";
import { useCallback, useRef, useState } from "react";

export interface DataDisplayProps {
  rsvpId: string;
  header: string;
  fieldName: string;
  body: string | boolean | number;
};

const convertStringIfBoolean = (value: unknown) => {
  if (typeof value === 'boolean') {
    return value ? "Yes" : "No";
  }

  return value;
};

export const InviteDetails = ({ header, body, rsvpId, fieldName }: DataDisplayProps) => {
  let inputComponent;
  const { submit, state, Form } = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);
  const [currentValue, setCurrentValue] = useState(convertStringIfBoolean(body));

  const handleBlur = useCallback(() => {
    submit(formRef.current, { replace: true });
  }, []);

  // text or number field
  if (fieldName === 'address') {
    inputComponent = (
      <>
        <input type="hidden" name="id" value={rsvpId} />
        <textarea
          rows={3}
          name={fieldName}
          className="text-box"
          disabled={state === "loading"}
          style={{ backgroundColor: 'white', width: '40vw' }}
          value={currentValue as number | string}
          onChange={(e) => {
            setCurrentValue(e.currentTarget.value as string);
          }}
          onBlur={() => {
            handleBlur();
          }}
        />
      </>
    );
  } else if (typeof body === 'string' || typeof body === 'number') {
    inputComponent = (
      <>
        <input type="hidden" name="id" value={rsvpId} />
        <input
          type="text"
          name={fieldName}
          className="text-box"
          disabled={state === "loading"}
          style={{ backgroundColor: 'white', width: '40vw' }}
          value={currentValue as number | string}
          onChange={(e) => {
            setCurrentValue(e.currentTarget.value as string);
          }}
          onBlur={() => {
            handleBlur();
          }}
        />
      </>
    );
  } else { // radio buttons
    inputComponent = (
      <>
        <input type="hidden" name="id" value={rsvpId} />
        <input
          value="Yes"
          type="radio"
          name={fieldName}
          disabled={state === "loading"}
          checked={currentValue === 'Yes'}
          id={`Yes-${rsvpId}-${fieldName}`}
          onChange={(e) => {
            setCurrentValue(e.currentTarget.value);
            handleBlur();
          }}
        />
        <label htmlFor={`Yes-${rsvpId}-${fieldName}`}>Yes</label>

        <input
          value="No"
          type="radio"
          name={fieldName}
          disabled={state === "loading"}
          checked={currentValue === 'No'}
          id={`No-${rsvpId}-${fieldName}`}
          onChange={(e) => {
            setCurrentValue(e.currentTarget.value);
            handleBlur();
          }}
        />
        <label htmlFor={`No-${rsvpId}-${fieldName}`}>No</label>
      </>
    );
  }

  return (
    <>
      <h4 className="rsvp-header">{header}</h4>
      <div className="rsvp-body">
        <Form action="/rsvp-update" method="patch" ref={formRef} style={{ marginBottom: '15px' }}>
          {inputComponent}
        </Form>
      </div>
    </>
  );
};
