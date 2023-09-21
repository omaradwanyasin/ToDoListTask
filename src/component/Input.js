import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";

function Input() {
  const [listtodo, changelist] = useState([]);
  const [open, changestate] = useState(false);
  const [input, updateinput] = useState("");
  const [selectedid, setselectedid] = useState(null);
  const [updatedTaskeName, setTaskName] = useState("");

  const handleadd = () => {
    const newlist = [...listtodo];
    newlist.push({ id: uuidv4(), name: input });
    changelist(newlist);
    localStorage.setItem("Tasks", JSON.stringify(newlist)); //note that you pass the newlist not the origin so the cahnges happens directly
  };

  const handleClose = () => {
    changestate(false);
  };
  const handleopendialog = (id) => {
    setselectedid(id);
    const tasktoupdate = listtodo.find((task) => task.id === id);
    if (tasktoupdate) {
      setTaskName(tasktoupdate.name); //STORE THE CURRENT TASK NAME SO THE USER CANT CHANGE IT TO EMPTY TASK
    }
    changestate(true);
  };

  const handleupdateclick = () => {
    const updatedTasks = listtodo.map((task) => {
      if (task.id === selectedid) {
        return { ...listtodo, name: updatedTaskeName };
      }
      return task;
    });
    localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
    changelist(updatedTasks);

    handleClose();
  };
  const handleDelete = (id) => {
    const newlistdelet = listtodo.filter((task) => {
      if (task.id === id) {
        return false;
      }
      return true;
    });
    localStorage.setItem("Tasks", JSON.stringify(newlistdelet));
    changelist(newlistdelet);
  };
  const data = listtodo.map((task) => {
    return (
      <div className="todo">
        <div className="todo-text">
          <input className="checkbox" type="checkbox" id="isCompleted" />
        </div>
        <div>{task.name}</div>

        <div className="todo-actions">
          <button
            onClick={() => {
              handleopendialog(task.id);
            }}
            className="submit-edits"
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleDelete(task.id);
            }}
            className="submit-edits"
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
  useEffect(() => {
    const accessData = JSON.parse(localStorage.getItem("Tasks"));
    changelist(accessData);
  }, []);

  return (
    <div
      className="todo-container"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>
      <form>
        <input
          className="add-task"
          type="text"
          placeholder="Add new task ..."
          onChange={(event) => {
            updateinput(event.target.value);
          }}
        />
        <button
          type="submit"
          className="add-button"
          onClick={() => {
            handleadd();
          }}
        >
          Add
        </button>
      </form>
      {data}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the Task, please enter the new Task below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="deviceName"
            label="New Device Name"
            type="text"
            fullWidth
            onChange={(event) => setTaskName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleupdateclick();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Input;
