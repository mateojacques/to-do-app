import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Folders from "./components/Folders";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import AltForm from "./components/AltForm";
import { Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);
  const [showAltForm, setShowAltForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([]);

  //TASK MANAGEMENT

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const editTask = async (id) => {
    var today = new Date();
    const taskToEdit = await fetchTask(id);
    const name = prompt("Enter a new name for the task");
    const date = prompt(
      "Enter a new date for the task",
      `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`
    );

    const updTask = { ...taskToEdit, title: name, date: date };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: data.title, date: data.date } : task
      )
    );
  };

  const toggleCompleted = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, completed: !taskToToggle.completed };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: data.completed } : task
      )
    );
  };

  //FOLDER MANAGEMENT

  useEffect(() => {
    const getFolders = async () => {
      const foldersFromServer = await fetchFolders();
      setFolders(foldersFromServer);
    };

    getFolders();
  }, []);

  const fetchFolders = async () => {
    const res = await fetch("http://localhost:5000/folders");
    const data = await res.json();

    return data;
  };

  const fetchFolder = async (id) => {
    const res = await fetch(`http://localhost:5000/folders/${id}`);
    const data = await res.json();

    return data;
  };

  const addFolder = async (folder) => {
    const res = await fetch("http://localhost:5000/folders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(folder),
    });

    const data = await res.json();

    setFolders([...folders, data]);
  };

  const deleteFolder = async (id) => {
    await fetch(`http://localhost:5000/folders/${id}`, { method: "DELETE" });

    setFolders(folders.filter((folder) => folder.id !== id));
  };

  const editFolder = async (id) => {
    const folderToEdit = await fetchFolder(id);
    const name = prompt("Enter a new name for the folder");
    const updFolder = { ...folderToEdit, title: name };
    const res = await fetch(`http://localhost:5000/folders/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updFolder),
    });

    const data = await res.json();

    setFolders(
      folders.map((folder) =>
        folder.id === id ? { ...folder, title: data.title } : folder
      )
    );
  };

  //FORM CONTROL

  const addType = () => {
    if (document.getElementsByTagName("select").length === 0) {
      const header = document.getElementById("header");
      var select = document.createElement("select");
      select.className = "select";
      select.innerHTML = `<option value="task" selected>Task</option>
    <option value="folder">Folder</option>`;
      header.append(select);

      select.addEventListener("change", () => {
        if (select.value === "task") {
          setShowForm(!showForm);
          setShowAltForm(showAltForm);
        } else {
          setShowForm(showForm);
          setShowAltForm(!showAltForm);
        }
      });
    } else {
      select = document.querySelector(".select");
    }

    if (select.value === "task") {
      setShowForm(!showForm);
    } else {
      setShowAltForm(!showAltForm);
    }

    if (showForm || showAltForm) {
      select.style.display = "none";
    } else {
      select.style.display = "block";
    }
  };

  const addForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container">
      <Route
        path="/"
        exact
        render={(props) => (
          <>
            <Header
              onAdd={addType}
              showForm={showForm}
              showAltForm={showAltForm}
            />
            {showForm && <Form onAdd={addTask} />}
            {showAltForm && <AltForm onAdd={addFolder} />}
            {folders.length > 0 && (
              <Folders
                folders={folders}
                onDelete={deleteFolder}
                onEdit={editFolder}
              />
            )}
            {tasks.length > 0 ? (
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleCompleted}
                onEdit={editTask}
              />
            ) : (
              "Add a task to start!"
            )}
          </>
        )}
      />

      {location.pathname !== "/" && (
        <Header onAdd={addForm} showForm={showForm} />
      )}

      {location.pathname !== "/" && showForm && <Form onAdd={addTask} />}

      {location.pathname !== "/" && (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleCompleted}
          onEdit={editTask}
        />
      )}
    </div>
  );
}

export default App;
