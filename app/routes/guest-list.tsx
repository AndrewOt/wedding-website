import { LoaderFunction, json } from "@vercel/remix";
import { generateAddresses, generateFullNameList } from '../generateGuestList';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const addressesOnly = url.searchParams.get('addressesOnly');

  if (addressesOnly) {
    return new Response(await generateAddresses());
  } else {
    return new Response(await generateFullNameList());
  }
};
