import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";

interface SearchBarProps {
  search: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ search, handleSearchChange }: SearchBarProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="search">
        Buscar
      </Label>
      <Input
        placeholder="Search"
        value={search}
        name="search"
        onChange={handleSearchChange}
        className="max-w-sm"
      />
    </div>
  )
}