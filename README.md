# To-Do-List App

#  Firebase React To-Do App

A full stack task manager built using **React**, **Firebase Authentication**, and **Cloud Firestore**. This app allows users to **add, edit, delete, complete**, and **undo tasks**. Each user has their own task list linked by their authentication.

---

##  Live Demo

>  Hosted on Vercel: [https://sj-todolist.vercel.app](https://sj-todolist.vercel.app)

---

##  Project Structure

```
src/
├── components/
│   ├── Login.js
│   ├── Signup.js
│   ├── Protected.js
├── pages/
│   └── Home.js
├── css/
│   ├── Home.module.css
│   └── Protected.module.css
├── Firebase.js
├── App.js
└── index.js
```

---

##  Features

*  Firebase Email/Password authentication
*  Protected routes using `onAuthStateChanged`
*  Create, edit, delete tasks
*  Mark tasks as complete/incomplete
*  User-specific task segregation via `userId`
*  Timestamped tasks using `createdAt`
*  Styled with CSS modules
*  Real-time task sync on login/logout

---

##  API Design (Conceptual)

| Method | Endpoint    | Purpose                   |
| ------ | ----------- | ------------------------- |
| GET    | /tasks      | Fetch all tasks for user  |
| POST   | /tasks      | Add new task              |
| GET    | /tasks/\:id | Get task by ID            |
| PUT    | /tasks/\:id | Update task (edit/status) |
| DELETE | /tasks/\:id | Delete task by ID         |

### Sample Task Document

```json
{
  "id": "Xyz123",
  "title": "Do laundry",
  "status": "pending",
  "createdAt": "2024-06-17T08:30:00Z",
  "userId": "uid_abc"
}
```

---

##  Components Overview

### `Protected.js`

Redirects unauthenticated users to `/login` using `onAuthStateChanged`. Shows loading spinner until auth is resolved.

### `Home.js`

Main dashboard where tasks are created and managed. Fetches user-specific tasks via Firestore queries.

### `Login.js` & `Signup.js`

Handles user authentication using Firebase Auth.

### `Firebase.js`

Firebase configuration and exports for `db` and `auth`.

---

##  Error Handling

| Scenario                | Response                           |
| ----------------------- | ---------------------------------- |
| Empty input on task add | `alert("Can't add EMPTY Task")`    |
| Not logged in           | Redirect to `/login`               |
| Empty input on edit     | Prevent update                     |
| Firebase call fails     | Catch block with basic alert (TBD) |

---

##  Security Considerations

| Concern             | Mitigation                                |
| ------------------- | ----------------------------------------- |
| Unauthorized access | Firestore rules + route protection        |
| Data leakage        | Store each task with `userId` field       |
| Input sanitization  | Basic client-side trimming and validation |
| XSS/Injection       | Use Firebase SDK (auto-sanitizes inputs)  |



##  Local Development

### Prerequisites

* Node.js installed
* Firebase project configured

### Installation

```bash
git clone https://github.com/your-username/firebase-react-todo.git
cd firebase-react-todo
npm install
npm start
```

App runs at: `http://localhost:5173`

---

##  Deployment 

### Vercel

* Push code to GitHub
* Link to Vercel
---

##  Future Improvements

* Add notifications/toasts
* Better error boundary and UI feedback
* Dark mode toggle
* Filters/sorting for tasks
* Use Firestore `onSnapshot()` for real-time sync
* Add unit tests
* Add due dates/priority

---

##  Author

**Sham Johari**

 Email: [shamjohari101@gmail.com](shamjohari101@gmail.com)
 
 [https://www.linkedin.com/in/sham-johari](https://www.linkedin.com/in/sham-johari)

---


