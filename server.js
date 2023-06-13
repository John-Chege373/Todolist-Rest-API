const express = require('express');
const app = express();
const port = 3000;

const data = require('./data');

app.use(express.json());

// GET endpoint to retrieve all todos
app.get('/api/todos', (req, res) => {
  res.json(data.todos);
});

// GET endpoint to retrieve a single todo by ID
app.get('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = data.todos.find(todo => todo.id === id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// POST endpoint to create a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = generateUniqueId();
  data.todos.push(newTodo);
  res.json(newTodo);
});

// PUT endpoint to update an existing todo by ID
app.put('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  const todoIndex = data.todos.findIndex(todo => todo.id === id);

  if (todoIndex !== -1) {
    data.todos[todoIndex] = { ...data.todos[todoIndex], ...updatedTodo };
    res.json(data.todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// DELETE endpoint to remove a todo by ID
app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const todoIndex = data.todos.findIndex(todo => todo.id === id);

  if (todoIndex !== -1) {
    const deletedTodo = data.todos.splice(todoIndex, 1)[0];
    res.json(deletedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


