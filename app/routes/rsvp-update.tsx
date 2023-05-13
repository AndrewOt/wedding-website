import { ActionArgs, ActionFunction } from "@remix-run/node";
import { updateRsvpSinglular } from "~/dbUtilities";

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

  return updateRsvpSinglular(updateMap);
};
