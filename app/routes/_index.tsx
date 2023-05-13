import type { ActionFunction, LinksFunction, V2_MetaFunction } from "@vercel/remix";
import { Footer } from "~/components/Footer";
import { Hero } from "~/components/Hero";
import { OurStory } from "~/components/OurStory";
import { Photos } from "~/components/Photos";
import { Registry } from "~/components/Registry";
import { FindRsvp } from "~/components/RSVP/FindRsvp";

import indexStyles from "../index.css";
import heroStyles from "~/components/Hero.css";
import { findInvitation, updateEntireRsvp } from "~/dbUtilities";
import { QueryResult, QueryResultRow } from "@vercel/postgres";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStyles },
  { rel: "stylesheet", href: heroStyles },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: "Andrew 💕 Lydia" }];
};

export type IRsvpTest = {
  error?: string;
  isInvited?: boolean;
  isAttending?: boolean;
  successfulUpdate?: boolean;
  action: 'Find' | 'Save choice';
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  switch(_action) {
    case 'Find':
      const nameToCheck = values['inviteeName'];
      const isInvited = await findInvitation(nameToCheck.toString());
      if (typeof isInvited === 'boolean') {
        return { action: _action, isInvited };
      } else {
        return { action: _action, error: 'There was an error confirming the rsvp.' };
      }
    case 'Save choice':
      const confirmedName = values['inviteeName'].toString();
      const ceremonyConfirm = values['ceremony'].toString();
      const receptionConfirm = values['reception'].toString();

      const updateMap = new Map<string, string>([
        ['inviteeName', confirmedName],
        ['isAttendingCeremony', ceremonyConfirm],
        ['isAttendingReception', receptionConfirm],
      ]);

      const result = await updateEntireRsvp(updateMap);
      if ((result as QueryResult<QueryResultRow>).rowCount) {
        return {
          action: _action,
          isAttending: ceremonyConfirm === 'ceremonyYes' || receptionConfirm === 'receptionYes',
          successfulUpdate: (result as QueryResult<QueryResultRow>).rowCount === 1
        };
      } else {
        return { action: _action, error: 'There was an error updating the rsvp.' };
      }
  }

  return null;
};

export default function Index() {
  return (
    <div>
      <Hero />
      <div className="content-body">
        <OurStory />
        <FindRsvp />
        <Registry />
        <Photos />
      </div>
      <Footer />
    </div>
  );
}
