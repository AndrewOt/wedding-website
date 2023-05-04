import { useState } from "react";

export interface RsvpSearchProps {
  onFilterInput: (text: string, isOnlyAttending: boolean) => void;
}

export const RsvpSearch = ({ onFilterInput }: RsvpSearchProps) => {
  const [text, setText] = useState("");
  const [isOnlyAttending, setIsOnlyAttending] = useState(false);

  return (
    <div
      style={{
        marginTop: "5px",
        marginLeft: "5px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "40vw" }}>
        <label htmlFor="RsvpSearchInput">Search for an invite</label>
        <input
          type="text"
          id="RsvpSearchInput"
          placeholder="Type to filter by name"
          onChange={(e) => {
            const inputtedText = e.currentTarget.value;
            setText(inputtedText);
            onFilterInput(inputtedText, isOnlyAttending);
          }}
        />

        <input
          type="button"
          style={{ width: "20vw" }}
          onClick={() => {
            const newAttendingValue = !isOnlyAttending;
            setIsOnlyAttending(newAttendingValue);
            onFilterInput(text, newAttendingValue);
          }}
          value={isOnlyAttending ? "Show All" : "Show Only Attending"}
        />
      </div>
    </div>
  );
};
