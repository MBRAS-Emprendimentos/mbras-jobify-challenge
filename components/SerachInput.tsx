import { Input } from "./ui/input";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <Input
      className="w-43 md:w-64"
      type="text"
      placeholder="Search by job title"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
