// File: src/pages/Home.js
import React, { useEffect, useState } from "react";
import { db, auth } from "./Firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import style from "../css/Home.module.css";

function Home() {
  const [task, setTask] = useState([]);
  const [complete, setComplete] = useState([]);
  const [text, setText] = useState("");

  const taskCollection = collection(db, "tasks");

  const fetchTasks = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(taskCollection, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    const ongoing = [], done = [];

    querySnapshot.forEach((docSnap) => {
      const data = { id: docSnap.id, ...docSnap.data() };
      data.status === "done" ? done.push(data) : ongoing.push(data);
    });

    setTask(ongoing);
    setComplete(done);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchTasks();
    });
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    const trimmed = text.trim();
    if (!trimmed) return alert("Can't add EMPTY Task");

    const user = auth.currentUser;
    if (!user) return alert("User not logged in");

    await addDoc(taskCollection, {
      title: trimmed,
      status: "pending",
      createdAt: new Date().toISOString(),
      userId: user.uid,
    });

    setText("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  const completeTask = async (id) => {
    await updateDoc(doc(db, "tasks", id), { status: "done" });
    fetchTasks();
  };

  const editTask = async (id, oldTitle) => {
    const newTitle = prompt("Edit task:", oldTitle);
    if (!newTitle?.trim()) return alert("Can't add EMPTY Task");
    await updateDoc(doc(db, "tasks", id), { title: newTitle });
    fetchTasks();
  };

  const undoTask = async (id) => {
    await updateDoc(doc(db, "tasks", id), { status: "pending" });
    fetchTasks();
  };

  return (
    <div className={style.main}>
      <div className={style.headingContainer}>
        <h1 className={style.heading}>To Do App</h1>
      </div>

      <div className={style.inputContainer}>
        <input
          className={style.inputBox}
          type="text"
          placeholder="Enter Your Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className={style.addButton} onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className={style.taskContainer}>
        {task.length > 0 && (
          <div className={style.taskSection}>
            <h2 className={style.sectionTitle}>Ongoing Tasks</h2>
            {task.map(({ id, title }) => (
              <div key={id} className={style.taskItem}>
                <input type="checkbox" onChange={() => completeTask(id)} />
                <li>{title}</li>
                <img
                  src="pen.png"
                  alt="edit"
                  onClick={() => editTask(id, title)}
                  className={style.icon}
                />
                <img
                  src="remove.png"
                  alt="delete"
                  onClick={() => deleteTask(id)}
                  className={style.icon}
                />
              </div>
            ))}
          </div>
        )}

        {complete.length > 0 && (
          <div className={style.taskSection}>
            <h2 className={style.sectionTitle}>Completed Tasks</h2>
            {complete.map(({ id, title }) => (
              <div key={id} className={style.taskItem}>
                <img
                  src="undo.png"
                  alt="undo"
                  onClick={() => undoTask(id)}
                  className={style.icon}
                />
                <li className={style.completed}>{title}</li>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
