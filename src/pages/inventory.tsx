import { useState } from "react";
import { columns } from "../components/employee/columns";
import { DataTable } from "../components/employee/data-table";
import tasksData from "../components/data/tasks.json";

export default function TaskPage() {
  const [tasks, setTasks] = useState<any[]>(tasksData as any[]);

  function handleAddTask(task: any) {
    setTasks((prev) => [task, ...prev]);
  }

  return (
    <>
      {/* Mobile image preview */}
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>

      {/* Desktop view */}
      <div className="flex flex-1 flex-col gap-4 sm:gap-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month.
            </p>
          </div>

          <div className="flex items-center gap-2"></div>
        </div>

        <DataTable data={tasks} columns={columns} onAddTask={handleAddTask} />
      </div>
    </>
  );
}
