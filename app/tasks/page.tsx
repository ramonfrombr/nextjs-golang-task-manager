import { db } from "@/lib/db";
import { Priority, Status } from "@prisma/client";
import Link from "next/link";
import { Button } from "@mui/material";
import TaskTabs from "./_components/task-tabs";
import { oneWeekFromNow, yesterday } from "@/lib/dates";

const TasksPage = async () => {
  const upcomingTasks = await db.task.findMany({
    where: {
      dueDate: {
        gte: yesterday,
        lte: oneWeekFromNow,
      },
      OR: [{ status: Status.NEW }, { status: Status.IN_PROGRESS }],
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  const overdueTasks = await db.task.findMany({
    where: {
      dueDate: {
        lte: yesterday,
      },
      OR: [{ status: Status.NEW }, { status: Status.IN_PROGRESS }],
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  const newTasks = await db.task.findMany({
    where: {
      status: Status.NEW,
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  const inProgressTasks = await db.task.findMany({
    where: {
      status: Status.IN_PROGRESS,
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  const completedTasks = await db.task.findMany({
    where: {
      status: Status.COMPLETED,
    },
    orderBy: {
      dueDate: "desc",
    },
  });

  const lowPriorityTasks = await db.task.findMany({
    where: {
      priority: Priority.LOW,
    },
    orderBy: {
      dueDate: "desc",
    },
  });

  const mediumPriorityTasks = await db.task.findMany({
    where: {
      priority: Priority.MEDIUM,
    },
    orderBy: {
      dueDate: "desc",
    },
  });

  const highPriorityTasks = await db.task.findMany({
    where: {
      priority: Priority.HIGH,
    },
    orderBy: {
      dueDate: "desc",
    },
  });

  return (
    <div>
      <div className="mb-5">
        <Link href="/tasks/create">
          <Button variant="contained">Create</Button>
        </Link>
      </div>
      <TaskTabs
        upcomingTasks={upcomingTasks}
        overdueTasks={overdueTasks}
        tasks={{
          newTasks: newTasks,
          inProgressTasks: inProgressTasks,
          completedTasks: completedTasks,
          lowPriorityTasks: lowPriorityTasks,
          mediumPriorityTasks: mediumPriorityTasks,
          highPriorityTasks: highPriorityTasks,
        }}
      />
    </div>
  );
};

export default TasksPage;
