import { v4 } from "uuid";
import { useLoaderData } from "react-router";
import { useActionData, useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import type { LinksFunction, LoaderFunction } from "@remix-run/server-runtime";
import { ActionArgs, ActionFunction, V2_MetaFunction, json, redirect } from "@vercel/remix";

import { addRsvp, getRsvps } from "~/dbUtilities";
import { Totals } from "~/components/RSVP/Totals";
import { Invitee } from "~/components/RSVP/Invitee";
import NewInvitee from "~/components/RSVP/NewInvitee";
import DataDisplayStyles from "~/components/RSVP/DataDisplay.css";
import { RspvFilter, RsvpSearch } from "~/components/RSVP/RsvpSearch";
import { getAuth } from "@clerk/remix/ssr.server";
import { useClerk } from "@clerk/remix";

export type RSVP = {
  id: string;
  address: string;
  inviteeName: string;
  numberOfPeople: number;
  isAttendingCeremony: boolean;
  isAttendingReception: boolean;
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: DataDisplayStyles },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: "RSVPs" }];
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  
  const address = formData.get("address")?.toString();
  const name = formData.get("inviteeName")?.toString();
  const num = Number(formData.get("numberOfPeople")?.toString());
  const ceremony = Boolean(formData.get("isAttendingCeremony")?.toString());
  const reception = Boolean(formData.get("isAttendingReception")?.toString());

  if (name === undefined || address === undefined || typeof num !== 'number') {
    return json({ message: 'Failed to save. Either the name or the number of guests was not provided.' });
  }

  const rsvpEntityToSave: RSVP = {
    id: v4(),
    address: address,
    inviteeName: name,
    numberOfPeople: num,
    isAttendingCeremony: ceremony,
    isAttendingReception: reception,
  };

  try {
    return await addRsvp(rsvpEntityToSave);
  } catch {
    return json({ message: 'Saving the data to the database was not successful. Please try again.'});
  }
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect('/login');
  }

  const rsvps = await getRsvps();
  return rsvps;
};

export default function Rsvps() {
  const errors = useActionData();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const rsvpList = useLoaderData();
  const data = useRef(rsvpList as RSVP[]);
  const [displayData, setDisplayData] = useState(rsvpList as RSVP[]);

  const handleFilter = (text: string, attendingFilter: RspvFilter) => {
    setDisplayData(data.current.filter((item) => {
      const {
        isAttendingCeremony,
        isAttendingReception,
      } = attendingFilter;
      
      return item.inviteeName.toLowerCase().includes(text.toLowerCase())
        && isAttendingCeremony
        && isAttendingReception
    }));
  };

  useEffect(() => {
    setDisplayData(rsvpList as RSVP[]);
  }, [rsvpList]);

  const components = displayData.map((rsvp, index) => (
    <Invitee
      rsvp={rsvp}
      key={rsvp.inviteeName}
      isStripped={index % 2 === 0}
      isLast={index === displayData.length - 1}
    />
  ));

  return (
    <div>
      <button onClick={() => { signOut(() => { navigate("/"); }); }}>Log out</button>
      <RsvpSearch onFilterInput={handleFilter} />
      <NewInvitee errors={errors} />
      <Totals rsvps={data.current} />
      <div>{components}</div>
    </div>
  );
};
