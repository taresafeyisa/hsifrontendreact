import { useState } from "react";
import { z } from "zod";

import { columns } from "@/components/datatable/columns";
import { DataTable } from "@/components/datatable/data-table";
import { UserNav } from "@/components/datatable/user-nav";
import { taskSchema } from "@/components/data/schema";
import tasksData from "@/components/data/tasks.json";

type Task = z.infer<typeof taskSchema>;

export default function TaskPage() {
  const [tasks] = useState<Task[]>(() => {
    try {
      return z.array(taskSchema).parse(tasksData as unknown);
    } catch (err) {
      console.error("Failed to parse tasks.json:", err);
      return [];
    }
  });

  if (!tasks || tasks.length === 0) return <p>No tasks available.</p>;

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground light"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground dark"
          className="hidden dark:block"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 sm:gap-6 mt-10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <UserNav />
          </div>
        </div>

        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
