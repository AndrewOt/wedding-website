import Tulip1 from "~/components/tulip1";
import Tulip2 from "~/components/tulip2";

export const OurStory = () => (
  <section className="section story-section">
    <h1>Our Story</h1>
    <div className="story-container">
      <div className="tulip-container tulip1">
        <Tulip1 />
      </div>

      <div>
        <p>
          Lydia and Andrew met at church in the singles' ministry. They met
          early 2022, but didn't get to know each other until the summer when
          they both attended a social gathering in the park. During that
          conversation, they learned that both of their parents attended college
          together. At the time, they didn't think they would know each other.
          Turns out, they were friends! Andrew's parents happened to be heading
          through KC soon after this realization, and they suggested getting ice
          cream with Lydia's parents as a little college reunion. Andrew and
          Lydia tagged along and it was a ton of fun! They like to refer to this
          as the "not-date-with-our-parents". After that they texted back and
          forth playing telephone for their parents before finally getting them
          connected with each other. They continued to text for the next week
          until one evening Andrew asked if Lydia might like a walking buddy
          (she really like walks). She said yes and now they are getting
          married!
        </p>

        <p>
          April 1st is Lydia's birthday. They made plans for Lydia's parents to
          come over lunch time to celebrate. Lydia also mentioned she wanted to
          watch the sunrise in the park where they got to know each other and
          had their first date. So, on the 1st, a Saturday, they got to the park
          at 7am in 26 degree weather. Little did she know, Andrew had a ring in
          his pocket! He had intentions to get on one knee as they were packing
          up, but it was very cold, so he went for it... and she said yes!! It
          was a very blessed and wonderful day! The Lord has been very kind to
          us in our relationship and we can't wait to celebrate with you!
        </p>
      </div>

      <div className="tulip-container tulip2">
        <Tulip2 />
      </div>
    </div>
  </section>
);
