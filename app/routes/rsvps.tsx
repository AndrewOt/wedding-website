import type { V2_MetaFunction } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { Invitee } from "~/components/RSVP/Invitee";
import { RsvpSearch } from "~/components/RSVP/RsvpSearch";
import { Totals } from "~/components/RSVP/Totals";

export type RSVP = {
  inviteeName: string;
  isAttending: boolean;
  numberOfPeople: number;
  foodAllergies?: string;
};

export const loader: LoaderFunction = () => [
  {
    inviteeName: "test 1",
    isAttending: true,
    numberOfPeople: 1,
  },
  {
    inviteeName: "test 2",
    isAttending: false,
    numberOfPeople: 1,
  },
  {
    inviteeName: "test 3",
    isAttending: false,
    numberOfPeople: 1,
  },
  {
    inviteeName: "test 4",
    isAttending: true,
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
      predicate = (rsvp) => rsvp.inviteeName.includes(text) && rsvp.isAttending;
    } else {
      predicate = (rsvp) => rsvp.inviteeName.includes(text);
    }

    // if (isOnlyAttending && text === "") {
    //   predicate = (rsvp) => rsvp.isAttending === isOnlyAttending;
    // } else if (!isOnlyAttending && text !== "") {
    //   predicate = (rsvp) => rsvp.inviteeName.includes(text);
    // } else if (isOnlyAttending) {
    //   predicate = (rsvp) =>
    //     rsvp.isAttending === isOnlyAttending && rsvp.inviteeName.includes(text);
    // } else {
    //   predicate = () => true;
    // }

    setDisplayData(data.current.filter(predicate));
    // if (text === "") {
    //   setDisplayData(data.current);
    //   return;
    // }

    // const filteredData = data.current.filter(
    //   (rsvp) => rsvp.inviteeName.includes(text) && isOnlyAttending
    // );

    // setDisplayData(filteredData);
  };

  const components = useMemo(
    () =>
      displayData.map((rsvp) => <Invitee key={rsvp.inviteeName} rsvp={rsvp} />),
    [displayData]
  );

  return (
    <div>
      <RsvpSearch onFilterInput={handleFilter} />
      <h2>Totals</h2>
      <Totals rsvps={data.current} />
      <div>{components}</div>
    </div>
  );
}
