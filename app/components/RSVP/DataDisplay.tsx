export interface DataDisplayProps {
  body: string;
  header: string;
}

export const DataDisplay = ({ header, body }: DataDisplayProps) => (
  <>
    <h4 className="rsvp-header">{header}</h4>
    <div className="rsvp-body">{body}</div>
  </>
);
