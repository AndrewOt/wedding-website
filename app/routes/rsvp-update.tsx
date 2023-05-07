import { ActionArgs, ActionFunction } from "@remix-run/node";
import { RsvpPatch, updateRsvp } from "~/utilities";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get('id')!.toString();
  const value = formData.get('value')!.toString();
  const fieldName = formData.get('fieldName')!.toString();
  const patchObj: RsvpPatch = { id, value, fieldName };

  return updateRsvp(patchObj);
};
