import React, { useReducer, useState } from 'react';
import "./App.css"

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.payload],
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todoText, setTodoText] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodo = () => {
    if (todoText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: todoText,
      };
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setTodoText('');
    }
  };

  const deleteTodo = id => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Enter a todo"
        value={todoText}
        onChange={e => setTodoText(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
