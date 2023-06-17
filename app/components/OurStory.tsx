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
        We met at church in the singles' ministry in early 2022 but didn't get to know each other until talking
        at a social gathering at a park. During that conversation, we learned that our parents attended the same
        college at about the same time. We were surprised to learn later that they were even friends in college
        but had lost touch. My parents happened to be heading through KC soon after this realization, and they
        suggested getting ice cream with Lydia's parents as a little college reunion. We tagged along and it was
        a ton of fun! We like to refer to this as the (triple) "not-date-with-our-parents". After that, we texted
        back and forth for the next week until one evening I asked if Lydia might like a walking buddy (she really
        like walks). She said yes and the rest is history!
        </p>

        <p>
        On April 1st, Lydia's birthday, we made plans for Lydia's parents to come over for lunch to celebrate,
        but little did she know that we would have more to celebrate than her birthday! Lydia had mentioned that
        she wanted to watch the sunrise in the park where we got to know each other and had our first date.
        When we got to the park at 7 am it was 26 degrees outside, so we bundled up in blankets on the side of
        a hill. Lydia did not suspect that I had a ring in my coat pocket! It was a very blessed and wonderful
        day! The Lord has been very kind to us in our relationship and we can't wait to celebrate with you!
        </p>
      </div>

      <div className="tulip-container tulip2">
        <Tulip2 />
      </div>
    </div>
  </section>
);
