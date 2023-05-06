import { ActionArgs, ActionFunction, V2_MetaFunction, json } from "@vercel/remix";
import type { LinksFunction, LoaderFunction } from "@remix-run/server-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { Invitee } from "~/components/RSVP/Invitee";
import { RspvFilter, RsvpSearch } from "~/components/RSVP/RsvpSearch";
import { Totals } from "~/components/RSVP/Totals";

import DataDisplayStyles from "~/components/RSVP/DataDisplay.css";
import { addRsvp, getRsvps } from "~/utilities";
import NewInvitee from "~/components/RSVP/NewInvitee";
import { useActionData } from "@remix-run/react";

export type RSVP = {
  inviteeName: string;
  numberOfPeople: number;
  isAttendingCeremony: boolean;
  isAttendingRehersal: boolean;
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
  
  const name = formData.get("inviteeName")?.toString();
  const num = Number(formData.get("numberOfPeople")?.toString());
  const ceremony = Boolean(formData.get("isAttendintCeremony")?.toString());
  const rehersal = Boolean(formData.get("isAttendingReception")?.toString());
  const reception = Boolean(formData.get("isAttendingReception")?.toString());

  if (name === undefined || typeof num !== 'number') {
    return json({ message: 'Failed to save. Either the name or the number of guests was not provided.' });
  }

  const rsvpEntityToSave: RSVP = {
    inviteeName: name,
    numberOfPeople: num,
    isAttendingRehersal: rehersal,
    isAttendingCeremony: ceremony,
    isAttendingReception: reception,
  };

  try {
    return await addRsvp(rsvpEntityToSave);
  } catch {
    return json({ message: 'Saving the data to the database was not successful. Please try again.'});
  }
};

export const loader: LoaderFunction = async () => {
  const rsvps = await getRsvps();
  return rsvps;
};

export default function Rsvps() {
  const rsvpList = useLoaderData();
  const errors = useActionData();
  const data = useRef(rsvpList as RSVP[]);
  const [displayData, setDisplayData] = useState(rsvpList as RSVP[]);

  const handleFilter = (text: string, attendingFilter: RspvFilter) => {
    setDisplayData(data.current.filter((item) => {
      const {
        isAttendingCeremony,
        isAttendingReception,
        isAttendingRehersal
      } = attendingFilter;
      
      return item.inviteeName.toLowerCase().includes(text.toLowerCase())
        && isAttendingCeremony
        && isAttendingReception
        && isAttendingRehersal;
    }));
  };

  useEffect(() => {
    setDisplayData(rsvpList as RSVP[]);
  }, [rsvpList]);

  const components = displayData.map((rsvp, index) => (
    <Invitee
      isStripped={index % 2 === 0}
      isLast={index === displayData.length - 1}
      key={rsvp.inviteeName}
      rsvp={rsvp}
    />
  ));

  return (
    <div>
      <RsvpSearch onFilterInput={handleFilter} />
      <NewInvitee errors={errors} />
      <Totals rsvps={data.current} />
      <div>{components}</div>
    </div>
  );
}
