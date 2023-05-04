import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/router";

export const action: ActionFunction = (params) => {
  const check = new Promise((resovle, reject) => {
    console.log(params);
  });
  return check;
};

export default function Login() {
  return (
    <div>
      <Form>
        <input placeholder="Passcode" type="text" />
        <input type="submit" />
      </Form>
    </div>
  );
}
