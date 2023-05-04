import { useState } from "react";

export interface RsvpSearchProps {
  onFilterInput: (text: string, isOnlyAttending: boolean) => void;
}

export const RsvpSearch = ({ onFilterInput }: RsvpSearchProps) => {
  const [text, setText] = useState("");
  const [isOnlyAttending, setIsOnlyAttending] = useState(false);

  return (
    <div>
      <label htmlFor="RsvpSearchInput">Search for an invite</label>
      <input
        id="RsvpSearchInput"
        type="text"
        onChange={(e) => {
          const inputtedText = e.currentTarget.value;
          setText(inputtedText);
          onFilterInput(inputtedText, isOnlyAttending);
        }}
      />

      <input
        type="button"
        onClick={() => {
          const newAttendingValue = !isOnlyAttending;
          setIsOnlyAttending(newAttendingValue);
          onFilterInput(text, newAttendingValue);
        }}
        value={isOnlyAttending ? "Show All" : "Show Only Attending"}
      ></input>
    </div>
  );
};
