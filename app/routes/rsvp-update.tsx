import { ActionArgs, ActionFunction } from "@remix-run/node";
import { updateRsvp } from "~/utilities";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const updateMap = new Map<string, string>();
  // Do a non-null assertion here because if this isn't here for every request, something is wrong.
  updateMap.set("id", formData.get('id')!.toString());

  for (const [key, value] of formData.entries()) {
    if (formData.has(key)) {
      updateMap.set(key, value.toString());
    }
  }

  if (!updateMap.has('isAttendingCeremony')) {
    updateMap.set('isAttendingCeremony', 'off');
  }

  if (!updateMap.has('isAttendingRehersal')) {
    updateMap.set('isAttendingRehersal', 'off');
  }

  return updateRsvp(updateMap);
};
