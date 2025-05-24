
'use client';

import { useQuery,useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api"; 


const TasksPage = () => {
  const tasks = useQuery(api.tasks.getTasks);
  const deleteTask = useMutation(api.tasks.deleteTask);


  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-5xl">Tasks</h1>
      <ul>
        {tasks?.map((task) => (
          <div key={task._id} className="flex gap-2">
            <span className="text-red-500">{task.text}</span>
            <button onClick={async() =>await deleteTask({id:task._id})}>
                Delete task
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
