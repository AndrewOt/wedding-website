import type { V2_MetaFunction } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/server-runtime";
import { useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { Invitee } from "~/components/RSVP/Invitee";
import { RsvpSearch } from "~/components/RSVP/RsvpSearch";
import { Totals } from "~/components/RSVP/Totals";

import DataDisplayStyles from "~/components/RSVP/DataDisplay.css";

export type RSVP = {
  inviteeName: string;
  numberOfPeople: number;
  isAttendingCeremony: boolean;
  isAttendingReception: boolean;
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: DataDisplayStyles },
];

export const loader: LoaderFunction = () => [
  {
    inviteeName: "Josh and Victoria Rimes",
    isAttendingCeremony: true,
    isAttendingReception: true,
    numberOfPeople: 2,
  },
  {
    inviteeName: "Dave and Leah Barnett",
    isAttendingCeremony: false,
    isAttendingReception: false,
    numberOfPeople: 4,
    foodAllergies: "Gluten",
  },
  {
    inviteeName: "Jeff and Jill Brown",
    isAttendingCeremony: false,
    isAttendingReception: false,
    numberOfPeople: 2,
  },
  {
    inviteeName: "Tom and Becky Ottaviano",
    isAttendingCeremony: true,
    isAttendingReception: true,
    numberOfPeople: 2,
  },
  {
    inviteeName: "Jenny Brown",
    isAttendingCeremony: true,
    isAttendingReception: false,
    numberOfPeople: 1,
  },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: "RSVPs" }];
};

export default function Rsvps() {
  const result = useLoaderData();
  const data = useRef(result as RSVP[]);
  const [displayData, setDisplayData] = useState(result as RSVP[]);

  const handleFilter = (text: string, shouldShowOnlyAttending: boolean) => {
    let predicate: (item: RSVP) => boolean;

    if (shouldShowOnlyAttending) {
      predicate = (rsvp) =>
        rsvp.inviteeName.toLowerCase().includes(text.toLowerCase()) &&
        rsvp.isAttendingCeremony;
    } else {
      predicate = (rsvp) =>
        rsvp.inviteeName.toLowerCase().includes(text.toLowerCase());
    }

    setDisplayData(data.current.filter(predicate));
  };

  const components = useMemo(
    () =>
      displayData.map((rsvp, index) => (
        <Invitee
          isStripped={index % 2 === 0}
          isLast={index === displayData.length - 1}
          key={rsvp.inviteeName}
          rsvp={rsvp}
        />
      )),
    [displayData]
  );

  return (
    <div>
      <RsvpSearch onFilterInput={handleFilter} />
      <Totals rsvps={data.current} />
      <div>{components}</div>
    </div>
  );
}
