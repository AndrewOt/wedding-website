export interface FilterToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default ({ label, checked, onChange }: FilterToggleProps) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="checkbox"
        checked={checked}
        style={{ width: "fit-content" }}
        onChange={() => onChange(!checked)}
      />
    </>
  );
};
