import type { V2_MetaFunction } from "@remix-run/node";
import { Footer } from "~/components/Footer";
import { Hero } from "~/components/Hero";
import { OurStory } from "~/components/OurStory";
import { Photos } from "~/components/Photos";
import { Registry } from "~/components/Registry";
import { RSVP } from "~/components/RSVP";

import "../index.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Andrew 💕 Lydia" }];
};

export default function Index() {
  return (
    <div style={{ backgroundColor: "#f99a5a" }}>
      <Hero />
      <div className="content-body">
        <OurStory />
        <RSVP />
        <Registry />
        <Photos />
      </div>
      <Footer />
    </div>
  );
}
