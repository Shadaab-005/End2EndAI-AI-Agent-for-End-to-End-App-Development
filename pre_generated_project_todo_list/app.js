// app.js – Todo application core logic
// ------------------------------------------------------------
// Data Model
// ------------------------------------------------------------
/**
 * Represents a single Todo item.
 */
class Todo {
  /**
   * @param {string|number} id - Unique identifier.
   * @param {string} text - The todo text.
   * @param {boolean} completed - Completion status.
   */
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  /**
   * Generates a unique id for a new todo.
   * Uses current timestamp + random component to avoid collisions.
   * @returns {string}
   */
  static generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ------------------------------------------------------------
// State Management
// ------------------------------------------------------------
let todos = [];
let currentFilter = 'all'; // possible values: 'all', 'active', 'completed'

// ------------------------------------------------------------
// Persistence (localStorage)
// ------------------------------------------------------------
function loadTodos() {
  const raw = localStorage.getItem('todos');
  if (!raw) {
    todos = [];
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    // Ensure each item has the expected shape.
    if (Array.isArray(parsed)) {
      todos = parsed.map(item => new Todo(item.id, item.text, !!item.completed));
    } else {
      todos = [];
    }
  } catch (e) {
    console.error('Failed to parse todos from localStorage', e);
    todos = [];
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// ------------------------------------------------------------
// Rendering
// ------------------------------------------------------------
function renderTodos() {
  const listEl = document.getElementById('todo-list');
  if (!listEl) return;
  // Clear existing list
  listEl.innerHTML = '';

  // Filter based on currentFilter
  const filtered = todos.filter(todo => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach(todo => {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'toggle';
    checkbox.dataset.id = todo.id;
    if (todo.completed) checkbox.checked = true;

    // Label (todo text)
    const label = document.createElement('label');
    label.textContent = todo.text;

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete';
    delBtn.dataset.id = todo.id;
    delBtn.textContent = '✕';

    // Assemble li – using a wrapper div for flex layout if desired
    const wrapper = document.createElement('div');
    wrapper.className = 'todo-item';
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    li.appendChild(wrapper);
    li.appendChild(delBtn);

    listEl.appendChild(li);
  });

  // Update items left counter
  const itemsLeftEl = document.getElementById('items-left');
  if (itemsLeftEl) {
    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeftEl.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
  }

  // Update filter button active state
  const filterButtons = document.querySelectorAll('.footer button[data-filter]');
  filterButtons.forEach(btn => {
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add('active-filter');
    } else {
      btn.classList.remove('active-filter');
    }
  });
}

// ------------------------------------------------------------
// Event Handlers
// ------------------------------------------------------------
function addTodo() {
  const input = document.getElementById('new-todo');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  const todo = new Todo(Todo.generateId(), text, false);
  todos.push(todo);
  input.value = '';
  saveTodos();
  renderTodos();
}

function toggleTodo(event) {
  const checkbox = event.target;
  const id = checkbox.dataset.id;
  const todo = todos.find(t => String(t.id) === String(id));
  if (!todo) return;
  todo.completed = checkbox.checked;
  saveTodos();
  renderTodos();
}

function deleteTodo(event) {
  const btn = event.target;
  const id = btn.dataset.id;
  todos = todos.filter(t => String(t.id) !== String(id));
  saveTodos();
  renderTodos();
}

function setFilter(event) {
  const btn = event.target;
  const filter = btn.dataset.filter;
  if (!filter) return;
  currentFilter = filter; // values are already lower‑case
  renderTodos();
}

// ------------------------------------------------------------
// Initialization
// ------------------------------------------------------------
function init() {
  loadTodos();
  renderTodos();

  // Add button click
  const addBtn = document.getElementById('add-btn');
  if (addBtn) addBtn.addEventListener('click', addTodo);

  // Enter key on input
  const input = document.getElementById('new-todo');
  if (input) {
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  }

  // Delegated events for toggle and delete
  const listEl = document.getElementById('todo-list');
  if (listEl) {
    listEl.addEventListener('click', e => {
      if (e.target.matches('.toggle')) {
        toggleTodo(e);
      } else if (e.target.matches('.delete')) {
        deleteTodo(e);
      }
    });
  }

  // Filter buttons
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.addEventListener('click', e => {
      if (e.target.matches('button[data-filter]')) {
        setFilter(e);
      }
    });
  }
}

// Run init on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Todo,
    loadTodos,
    saveTodos,
    renderTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    init,
    getTodos: () => todos,
    getCurrentFilter: () => currentFilter,
  };
}
