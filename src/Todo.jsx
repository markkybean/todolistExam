import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { db } from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

export default function Todo() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(tasksList);
    };

    fetchTasks();
  }, []);

  const handleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!todoTitle.trim()) return;

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: todoTitle,
        createdAt: Timestamp.now(),
      });
      setTodos([...todos, { id: docRef.id, title: todoTitle }]);
      setTodoTitle("");
      setImage(null);
      console.log("Task added:", { id: docRef.id, title: todoTitle });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setTodoTitle(task.title);
  };

  const handleSave = async () => {
    event.preventDefault();
    if (!todoTitle.trim()) return;

    try {
      const taskRef = doc(db, "tasks", editId);
      await updateDoc(taskRef, { title: todoTitle });

      // Update the local state with the edited task
      setTodos(
        todos.map((task) =>
          task.id === editId ? { ...task, title: todoTitle } : task
        )
      );

      setTodoTitle("");
      setEditId(null);
      console.log("Task updated:", { id: editId, title: todoTitle });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTodos(todos.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <Box sx={{ position: "relative", padding: 3 }}>
      {/* Logout Button */}
      <IconButton
        onClick={handleLogout}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "#1a2a5c",
          color: "white",
        }}
      >
        <LogoutIcon />
      </IconButton>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          maxWidth: 500,
          margin: "auto",
          mt: 5,
          backgroundColor: "#f9f3f1",
          borderRadius: "16px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#1a2a5c", textAlign: "left" }}
        >
          Todo List
        </Typography>
        <hr style={{ borderColor: "#c8a78a", margin: "8px 0" }} />

        {/* Input Field  */}
        <Box
          component="form"
          onSubmit={editId ? handleSave : handleSubmit}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "50px",
            p: 1,
          }}
        >
          <label htmlFor="upload-image">
            <IconButton component="span">
              <ImageIcon sx={{ color: "#a78d7b" }} />
            </IconButton>
          </label>

          <TextField
            variant="standard"
            placeholder="Enter new task here"
            value={todoTitle}
            onChange={handleChange}
            fullWidth
            InputProps={{ disableUnderline: true }}
            sx={{ pl: 1, flex: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1a2a5c",
              minWidth: 20,
              height: 40,
              borderRadius: "50%",
              ml: 1,
            }}
            disabled={!todoTitle.trim()} // Disable save button when title is empty
          >
            <AddIcon />
          </Button>
        </Box>

        {/* Task List */}
        <List>
          {todos.length === 0 ? (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "#888" }}
            >
              There are no tasks yet.
            </Typography>
          ) : (
            todos.map((task) => (
              <ListItem key={task.id} sx={{ borderBottom: "1px solid #ddd" }}>
                <ListItemText primary={task.title} />

                <IconButton onClick={() => handleDelete(task.id)}>
                  <DeleteIcon sx={{ color: "#B6A08B" }} />
                </IconButton>

                <Button
                  onClick={() => handleEdit(task)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#B6A08B",
                    height: 30,
                    borderRadius: "50%",
                    ml: 1,
                  }}
                  disabled={editId === task.id} // Disable edit if already editing
                >
                  <AddIcon />
                </Button>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}
