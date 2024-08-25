import { Task } from "@prisma/client";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PriorityBadge from "@/components/priority-nadge";
import Link from "next/link";
import { Button } from "@mui/material";
import { useState } from "react";
import { Search, X } from "lucide-react";

const TaskSummary = ({
  tasks,
  expanded,
  heading,
}: {
  tasks: Task[];
  expanded?: boolean;
  heading: string;
}) => {
  const [search, setSearch] = useState("");

  const filteredTasks =
    search == ""
      ? tasks
      : tasks.filter((task) =>
          task.name.toLowerCase().includes(search.toLowerCase())
        );

  console.log("TaskSummary rendered");
  return (
    <div className="border overflow-hidden shadow">
      <Accordion
        className="rounded-none shadow-none"
        defaultExpanded={expanded}
      >
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon fontSize="small" />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="hover:bg-gray-100"
        >
          <Typography className=" text-gray-700 flex items-center text-sm">
            <span className="bg-slate-700 text-white rounded mr-3 h-4 w-4 flex items-center justify-center font-semibold">
              {tasks.length}
            </span>
            <span>{heading}</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="p-1">
          <div className="flex items-center py-1 px-3 bg-gray-50 mx-1 mb-3">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              value={search}
              className="flex-1 bg-gray-50 px-2 ml-2 p-1 outline-none text-sm"
              placeholder="Search a task"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={() => {
                setSearch("");
              }}
              className={`${!search && "hidden"}`}
              color="error"
            >
              <X size={15} />
            </Button>
          </div>
          {filteredTasks.length == 0 ? (
            <h2 className="text-center text-sm text-gray-500 p-3">
              No tasks found.
            </h2>
          ) : (
            <div className="bg-white p-2 flex transition duration-200 text-sm">
              <span className="min-w-[73px] text-gray-500">Due Date</span>
              <span className="min-w-16 text-gray-500">Priority</span>
              <span className="text-gray-500">Task</span>
            </div>
          )}

          {filteredTasks.map((task) => (
            <Link key={task.id} href={`/tasks/${task.id}`}>
              <div className="bg-white p-2 border-t flex hover:bg-gray-100 transition duration-200 text-sm">
                <span className="min-w-[73px] font-mono">
                  {task.dueDate.toLocaleDateString("pt-BR").substring(0, 6) +
                    task.dueDate.toLocaleDateString("pt-BR").substring(8, 10)}
                </span>
                <div className="min-w-16">
                  <PriorityBadge priority={task.priority} />
                </div>
                <span>{task.name}</span>
              </div>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TaskSummary;
