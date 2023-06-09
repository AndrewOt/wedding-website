import type { QueryResult, QueryResultRow } from "@vercel/postgres";
import { findInvitation, updateEntireRsvp } from "~/dbUtilities";
import type {
  ActionFunction,
  LinksFunction,
  V2_MetaFunction,
} from "@vercel/remix";

import { Hero } from "~/components/Hero";
import { Footer } from "~/components/Footer";
import { Photos } from "~/components/Photos";
import { Registry } from "~/components/Registry";
import { OurStory } from "~/components/OurStory";
import { FindRsvp } from "~/components/RSVP/FindRsvp";

import indexStyles from "../index.css";
import heroStyles from "~/components/Hero.css";
import footerStyles from "~/components/Footer.css";
import pictureStyles from "~/components/Photo.css";
import storyStyles from "~/components/OurStory.css";
import findRsvpStyles from "~/components/RSVP/FindRsvp.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: heroStyles },
  { rel: "stylesheet", href: indexStyles },
  { rel: "stylesheet", href: storyStyles },
  { rel: "stylesheet", href: footerStyles },
  { rel: "stylesheet", href: pictureStyles },
  { rel: "stylesheet", href: findRsvpStyles },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: "Andrew 💕 Lydia" }];
};

export type IRsvpTest = {
  error?: string;
  rsvpId?: string;
  isInvited?: boolean;
  isAttending?: boolean;
  numberOfPeople?: number;
  successfulUpdate?: boolean;
  action: "Find" | "Save choice";
};

type RSVPModel = {
  id: string;
  address: string;
  inviteename: string;
  numberofpeople: number;
  isattendingceremony: boolean;
  isattendingreception: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case "Find":
      const nameToCheck = values["inviteeName"];
      const isInvitedData = await findInvitation(nameToCheck.toString());
      if (isInvitedData) {
        const data = isInvitedData as RSVPModel;
        return {
          action: _action,
          isInvited: true,
          rsvpId: data.id,
          numberOfPeople: data.numberofpeople,
        };
      } else {
        return {
          action: _action,
          error: "There was an error confirming the rsvp.",
        };
      }
    case "Save choice":
      const confirmedName = values["inviteeName"].toString();
      const ceremonyConfirm = values["ceremony"].toString();
      const receptionConfirm = values["reception"].toString();
      const numberOfPeople = values["numberOfPeople"].toString();
      const rsvpId = values["rsvpId"].toString();

      const updateMap = new Map<string, string>([
        ["inviteeName", confirmedName],
        ["isAttendingCeremony", ceremonyConfirm],
        ["isAttendingReception", receptionConfirm],
        ["numberOfPeople", numberOfPeople],
        ["rsvpId", rsvpId],
      ]);

      const result = await updateEntireRsvp(updateMap);
      if ((result as QueryResult<QueryResultRow>).rowCount) {
        return {
          action: _action,
          isAttending:
            ceremonyConfirm === "ceremonyYes" ||
            receptionConfirm === "receptionYes",
          successfulUpdate:
            (result as QueryResult<QueryResultRow>).rowCount === 1,
          rsvpId,
        };
      } else {
        return {
          action: _action,
          error: "There was an error updating the rsvp.",
        };
      }
  }

  return null;
};

export default function Index() {
  return (
    <div>
      <Hero />
      <div>
        <OurStory />
        <FindRsvp />
        <Photos />
        <Registry />
      </div>
      <Footer />
    </div>
  );
}
