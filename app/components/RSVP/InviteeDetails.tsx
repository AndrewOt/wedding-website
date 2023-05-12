import { useFetcher } from "@remix-run/react";
import { useCallback, useRef, useState } from "react";

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
  const [currentValue, setCurrentValue] = useState(body);
  const { submit, state, Form } = useFetcher();

  const handleBlur = useCallback(() => {
    submit(formRef.current, { replace: true });
  }, []);

  // text or number field
  if (typeof body === 'string' || typeof body === 'number') {
    inputComponent = (
      <>
        <input type="hidden" name="id" value={rsvpId} />
        <input
          name={fieldName}
          disabled={state === "loading"}
          value={currentValue as number | string}
          type={shouldBeText ? 'text' : 'number'}
          onChange={(e) => {
            setCurrentValue(e.currentTarget.value as string);
          }}
          onBlur={() => {
            handleBlur();
          }}
        />
      </>
    );
  } else { // checkbox
    inputComponent = (
      <>
        <input type="hidden" name="id" value={rsvpId} />
        <input
          type="checkbox"
          name={fieldName}
          disabled={state === "loading"}
          defaultChecked={currentValue as boolean}
          onChange={(e) => {
            setCurrentValue(e.currentTarget.checked);
            handleBlur();
          }}
        />
        <label>{`(${boolToString(Boolean(currentValue))})`}</label>
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
