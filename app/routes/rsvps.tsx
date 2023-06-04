import { v4 } from "uuid";
import { useClerk } from "@clerk/remix";
import { useLoaderData } from "react-router";
import { getAuth } from "@clerk/remix/ssr.server";
import { useEffect, useRef, useState } from "react";
import { useActionData, useNavigate } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json, redirect } from "@vercel/remix";
import type {
  ActionArgs,
  ActionFunction,
  V2_MetaFunction,
} from "@vercel/remix";

import { addRsvp, getRsvps } from "~/dbUtilities";
import { Totals } from "~/components/RSVP/Totals";
import { Invitee } from "~/components/RSVP/Invitee";
import NewInvitee from "~/components/RSVP/NewInvitee";
import { RsvpSearch } from "~/components/RSVP/RsvpSearch";
import type { RspvFilter } from "~/components/RSVP/RsvpSearch";

import DataDisplayStyles from "~/components/RSVP/DataDisplay.css";

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

  if (name === undefined || typeof num !== "number") {
    return json({
      message:
        "Failed to save. Either the name or the number of guests was not provided.",
    });
  }

  const rsvpEntityToSave: RSVP = {
    id: v4(),
    inviteeName: name,
    numberOfPeople: num,
    address: address || "",
    isAttendingCeremony: ceremony,
    isAttendingReception: reception,
  };

  try {
    return await addRsvp(rsvpEntityToSave);
  } catch {
    return json({
      message:
        "Saving the data to the database was not successful. Please try again.",
    });
  }
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/login");
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

  const handleFilter = (attendingFilter: RspvFilter) => {
    const { text, isAttendingCeremony, isAttendingReception } = attendingFilter;

    if (text) {
      setDisplayData(
        data.current.filter((item) =>
          item.inviteeName.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setDisplayData(
        data.current.filter((item) => {
          if (isAttendingCeremony) {
            return item.isAttendingCeremony;
          }

          if (isAttendingReception) {
            return item.isAttendingReception;
          }

          return false;
        })
      );
    }
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <RsvpSearch onFilterInput={handleFilter} />
        <a
          download
          href="/addresses"
          className="button rsvp-address-button"
          style={{ alignSelf: "start", margin: "10px" }}
        >
          Generate Address List
        </a>

        <button
          className="button"
          style={{ alignSelf: "start", margin: "10px" }}
          onClick={() => {
            signOut(() => {
              navigate("/");
            });
          }}
        >
          Log out
        </button>
      </div>
      <NewInvitee errors={errors} />
      <Totals rsvps={data.current} />
      <div className="rsvp-container">{components}</div>
    </div>
  );
}
