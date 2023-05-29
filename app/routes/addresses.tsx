import { LoaderFunction, json } from "@vercel/remix";
import { generateAddresses } from '../generateAddressList';

export const loader: LoaderFunction = async () => {
  const addressList = await generateAddresses();
  return new Response(addressList);
};
