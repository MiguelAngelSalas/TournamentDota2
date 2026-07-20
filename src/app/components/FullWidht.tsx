import {Input} from "@heroui/react";
interface fullWidthProps{
    texto: string;
    change: (e:React.ChangeEvent<HTMLInputElement>)=>void;
    value: string | number| undefined;
}
export function FullWidth({ texto, change, value}:fullWidthProps) {
  return (
    <div className="w-100 space-y-3">
      <Input fullWidth className="border rounded m-2 text-center" value={value} onChange={change} placeholder={texto} />
    </div>
  );
}