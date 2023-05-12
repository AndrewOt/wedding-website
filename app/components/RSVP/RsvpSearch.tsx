import { useState } from "react";
import FilterToggle from "./FilterToggle";

export interface RsvpSearchProps {
  onFilterInput: (text: string, attendingFilter: RspvFilter) => void;
}

export type RspvFilter = {
  isAttendingCeremony: boolean;
  isAttendingReception: boolean;
}

export const RsvpSearch = ({ onFilterInput }: RsvpSearchProps) => {
  const [text, setText] = useState("");
  const [isAttendingCeremony, setIsAttendingCeremony] = useState(true);
  const [isAttendingReception, setIsAttendingReception] = useState(true);

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
            onFilterInput(inputtedText, { isAttendingCeremony, isAttendingReception });
          }}
        />

        <FilterToggle
          label="Attending Ceremony"
            checked={isAttendingCeremony}
            onChange={(value) => {
              setIsAttendingCeremony(value);
              onFilterInput(text, { isAttendingCeremony: value, isAttendingReception });
            }}
        />
        
        <FilterToggle
          label="Attending Reception"
            checked={isAttendingReception}
            onChange={(value) => {
              setIsAttendingReception(value);
              onFilterInput(text, { isAttendingCeremony, isAttendingReception: value });
            }}
        />
      </div>
    </div>
  );
};
