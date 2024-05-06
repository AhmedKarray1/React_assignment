import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import TaskItem from "./task-item";

const TASK_LIST = [
  {
    id: 1,
    name: "Design Landing Page",
    value:
      "Design a visually appealing landing page with modern UI/UX principles.",
  },
  {
    id: 2,
    name: "Develop User Registration System",
    value:
      "Create a user registration system with email verification and password encryption.",
  },
  {
    id: 3,
    name: "Implement Payment Gateway Integration",
    value: "Integrate a payment gateway to enable secure online transactions.",
  },
  {
    id: 4,
    name: "Create Admin Dashboard",
    value:
      "Build an admin dashboard for managing user accounts, content, and settings.",
  },
  {
    id: 5,
    name: "Perform Security Audit",
    value:
      "Conduct a comprehensive security audit to identify and address potential vulnerabilities.",
  },
];

const TaskList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState(TASK_LIST);
  const [filteredTasks, setFilteredTasks] = useState(TASK_LIST);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    value: "",
  });

  const handleSearchChange = (e) => {
    const search = e.target?.value || "";
    setSearchQuery(search);
    setFilteredTasks(
      tasks.filter((task) =>
        task.name.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setFilteredTasks(filteredTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTask = (taskId, taskValues) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...taskValues };
      }
      return task;
    });

    setTasks(updatedTasks);

    const updatedFilteredTasks = filteredTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...taskValues };
      }
      return task;
    });

    setFilteredTasks(updatedFilteredTasks);
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleAddTask = () => {
    if (!newTask.name || !newTask.value) return;
    const id = tasks.length + 1;
    const updatedTasks = [...tasks, { id, ...newTask }];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setNewTask({ name: "", value: "" });
    setShowAddForm(false);
  };

  return (
    <div className="home-page">
      <TextField
        id="outlined-basic"
        label="Search Tasks"
        variant="outlined"
        size="small"
        style={{ margin: "auto auto", maxWidth: "170px" }}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
          />
        ))}
      </div>
      <span
        className={`material-icons ${showAddForm ? "close-icon" : "add-icon"}`}
        style={{ fontSize: "50px", margin: "auto auto" }}
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "close" : "add_circle"}
      </span>
      {showAddForm && (
        <div className="add-form">
          <div className="add-fields">
            <TextField
              label="Task Name"
              variant="outlined"
              size="small"
              name="name"
              value={newTask.name}
              onChange={handleNewTaskChange}
              error={!newTask.name}
            />
            <TextField
              label="Task Value"
              variant="outlined"
              size="small"
              name="value"
              value={newTask.value}
              onChange={handleNewTaskChange}
              error={!newTask.value}
            />
          </div>

          <Button
            style={{ maxWidth: "120px", margin: "auto" }}
            variant="contained"
            type="submit"
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
