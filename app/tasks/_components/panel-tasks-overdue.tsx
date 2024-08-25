import React from "react";
import CustomTabPanel from "./custom-tab-panel";
import { Task } from "@prisma/client";
import TaskSummary from "./task-summary";

const PanelTasksOverdue = ({
  value,
  index,
  tasks,
}: {
  value: number;
  index: number;
  tasks: Task[];
}) => {
  return (
    <CustomTabPanel value={value} index={index}>
      {tasks.length == 0 && (
        <h2 className="text-center text-lg text-gray-500 p-3">
          There are no overdue tasks.
        </h2>
      )}
      {tasks.length != 0 && (
        <TaskSummary expanded={true} tasks={tasks} heading="Overdue Tasks" />
      )}
    </CustomTabPanel>
  );
};

export default PanelTasksOverdue;
