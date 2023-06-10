export interface FunctionButtonProps {
  href: string;
  text: string;
}

export const FunctionButton = ({ href, text }: FunctionButtonProps) => (
  <a
    download
    href={href}
    className="button rsvp-address-button"
    style={{ alignSelf: "start", margin: "10px" }}
  >
    {text}
  </a>
);
