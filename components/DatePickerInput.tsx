import { DatePicker } from "./ui/datePicker";

type DateFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
    />
  );
}

