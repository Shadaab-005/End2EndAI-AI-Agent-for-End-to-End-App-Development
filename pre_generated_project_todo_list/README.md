# SimpleTodo

## Brief Description
SimpleTodo is a lightweight, client‑side to‑do list application. It allows users to add, complete, delete, and filter tasks directly in the browser. All data is persisted using the browser's `localStorage`, so your tasks remain even after you close the page.

---

## Tech Stack
- **HTML** – Structure of the application.
- **CSS** – Styling and responsive layout.
- **JavaScript** – Core application logic, DOM manipulation, and data persistence.

---

## Features
- **Add tasks** – Quickly create new to‑do items.
- **Mark as completed** – Toggle a task's completed state.
- **Delete tasks** – Remove tasks you no longer need.
- **Filter view** – Switch between All, Active, and Completed tasks.
- **Data persistence** – Tasks are saved in `localStorage` and restored on page load.

---

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Open the app**
   - Simply open `index.html` in any modern web browser (no build step, server, or package manager required).

---

## Usage Guide
### Adding a Task
1. Type your task description into the input field at the top.
2. Press **Enter** or click the **Add** button.
3. The new task appears in the list.

### Completing a Task
- Click the checkbox next to a task to toggle its completed state. Completed tasks are visually distinguished (e.g., strikethrough).

### Deleting a Task
- Click the **Delete** (✖) button on the right side of a task to remove it permanently.

### Filters
- **All** – Shows every task.
- **Active** – Shows only tasks that are not completed.
- **Completed** – Shows only tasks that have been marked as completed.
- Click the corresponding filter button at the bottom of the list to switch views.

### Data Persistence
- All tasks are stored in the browser's `localStorage` under a dedicated key.
- When the page loads, the app reads from `localStorage` and renders the saved tasks, preserving their order and completed state.

---

## File Overview
| File | Purpose |
|------|---------|
| `index.html` | Contains the markup and layout of the application. |
| `styles.css` (or `style.css`) | Provides styling for the UI, including layout, colors, and responsive design. |
| `app.js` (or `script.js`) | Implements the core application logic: handling user interactions, managing the task list, and persisting data. |
| `README.md` | This documentation file. |

---

## Contribution Guidelines *(optional)*
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Ensure your changes follow the existing code style.
4. Test the application locally by opening `index.html`.
5. Submit a pull request describing the changes.

---

## License
[Insert License Here] – e.g., MIT, Apache 2.0, or another open‑source license.

---

*Happy task managing with SimpleTodo!*