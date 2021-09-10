import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Context from './context';
import Footer from './components/Footer';

function App() {
  const [todos, setTodos] = useState(localStorage !== undefined ? JSON.parse(localStorage.getItem('todolist')) : []);
  const [val, setVal] = useState(true);
  //const [category, setCategory] = useState([]);
  const [sort, setSort] = useState("all");

  useEffect(()=> {
    localStorage.setItem('todolist', JSON.stringify(todos));
  },[todos]);

  function addTodo(title) {
    setTodos(todos.concat({
      title: title,
      id: Date.now(),
      completed: false
    }))
    if (!todos.every((todo) => todo.completed === true)) {
      setVal(true);
    }
  }

  function editTitle(id, newTitle) {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.title = newTitle;
      }
      return todo;
    }));
  }

  function completedTodo(id) {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }));
  }

  function removeTodo(id) {
   console.log(1);
   setTodos(todos.filter((todo) => todo.id !== id));
  }

  function completedAll() {
    setTodos(todos.map((todo) => {
      todo.completed = val;
      return todo;
    }))
    setVal(!val);
  }

  function cleanCompleated() {
    setTodos(todos.filter((todo) => todo.completed === false));
  }

  function sortByCategory(flag) {
    setSort(flag);
  }

  return (
    <div className="wrapper">
      <Context.Provider value={{ removeTodo: removeTodo, editTitle: editTitle }}>
        <Header onCreate={addTodo} completedAll={completedAll} length={todos.length} />
        <div className="main">
          {/* {todos.length 
          ? <TodoList todos={todos} onToggle={completedTodo}/>
          : }<p className="">NO tasks</p> */}
          <TodoList todos={todos} onToggle={completedTodo} sort={sort}/>
        </div>
        <Footer todos={todos} cleanCompleated={cleanCompleated} sortByCategory={sortByCategory} sort={sort}/>
      </Context.Provider>
    </div>
  );
}

export default App;
