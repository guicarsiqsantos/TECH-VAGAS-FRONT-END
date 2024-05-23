import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectD() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Mais Recentes</SelectItem>
          <SelectItem value="banana">Mais Relevante</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
