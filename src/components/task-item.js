import React, { useState } from "react";
import { Card, TextField, Button } from "@mui/material";

const TaskItem = ({ task, onDeleteTask, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    name: task.name,
    value: task.value,
  });

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  const handleUpdate = () => {
    onUpdateTask(task.id, updatedTask);
    setIsEditing(false);
  };

  return (
    <Card className="card" variant="outlined">
      {isEditing ? (
        <div className="edit-form">
          <TextField
            label="Title"
            size="small"
            variant="outlined"
            value={updatedTask.name}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, name: e.target.value })
            }
          />
          <TextField
            label="Value"
            variant="outlined"
            size="small"
            value={updatedTask.value}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, value: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      ) : (
        <div className="card-content">
          <div className="title">{task.name}</div>
          <div className="value">{task.value}</div>
          <div className="buttons">
            <span
              className="material-icons edit-icon"
              onClick={() => setIsEditing(true)}
            >
              edit
            </span>
            <span className="material-icons delete-icon" onClick={handleDelete}>
              delete
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TaskItem;
