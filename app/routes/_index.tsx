import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { Footer } from "~/components/Footer";
import { Hero } from "~/components/Hero";
import { OurStory } from "~/components/OurStory";
import { Photos } from "~/components/Photos";
import { Registry } from "~/components/Registry";
import { FindRsvp } from "~/components/RSVP/FindRsvp";

import indexStyles from "../index.css";
import heroStyles from "~/components/Hero.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStyles },
  { rel: "stylesheet", href: heroStyles },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: "Andrew 💕 Lydia" }];
};

export default function Index() {
  return (
    <div style={{ backgroundColor: "#f99a5a" }}>
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