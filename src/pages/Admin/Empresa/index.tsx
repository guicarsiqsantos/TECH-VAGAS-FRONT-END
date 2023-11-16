// import style from "./Empresa.module.css";s

import TaskPage from "./TableEmpresa";
import { ScrollArea } from "@/components/ui/scroll-area";

const Empresa = () => {
  return (
    <ScrollArea className="h-full">
      <TaskPage />
    </ScrollArea>
  );
};

export default Empresa;
