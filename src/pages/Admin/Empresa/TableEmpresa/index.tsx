import { useEffect, useState } from "react";
// import { promises as fs } from "fs";
// import path from "path";

import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";

import dataTasks from "./data/tasks.json";

interface tasksProps {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<tasksProps[]>([]);
  useEffect(() => {
    (async () => {
      async function getTasks() {
        return z.array(taskSchema).parse(dataTasks);
      }
      const tasks = await getTasks();
      setTasks(tasks);
    })();
  }, []);

  return (
    <>
      <div className="hidden flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
