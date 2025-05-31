import { Input } from "./ui/input";

type CategoryFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <Input
      className="w-43 md:w-64"
      type="text"
      placeholder="Filter by category"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
