export interface RsvpSearchProps {
  onSearchInput: (text: string) => void;
}

export const RsvpSearch = ({ onSearchInput }: RsvpSearchProps) => {
  return (
    <div>
      <label htmlFor="RsvpSearchInput">Search for an invite</label>
      <input
        id="RsvpSearchInput"
        type="text"
        onChange={(e) => {
          onSearchInput(e.currentTarget.value);
        }}
      />
    </div>
  );
};
