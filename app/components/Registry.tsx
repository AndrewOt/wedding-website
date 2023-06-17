import { Link } from "@remix-run/react";

export const Registry = () => {
  return (
    <section className="section registry">
      <h1>Gift Registry</h1>
      <div
        style={{
          display: "flex",
          gap: "0.3rem",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Link
          to="https://www.myregistry.com/wedding-registry/andrew-ottaviano-and-lydia-helt-topeka-ks/3802896"
          target="_blank"
        >
          <img alt="Registry" style={{ width: "5rem" }} src="champagne.jpg" />
        </Link>
        <Link
          to="https://www.myregistry.com/wedding-registry/andrew-ottaviano-and-lydia-helt-topeka-ks/3802896"
          target="_blank"
          style={{
            textDecoration: "none",
            fontFamily: "snell roundhand, sans-serif",
          }}
        >
          <span>View the registry</span>
        </Link>
      </div>
    </section>
  );
};
